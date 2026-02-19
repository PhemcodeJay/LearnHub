import { useState, useEffect, useCallback, useRef } from 'react';
import { courses as staticCourses, Course } from '@/data/courses';
import {
  DbUser,
  DbEnrollment,
  DbBookmark,
  DbNote,
  DbCompletedLesson,
  getOrCreateUser,
  fetchEnrollments,
  fetchBookmarks,
  fetchNotes,
  fetchCompletedLessons,
  enrollInCourse,
  updateProgress,
  toggleBookmark as dbToggleBookmark,
  saveNote as dbSaveNote,
  toggleLessonCompletion as dbToggleLessonCompletion,
} from '@/lib/db';

export interface UserDataState {
  user: DbUser | null;
  courses: Course[];
  bookmarkedCourses: Set<string>;
  notesMap: Record<string, string>; // courseId -> content
  completedLessonsMap: Record<string, Set<string>>; // courseId -> Set<lessonId>
  isLoading: boolean;
  error: string | null;
  isSaving: Record<string, boolean>; // operation key -> saving state
}

export interface UserDataActions {
  handleEnroll: (courseId: string) => Promise<void>;
  handleBookmark: (courseId: string) => Promise<void>;
  handleSaveNote: (courseId: string, content: string) => Promise<void>;
  handleToggleLesson: (courseId: string, lessonId: string) => Promise<void>;
  handleUpdateProgress: (courseId: string, progress: number) => Promise<void>;
  clearError: () => void;
  refetch: () => Promise<void>;
}

export function useUserData(): UserDataState & UserDataActions {
  const [user, setUser] = useState<DbUser | null>(null);
  const [enrollments, setEnrollments] = useState<DbEnrollment[]>([]);
  const [bookmarks, setBookmarks] = useState<DbBookmark[]>([]);
  const [notes, setNotes] = useState<DbNote[]>([]);
  const [completedLessons, setCompletedLessons] = useState<DbCompletedLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});
  const userRef = useRef<DbUser | null>(null);

  const setSavingState = (key: string, saving: boolean) => {
    setIsSaving((prev) => ({ ...prev, [key]: saving }));
  };

  // Load all user data on mount
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const dbUser = await getOrCreateUser();
      setUser(dbUser);
      userRef.current = dbUser;

      const [dbEnrollments, dbBookmarks, dbNotes, dbCompleted] = await Promise.all([
        fetchEnrollments(dbUser.id),
        fetchBookmarks(dbUser.id),
        fetchNotes(dbUser.id),
        fetchCompletedLessons(dbUser.id),
      ]);

      setEnrollments(dbEnrollments);
      setBookmarks(dbBookmarks);
      setNotes(dbNotes);
      setCompletedLessons(dbCompleted);
    } catch (err: any) {
      console.error('Failed to load user data:', err);
      setError(err.message || 'Failed to load your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derive courses with enrollment/progress/lesson completion data
  const bookmarkedCourses = new Set(bookmarks.map((b) => b.course_id));

  const notesMap: Record<string, string> = {};
  notes.forEach((n) => {
    notesMap[n.course_id] = n.content;
  });

  const completedLessonsMap: Record<string, Set<string>> = {};
  completedLessons.forEach((cl) => {
    if (!completedLessonsMap[cl.course_id]) {
      completedLessonsMap[cl.course_id] = new Set();
    }
    completedLessonsMap[cl.course_id].add(cl.lesson_id);
  });

  const enrollmentMap: Record<string, DbEnrollment> = {};
  enrollments.forEach((e) => {
    enrollmentMap[e.course_id] = e;
  });

  const courses: Course[] = staticCourses.map((course) => {
    const enrollment = enrollmentMap[course.id];
    const completedSet = completedLessonsMap[course.id] || new Set();

    // Build modules with completed status from DB
    const modules = course.modules.map((mod) => ({
      ...mod,
      lessons: mod.lessons.map((lesson) => ({
        ...lesson,
        completed: completedSet.has(lesson.id),
      })),
    }));

    return {
      ...course,
      modules,
      isEnrolled: !!enrollment,
      progress: enrollment?.progress ?? 0,
    };
  });

  // ---- Actions ----

  const handleEnroll = useCallback(async (courseId: string) => {
    const uid = userRef.current?.id;
    if (!uid) return;

    const key = `enroll-${courseId}`;
    setSavingState(key, true);
    setError(null);

    try {
      // Optimistic update
      setEnrollments((prev) => [
        ...prev,
        {
          id: 'temp',
          user_id: uid,
          course_id: courseId,
          progress: 0,
          enrolled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      const enrollment = await enrollInCourse(uid, courseId);

      // Replace temp with real data
      setEnrollments((prev) =>
        prev.map((e) => (e.course_id === courseId && e.id === 'temp' ? enrollment : e))
      );
    } catch (err: any) {
      console.error('Enroll failed:', err);
      setError(err.message || 'Failed to enroll. Please try again.');
      // Rollback
      setEnrollments((prev) => prev.filter((e) => !(e.course_id === courseId && e.id === 'temp')));
    } finally {
      setSavingState(key, false);
    }
  }, []);

  const handleBookmark = useCallback(async (courseId: string) => {
    const uid = userRef.current?.id;
    if (!uid) return;

    const key = `bookmark-${courseId}`;
    setSavingState(key, true);
    setError(null);

    const wasBookmarked = bookmarks.some((b) => b.course_id === courseId);

    try {
      // Optimistic update
      if (wasBookmarked) {
        setBookmarks((prev) => prev.filter((b) => b.course_id !== courseId));
      } else {
        setBookmarks((prev) => [
          ...prev,
          {
            id: 'temp',
            user_id: uid,
            course_id: courseId,
            created_at: new Date().toISOString(),
          },
        ]);
      }

      const isNowBookmarked = await dbToggleBookmark(uid, courseId);

      // If server disagrees with our optimistic update, refetch
      if (isNowBookmarked === wasBookmarked) {
        const updatedBookmarks = await fetchBookmarks(uid);
        setBookmarks(updatedBookmarks);
      }
    } catch (err: any) {
      console.error('Bookmark toggle failed:', err);
      setError(err.message || 'Failed to update bookmark. Please try again.');
      // Rollback
      if (wasBookmarked) {
        setBookmarks((prev) => [
          ...prev,
          {
            id: 'rollback',
            user_id: uid,
            course_id: courseId,
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        setBookmarks((prev) => prev.filter((b) => b.course_id !== courseId));
      }
    } finally {
      setSavingState(key, false);
    }
  }, [bookmarks]);

  const handleSaveNote = useCallback(async (courseId: string, content: string) => {
    const uid = userRef.current?.id;
    if (!uid) return;

    const key = `note-${courseId}`;
    setSavingState(key, true);
    setError(null);

    try {
      const savedNote = await dbSaveNote(uid, courseId, content);
      setNotes((prev) => {
        const existing = prev.findIndex((n) => n.course_id === courseId);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = savedNote;
          return updated;
        }
        return [...prev, savedNote];
      });
    } catch (err: any) {
      console.error('Save note failed:', err);
      setError(err.message || 'Failed to save note. Please try again.');
    } finally {
      setSavingState(key, false);
    }
  }, []);

  const handleToggleLesson = useCallback(async (courseId: string, lessonId: string) => {
    const uid = userRef.current?.id;
    if (!uid) return;

    const key = `lesson-${courseId}-${lessonId}`;
    setSavingState(key, true);
    setError(null);

    const wasCompleted = completedLessons.some(
      (cl) => cl.course_id === courseId && cl.lesson_id === lessonId
    );

    try {
      // Optimistic update
      if (wasCompleted) {
        setCompletedLessons((prev) =>
          prev.filter((cl) => !(cl.course_id === courseId && cl.lesson_id === lessonId))
        );
      } else {
        setCompletedLessons((prev) => [
          ...prev,
          {
            id: 'temp',
            user_id: uid,
            course_id: courseId,
            lesson_id: lessonId,
            completed_at: new Date().toISOString(),
          },
        ]);
      }

      await dbToggleLessonCompletion(uid, courseId, lessonId);

      // Recalculate progress for this course
      const course = staticCourses.find((c) => c.id === courseId);
      if (course) {
        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        // Get current completed count from our optimistic state
        const currentCompleted = wasCompleted
          ? completedLessons.filter((cl) => cl.course_id === courseId).length - 1
          : completedLessons.filter((cl) => cl.course_id === courseId).length + 1;
        const newProgress = totalLessons > 0 ? Math.round((currentCompleted / totalLessons) * 100) : 0;

        await updateProgress(uid, courseId, newProgress);
        setEnrollments((prev) =>
          prev.map((e) =>
            e.course_id === courseId ? { ...e, progress: newProgress, updated_at: new Date().toISOString() } : e
          )
        );
      }
    } catch (err: any) {
      console.error('Toggle lesson failed:', err);
      setError(err.message || 'Failed to update lesson. Please try again.');
      // Rollback
      if (wasCompleted) {
        setCompletedLessons((prev) => [
          ...prev,
          {
            id: 'rollback',
            user_id: uid,
            course_id: courseId,
            lesson_id: lessonId,
            completed_at: new Date().toISOString(),
          },
        ]);
      } else {
        setCompletedLessons((prev) =>
          prev.filter((cl) => !(cl.course_id === courseId && cl.lesson_id === lessonId))
        );
      }
    } finally {
      setSavingState(key, false);
    }
  }, [completedLessons]);

  const handleUpdateProgress = useCallback(async (courseId: string, progress: number) => {
    const uid = userRef.current?.id;
    if (!uid) return;

    try {
      await updateProgress(uid, courseId, progress);
      setEnrollments((prev) =>
        prev.map((e) =>
          e.course_id === courseId ? { ...e, progress, updated_at: new Date().toISOString() } : e
        )
      );
    } catch (err: any) {
      console.error('Update progress failed:', err);
      setError(err.message || 'Failed to update progress.');
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    user,
    courses,
    bookmarkedCourses,
    notesMap,
    completedLessonsMap,
    isLoading,
    error,
    isSaving,
    handleEnroll,
    handleBookmark,
    handleSaveNote,
    handleToggleLesson,
    handleUpdateProgress,
    clearError,
    refetch: loadData,
  };
}
