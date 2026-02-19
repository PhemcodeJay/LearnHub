import React, { useState, useEffect, useRef } from 'react';
import { Course } from '@/data/courses';
import {
  ArrowLeftIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  PlayIcon,
  CheckIcon,
  ChevronDownIcon,
  BookmarkIcon,
  NoteIcon,
} from './Icons';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onEnroll: (courseId: string) => Promise<void>;
  isBookmarked: boolean;
  onBookmark: (courseId: string) => Promise<void>;
  initialNotes: string;
  onSaveNote: (courseId: string, content: string) => Promise<void>;
  onToggleLesson: (courseId: string, lessonId: string) => Promise<void>;
  isSaving: Record<string, boolean>;
}

const CourseDetail: React.FC<CourseDetailProps> = ({
  course,
  onBack,
  onEnroll,
  isBookmarked,
  onBookmark,
  initialNotes,
  onSaveNote,
  onToggleLesson,
  isSaving,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews' | 'notes'>('overview');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set([course.modules[0]?.id]));
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [enrolling, setEnrolling] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // Sync notes from props when course changes
  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes, course.id]);

  // Auto-save notes with debounce
  useEffect(() => {
    if (notes === initialNotes) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      if (notes !== initialNotes && course.isEnrolled) {
        onSaveNote(course.id, notes).then(() => {
          setNoteSaved(true);
          setTimeout(() => setNoteSaved(false), 2000);
        });
      }
    }, 1500);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [notes, initialNotes, course.id, course.isEnrolled, onSaveNote]);

  const toggleModule = (moduleId: string) => {
    const next = new Set(expandedModules);
    if (next.has(moduleId)) next.delete(moduleId);
    else next.add(moduleId);
    setExpandedModules(next);
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await onEnroll(course.id);
    } finally {
      setEnrolling(false);
    }
  };

  const handleLessonToggle = async (lessonId: string) => {
    if (!course.isEnrolled) return;
    await onToggleLesson(course.id, lessonId);
  };

  const handleManualSave = async () => {
    await onSaveNote(course.id, notes);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const isNoteSaving = isSaving[`note-${course.id}`];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Courses</span>
          </button>
          <div className="flex items-center gap-3">
            {/* Saving indicator */}
            {Object.entries(isSaving).some(([k, v]) => v && k.startsWith(`lesson-${course.id}`)) && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            )}
            <button
              onClick={() => onBookmark(course.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <BookmarkIcon className="w-5 h-5" filled={isBookmarked} />
            </button>
          </div>
        </div>
      </div>

      {/* Course Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 bg-blue-700/50 border border-blue-500/30 rounded-full text-blue-200 text-sm mb-4">
                {course.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-blue-100/80 text-lg mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" filled />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-blue-200/70">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-blue-200/70">
                  <UsersIcon className="w-4 h-4" />
                  <span>{course.enrolled.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1 text-blue-200/70">
                  <ClockIcon className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p className="font-semibold">{course.instructor.name}</p>
                  <p className="text-sm text-blue-200/70">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-white rounded-xl shadow-xl p-6 text-gray-900 self-start">
              <div className="aspect-video rounded-lg overflow-hidden mb-4 relative group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-7 h-7 text-blue-600 ml-1" />
                  </div>
                </div>
              </div>

              <div className="text-3xl font-bold mb-4">${course.price}</div>

              {course.isEnrolled ? (
                <div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-green-600">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Continue Learning
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {enrolling && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Lessons</span>
                  <span className="font-medium text-gray-900">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-medium text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="font-medium text-gray-900">{course.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Certificate</span>
                  <span className="font-medium text-gray-900">Included</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {(['overview', 'curriculum', 'reviews', 'notes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'Build real-world projects from scratch',
                      'Understand core concepts and best practices',
                      'Apply industry-standard tools and techniques',
                      'Develop a professional portfolio',
                      'Gain confidence in problem-solving',
                      'Earn a verified certificate of completion',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
                  <p className="text-gray-600 leading-relaxed">{course.description}</p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    This comprehensive course is designed for anyone looking to master {course.category.toLowerCase()} skills. 
                    Whether you're a complete beginner or looking to level up, our structured curriculum will guide you 
                    through practical, hands-on learning experiences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Instructor</h2>
                  <div className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.instructor.name}</h3>
                      <p className="text-sm text-blue-600 mb-2">{course.instructor.title}</p>
                      <p className="text-sm text-gray-600">
                        An experienced professional with over 10 years in the industry. 
                        Passionate about teaching and helping students achieve their goals through practical, 
                        real-world instruction.
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" filled />
                          4.8 Rating
                        </span>
                        <span className="flex items-center gap-1">
                          <UsersIcon className="w-4 h-4" />
                          15K+ Students
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
                  <span className="text-sm text-gray-500">
                    {completedLessons}/{totalLessons} lessons completed
                  </span>
                </div>
                {course.modules.map((module, idx) => {
                  const moduleCompleted = module.lessons.filter((l) => l.completed).length;
                  const moduleTotal = module.lessons.length;
                  return (
                    <div key={module.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            moduleCompleted === moduleTotal && moduleTotal > 0
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {moduleCompleted === moduleTotal && moduleTotal > 0 ? (
                              <CheckIcon className="w-4 h-4" />
                            ) : (
                              idx + 1
                            )}
                          </span>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">{module.title}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {moduleCompleted}/{moduleTotal} lessons completed
                            </p>
                          </div>
                        </div>
                        <ChevronDownIcon
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedModules.has(module.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedModules.has(module.id) && (
                        <div className="border-t border-gray-100">
                          {module.lessons.map((lesson) => {
                            const lessonSaving = isSaving[`lesson-${course.id}-${lesson.id}`];
                            return (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-4 px-5 py-3.5 hover:bg-blue-50 transition-colors"
                              >
                                {/* Completion toggle */}
                                <button
                                  onClick={() => handleLessonToggle(lesson.id)}
                                  disabled={!course.isEnrolled || lessonSaving}
                                  className={`flex-shrink-0 ${!course.isEnrolled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                  title={course.isEnrolled ? (lesson.completed ? 'Mark as incomplete' : 'Mark as complete') : 'Enroll to track progress'}
                                >
                                  {lessonSaving ? (
                                    <span className="w-6 h-6 flex items-center justify-center">
                                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    </span>
                                  ) : lesson.completed ? (
                                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                                    </span>
                                  ) : (
                                    <span className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-blue-400 transition-colors">
                                      {lesson.type === 'video' ? (
                                        <PlayIcon className="w-3 h-3 text-gray-400" />
                                      ) : (
                                        <NoteIcon className="w-3 h-3 text-gray-400" />
                                      )}
                                    </span>
                                  )}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                    {lesson.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400 capitalize px-2 py-0.5 bg-gray-100 rounded">
                                    {lesson.type}
                                  </span>
                                  <span className="text-xs text-gray-400">{lesson.duration}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Alex Johnson', rating: 5, text: 'Incredible course! The instructor explains complex concepts in a very digestible way. Highly recommended for anyone looking to level up.', time: '2 weeks ago' },
                    { name: 'Maria Garcia', rating: 5, text: 'Best course I\'ve taken online. The projects are practical and the community support is amazing. Worth every penny.', time: '1 month ago' },
                    { name: 'David Lee', rating: 4, text: 'Great content and well-structured curriculum. Would love to see more advanced topics covered in future updates.', time: '1 month ago' },
                    { name: 'Sophie Turner', rating: 5, text: 'The hands-on approach really helped me understand the material. I landed a job within 2 months of completing this course!', time: '2 months ago' },
                  ].map((review, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.name}</p>
                            <p className="text-xs text-gray-400">{review.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <StarIcon key={j} className="w-4 h-4 text-yellow-400" filled={j < review.rating} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Notes</h2>
                {!course.isEnrolled ? (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                    <NoteIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Enroll to take notes</h3>
                    <p className="text-gray-500 text-sm mb-4">Notes are available for enrolled courses. Enroll now to start taking notes!</p>
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes while learning... Your notes auto-save after you stop typing."
                      className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{notes.length} characters</span>
                        {isNoteSaving && (
                          <span className="flex items-center gap-1.5 text-xs text-blue-600">
                            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </span>
                        )}
                        {noteSaved && !isNoteSaving && (
                          <span className="flex items-center gap-1.5 text-xs text-green-600">
                            <CheckIcon className="w-3 h-3" />
                            Saved to database
                          </span>
                        )}
                      </div>
                      <button
                        onClick={handleManualSave}
                        disabled={isNoteSaving}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isNoteSaving && (
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        Save Notes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Quick Stats (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-40 space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Course Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall</span>
                      <span className="font-semibold">{course.progress || 0}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{completedLessons}</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{totalLessons - completedLessons}</div>
                      <div className="text-xs text-gray-500">Remaining</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sync Status */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Data synced to cloud</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
                <div className="space-y-3">
                  {['Course Slides (PDF)', 'Exercise Files', 'Cheat Sheet', 'Source Code'].map((resource, i) => (
                    <button
                      key={i}
                      onClick={() => alert(`Downloading ${resource}...`)}
                      className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-700">{resource}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
