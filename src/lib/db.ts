import { supabase } from '@/lib/supabase';

// ---- Types ----

export interface DbUser {
  id: string;
  display_name: string;
  email: string | null;
  avatar_url: string | null;
  learning_streak: number;
  created_at: string;
  updated_at: string;
}

export interface DbEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  enrolled_at: string;
  updated_at: string;
}

export interface DbBookmark {
  id: string;
  user_id: string;
  course_id: string;
  created_at: string;
}

export interface DbNote {
  id: string;
  user_id: string;
  course_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface DbCompletedLesson {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  completed_at: string;
}

// ---- User Management ----

const USER_STORAGE_KEY = 'lms_user_id';

export async function getOrCreateUser(): Promise<DbUser> {
  // Check localStorage for existing user id
  const storedId = localStorage.getItem(USER_STORAGE_KEY);

  if (storedId) {
    const { data, error } = await supabase
      .from('lms_users')
      .select('*')
      .eq('id', storedId)
      .single();

    if (data && !error) {
      return data as DbUser;
    }
  }

  // Create new user
  const { data, error } = await supabase
    .from('lms_users')
    .insert({
      display_name: 'John Doe',
      email: 'john.doe@example.com',
      learning_streak: 12,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create user: ${error.message}`);
  
  localStorage.setItem(USER_STORAGE_KEY, data.id);
  return data as DbUser;
}

// ---- Enrollments ----

export async function fetchEnrollments(userId: string): Promise<DbEnrollment[]> {
  const { data, error } = await supabase
    .from('lms_enrollments')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(`Failed to fetch enrollments: ${error.message}`);
  return (data || []) as DbEnrollment[];
}

export async function enrollInCourse(userId: string, courseId: string): Promise<DbEnrollment> {
  const { data, error } = await supabase
    .from('lms_enrollments')
    .upsert(
      { user_id: userId, course_id: courseId, progress: 0 },
      { onConflict: 'user_id,course_id' }
    )
    .select()
    .single();

  if (error) throw new Error(`Failed to enroll: ${error.message}`);
  return data as DbEnrollment;
}

export async function updateProgress(userId: string, courseId: string, progress: number): Promise<void> {
  const { error } = await supabase
    .from('lms_enrollments')
    .update({ progress, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (error) throw new Error(`Failed to update progress: ${error.message}`);
}

export async function unenroll(userId: string, courseId: string): Promise<void> {
  const { error } = await supabase
    .from('lms_enrollments')
    .delete()
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (error) throw new Error(`Failed to unenroll: ${error.message}`);
}

// ---- Bookmarks ----

export async function fetchBookmarks(userId: string): Promise<DbBookmark[]> {
  const { data, error } = await supabase
    .from('lms_bookmarks')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(`Failed to fetch bookmarks: ${error.message}`);
  return (data || []) as DbBookmark[];
}

export async function toggleBookmark(userId: string, courseId: string): Promise<boolean> {
  // Check if bookmark exists
  const { data: existing } = await supabase
    .from('lms_bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();

  if (existing) {
    // Remove bookmark
    const { error } = await supabase
      .from('lms_bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) throw new Error(`Failed to remove bookmark: ${error.message}`);
    return false; // not bookmarked anymore
  } else {
    // Add bookmark
    const { error } = await supabase
      .from('lms_bookmarks')
      .insert({ user_id: userId, course_id: courseId });

    if (error) throw new Error(`Failed to add bookmark: ${error.message}`);
    return true; // now bookmarked
  }
}

// ---- Notes ----

export async function fetchNotes(userId: string): Promise<DbNote[]> {
  const { data, error } = await supabase
    .from('lms_notes')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(`Failed to fetch notes: ${error.message}`);
  return (data || []) as DbNote[];
}

export async function fetchNoteForCourse(userId: string, courseId: string): Promise<DbNote | null> {
  const { data, error } = await supabase
    .from('lms_notes')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch note: ${error.message}`);
  }
  return (data as DbNote) || null;
}

export async function saveNote(userId: string, courseId: string, content: string): Promise<DbNote> {
  const { data, error } = await supabase
    .from('lms_notes')
    .upsert(
      {
        user_id: userId,
        course_id: courseId,
        content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,course_id' }
    )
    .select()
    .single();

  if (error) throw new Error(`Failed to save note: ${error.message}`);
  return data as DbNote;
}

// ---- Completed Lessons ----

export async function fetchCompletedLessons(userId: string): Promise<DbCompletedLesson[]> {
  const { data, error } = await supabase
    .from('lms_completed_lessons')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(`Failed to fetch completed lessons: ${error.message}`);
  return (data || []) as DbCompletedLesson[];
}

export async function fetchCompletedLessonsForCourse(userId: string, courseId: string): Promise<DbCompletedLesson[]> {
  const { data, error } = await supabase
    .from('lms_completed_lessons')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (error) throw new Error(`Failed to fetch completed lessons: ${error.message}`);
  return (data || []) as DbCompletedLesson[];
}

export async function toggleLessonCompletion(
  userId: string,
  courseId: string,
  lessonId: string
): Promise<boolean> {
  // Check if already completed
  const { data: existing } = await supabase
    .from('lms_completed_lessons')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .eq('lesson_id', lessonId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('lms_completed_lessons')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('lesson_id', lessonId);

    if (error) throw new Error(`Failed to uncomplete lesson: ${error.message}`);
    return false;
  } else {
    const { error } = await supabase
      .from('lms_completed_lessons')
      .insert({ user_id: userId, course_id: courseId, lesson_id: lessonId });

    if (error) throw new Error(`Failed to complete lesson: ${error.message}`);
    return true;
  }
}

// ---- User Stats Update ----

export async function updateUserStreak(userId: string, streak: number): Promise<void> {
  const { error } = await supabase
    .from('lms_users')
    .update({ learning_streak: streak, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) throw new Error(`Failed to update streak: ${error.message}`);
}
