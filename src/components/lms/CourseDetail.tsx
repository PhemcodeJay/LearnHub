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
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
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

  const handleLessonClick = (lesson: any) => {
    if (!course.isEnrolled && activeTab === 'curriculum') {
      alert('Please enroll in the course to access lessons');
      return;
    }
    setSelectedLesson(lesson);
    // In a real app, this would open a video player or lesson view
  };

  const isNoteSaving = isSaving[`note-${course.id}`];

  // Market sentiment indicator (just for visual flair)
  const marketSentiment = course.category.includes('Derivatives') ? 'Bullish' : 'Neutral';

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Catalog</span>
          </button>
          <div className="flex items-center gap-3">
            {/* Market indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-lg border border-gray-700">
              <StarIcon className={`w-4 h-4 ${marketSentiment === 'Bullish' ? 'text-green-400' : 'text-yellow-400'}`} />
              <span className="text-xs font-medium text-gray-300">Market: {marketSentiment}</span>
            </div>
            
            {/* Saving indicator */}
            {Object.entries(isSaving).some(([k, v]) => v && k.startsWith(`lesson-${course.id}`)) && (
              <div className="flex items-center gap-2 text-sm text-orange-400">
                <div className="w-3 h-3 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            )}
            <button
              onClick={() => onBookmark(course.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-orange-900/30 border-orange-700 text-orange-400'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <BookmarkIcon className="w-5 h-5" filled={isBookmarked} />
            </button>
          </div>
        </div>
      </div>

      {/* Course Header */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 text-white border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-orange-600/20 border border-orange-500/30 rounded-full text-orange-400 text-sm">
                  {course.category}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  course.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400 border border-green-500/30' :
                  course.difficulty === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-red-600/20 text-red-400 border border-red-500/30'
                }`}>
                  {course.difficulty}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-400 text-lg mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" filled />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-500">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <UsersIcon className="w-4 h-4" />
                  <span>{course.enrolled.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <ClockIcon className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/30"
                />
                <div>
                  <p className="font-semibold">{course.instructor.name}</p>
                  <p className="text-sm text-gray-400">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 self-start">
              <div className="aspect-video rounded-lg overflow-hidden mb-4 relative group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                  <div className="w-16 h-16 bg-orange-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-7 h-7 text-white ml-1" />
                  </div>
                </div>
              </div>

              <div className="text-3xl font-bold text-white mb-4">${course.price}</div>

              {course.isEnrolled ? (
                <div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="font-semibold text-green-400">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className="w-full py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
                  >
                    Continue Learning
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {enrolling && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {enrolling ? 'Processing...' : 'Enroll Now'}
                </button>
              )}

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Lessons</span>
                  <span className="font-medium text-white">{course.lessons}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Duration</span>
                  <span className="font-medium text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Access</span>
                  <span className="font-medium text-white">Lifetime</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Certificate</span>
                  <span className="font-medium text-white">Included</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-900 text-gray-300 text-xs rounded-md font-medium border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {(['overview', 'curriculum', 'reviews', 'notes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
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
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'Master futures, swaps, and forward contracts',
                      'Implement sophisticated arbitrage strategies',
                      'Manage risk with professional hedging techniques',
                      'Understand leverage and margin requirements',
                      'Analyze market sentiment and price discovery',
                      'Build diversified crypto portfolios',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Course Description</h2>
                  <p className="text-gray-400 leading-relaxed">{course.description}</p>
                  <p className="text-gray-400 leading-relaxed mt-4">
                    Derivatives are financial contracts whose value is derived from the performance of an underlying asset, 
                    such as a cryptocurrency. These contracts enable traders to speculate on price movements, hedge against 
                    risks, or gain exposure to assets without owning them outright.
                  </p>
                  <p className="text-gray-400 leading-relaxed mt-4">
                    This comprehensive course is designed for traders looking to master cryptocurrency derivatives. 
                    Whether you're seeking to hedge against risks, speculate on price movements, or optimize your portfolio, 
                    derivatives trading provides a rich landscape for exploration and growth.
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">About the Instructor</h2>
                  <div className="flex items-start gap-4">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-orange-500/30"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{course.instructor.name}</h3>
                      <p className="text-sm text-orange-400 mb-2">{course.instructor.title}</p>
                      <p className="text-sm text-gray-400">
                        An experienced professional with over 10 years in traditional and crypto derivatives markets. 
                        Passionate about teaching and helping students navigate the complexities of cryptocurrency trading 
                        with confidence and precision.
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" filled />
                          4.9 Rating
                        </span>
                        <span className="flex items-center gap-1">
                          <UsersIcon className="w-4 h-4" />
                          15K+ Students
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features Section */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Key Features of Derivatives Trading</h2>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <CheckIcon className="w-6 h-6 text-orange-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">Sophisticated Strategies</h3>
                        <p className="text-sm text-gray-400">Derivatives trading allows for the implementation of complex trading strategies, including arbitrage, speculation, and risk management techniques.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckIcon className="w-6 h-6 text-orange-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">Leverage</h3>
                        <p className="text-sm text-gray-400">Derivatives trading often involves the use of leverage, which amplifies both potential profits and losses. Learn robust risk management practices.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckIcon className="w-6 h-6 text-orange-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">Market Efficiency</h3>
                        <p className="text-sm text-gray-400">Derivatives markets contribute to price discovery and market efficiency by providing liquidity and facilitating risk transfer among market participants.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
                  <span className="text-sm text-gray-400">
                    {completedLessons}/{totalLessons} lessons completed
                  </span>
                </div>
                {course.modules.map((module, idx) => {
                  const moduleCompleted = module.lessons.filter((l) => l.completed).length;
                  const moduleTotal = module.lessons.length;
                  return (
                    <div key={module.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-5 hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            moduleCompleted === moduleTotal && moduleTotal > 0
                              ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                              : 'bg-orange-600/20 text-orange-400 border border-orange-500/30'
                          }`}>
                            {moduleCompleted === moduleTotal && moduleTotal > 0 ? (
                              <CheckIcon className="w-4 h-4" />
                            ) : (
                              idx + 1
                            )}
                          </span>
                          <div className="text-left">
                            <h3 className="font-semibold text-white">{module.title}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {moduleCompleted}/{moduleTotal} lessons • {module.lessons.reduce((acc, l) => {
                                const [mins] = l.duration.split(':');
                                return acc + parseInt(mins);
                              }, 0)} min total
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
                        <div className="border-t border-gray-700">
                          {module.lessons.map((lesson) => {
                            const lessonSaving = isSaving[`lesson-${course.id}-${lesson.id}`];
                            return (
                              <div
                                key={lesson.id}
                                onClick={() => handleLessonClick(lesson)}
                                className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${
                                  course.isEnrolled 
                                    ? 'hover:bg-gray-700/50 cursor-pointer' 
                                    : 'opacity-75 cursor-not-allowed'
                                }`}
                              >
                                {/* Completion toggle */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLessonToggle(lesson.id);
                                  }}
                                  disabled={!course.isEnrolled || lessonSaving}
                                  className={`flex-shrink-0 ${!course.isEnrolled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                  title={course.isEnrolled ? (lesson.completed ? 'Mark as incomplete' : 'Mark as complete') : 'Enroll to track progress'}
                                >
                                  {lessonSaving ? (
                                    <span className="w-6 h-6 flex items-center justify-center">
                                      <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                    </span>
                                  ) : lesson.completed ? (
                                    <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                                    </span>
                                  ) : (
                                    <span className="w-6 h-6 border-2 border-gray-600 rounded-full flex items-center justify-center hover:border-orange-400 transition-colors">
                                      {lesson.type === 'video' ? (
                                        <PlayIcon className="w-3 h-3 text-gray-400" />
                                      ) : (
                                        <NoteIcon className="w-3 h-3 text-gray-400" />
                                      )}
                                    </span>
                                  )}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                                    {lesson.title}
                                  </p>
                                  {lesson.content && (
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{lesson.content.substring(0, 100)}...</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400 capitalize px-2 py-0.5 bg-gray-900 rounded border border-gray-700">
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

                {/* Preview Note */}
                {!course.isEnrolled && (
                  <div className="mt-4 p-4 bg-orange-600/10 border border-orange-500/30 rounded-lg">
                    <p className="text-sm text-orange-400 text-center">
                      🔒 Enroll to access all lessons and track your progress
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Student Reviews</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Alex Johnson', rating: 5, text: 'Incredible course! The derivatives section alone is worth the price. I\'m now confidently trading futures and understanding funding rates.', time: '2 weeks ago' },
                    { name: 'Maria Garcia', rating: 5, text: 'Best crypto trading course I\'ve taken. The instructor explains complex concepts like contango and backwardation in a very digestible way.', time: '1 month ago' },
                    { name: 'David Lee', rating: 4, text: 'Great content on swaps and forwards. Would love to see more on options strategies in future updates.', time: '1 month ago' },
                    { name: 'Sophie Turner', rating: 5, text: 'The risk management section saved me from a major loss. I finally understand how to hedge properly!', time: '2 months ago' },
                    { name: 'Marcus Webb', rating: 5, text: 'As someone from traditional finance, this course bridged the gap perfectly. The arbitrage strategies are pure gold.', time: '3 months ago' },
                  ].map((review, i) => (
                    <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{review.name}</p>
                            <p className="text-xs text-gray-400">{review.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <StarIcon key={j} className="w-4 h-4 text-yellow-400" filled={j < review.rating} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">My Trading Notes</h2>
                {!course.isEnrolled ? (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
                    <NoteIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Enroll to take notes</h3>
                    <p className="text-gray-400 text-sm mb-4">Keep track of your trading strategies and key concepts. Notes are available for enrolled courses.</p>
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="px-6 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes on trading strategies, key concepts, and market insights... Your notes auto-save after you stop typing."
                      className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-600"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{notes.length} characters</span>
                        {isNoteSaving && (
                          <span className="flex items-center gap-1.5 text-xs text-orange-400">
                            <div className="w-3 h-3 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </span>
                        )}
                        {noteSaved && !isNoteSaving && (
                          <span className="flex items-center gap-1.5 text-xs text-green-400">
                            <CheckIcon className="w-3 h-3" />
                            Saved to cloud
                          </span>
                        )}
                      </div>
                      <button
                        onClick={handleManualSave}
                        disabled={isNoteSaving}
                        className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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

          {/* Sidebar - Trading Stats (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-40 space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">Course Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Overall</span>
                      <span className="font-semibold text-white">{course.progress || 0}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{completedLessons}</div>
                      <div className="text-xs text-gray-400">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{totalLessons - completedLessons}</div>
                      <div className="text-xs text-gray-400">Remaining</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Tools */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">Trading Tools</h3>
                <div className="space-y-3">
                  {['Derivatives Calculator', 'Position Size Tool', 'Risk/Reward Sheet', 'Funding Rate Tracker'].map((tool, i) => (
                    <button
                      key={i}
                      onClick={() => alert(`Opening ${tool}...`)}
                      className="w-full flex items-center gap-3 p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors text-left border border-gray-700"
                    >
                      <PlayIcon className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{tool}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Market Data */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Real-time market data</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">BTC Perpetual Funding</span>
                    <span className="text-green-400">0.01%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ETH Futures Basis</span>
                    <span className="text-yellow-400">+2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Open Interest</span>
                    <span className="text-white">$12.4B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Preview Modal (simplified) */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLesson(null)}>
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6 border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-2">{selectedLesson.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{selectedLesson.duration} • {selectedLesson.type}</p>
            {selectedLesson.content ? (
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 mb-4">
                <p className="text-gray-300">{selectedLesson.content}</p>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-700 mb-4">
                <PlayIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Video lesson preview</p>
              </div>
            )}
            <button
              onClick={() => setSelectedLesson(null)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;