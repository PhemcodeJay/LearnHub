import React, { useState } from 'react';
import { Course } from '@/data/courses';
import { DbUser } from '@/lib/db';
import {
  BookIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  CertificateIcon,
  StarIcon,
  PlayIcon,
  CheckIcon,
} from './Icons';

interface DashboardProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  user: DbUser | null;
}

const Dashboard: React.FC<DashboardProps> = ({ courses, onSelectCourse, user }) => {
  const [activeSection, setActiveSection] = useState<'courses' | 'achievements' | 'schedule'>('courses');
  const enrolledCourses = courses.filter((c) => c.isEnrolled);
  const totalProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)
    : 0;

  const totalCompletedLessons = enrolledCourses.reduce((acc, c) => {
    return acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.filter((l) => l.completed).length, 0);
  }, 0);

  const hasAnyEnrollment = enrolledCourses.length > 0;
  const hasCompletedFiveLessons = totalCompletedLessons >= 5;
  const hasHalfwayProgress = enrolledCourses.some((c) => (c.progress || 0) >= 50);
  const hasFullCompletion = enrolledCourses.some((c) => (c.progress || 0) >= 100);
  const streak = user?.learning_streak || 0;
  const hasStreakSeven = streak >= 7;

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Enrolled in your first course', earned: hasAnyEnrollment, icon: BookIcon, color: 'bg-blue-500' },
    { id: 2, title: 'Quick Learner', description: 'Complete 5 lessons', earned: hasCompletedFiveLessons, icon: FireIcon, color: 'bg-orange-500' },
    { id: 3, title: 'Halfway There', description: 'Reach 50% in any course', earned: hasHalfwayProgress, icon: TrophyIcon, color: 'bg-yellow-500' },
    { id: 4, title: 'Consistent', description: '7-day learning streak', earned: hasStreakSeven, icon: FireIcon, color: 'bg-red-500' },
    { id: 5, title: 'Bookworm', description: 'Enroll in 3 courses', earned: enrolledCourses.length >= 3, icon: BookIcon, color: 'bg-purple-500' },
    { id: 6, title: 'Graduate', description: 'Complete your first course', earned: hasFullCompletion, icon: CertificateIcon, color: 'bg-green-500' },
  ];

  const earnedCount = achievements.filter((a) => a.earned).length;

  const displayName = user?.display_name || 'Learner';

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {displayName.split(' ')[0]}!</h1>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">Synced</span>
            </div>
          </div>
          <p className="text-gray-500 mt-1">Continue your learning journey. Your progress is saved automatically.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                <p className="text-sm text-gray-500">Enrolled Courses</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalProgress}%</p>
                <p className="text-sm text-gray-500">Avg. Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FireIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{streak}</p>
                <p className="text-sm text-gray-500">Day Streak</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrophyIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{earnedCount}</p>
                <p className="text-sm text-gray-500">Achievements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
          {(['courses', 'achievements', 'schedule'] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                activeSection === section
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {section === 'courses' ? 'My Courses' : section}
            </button>
          ))}
        </div>

        {/* My Courses */}
        {activeSection === 'courses' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Continue Learning</h2>
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex gap-4">
                    <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-medium text-blue-600">{course.category}</span>
                          <h3 className="font-semibold text-gray-900 mt-0.5 line-clamp-1 group-hover:text-blue-700 transition-colors">
                            {course.title}
                          </h3>
                        </div>
                        <button className="p-2 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors flex-shrink-0">
                          <PlayIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">{course.progress}% complete</span>
                          <span className="text-gray-400">{course.lessons} lessons</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {enrolledCourses.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <BookIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
                  <p className="text-gray-500 mb-4">Start your learning journey by enrolling in a course</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Completed Lessons Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Lesson Progress</h3>
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-blue-600">{totalCompletedLessons}</p>
                  <p className="text-sm text-gray-500 mt-1">Lessons Completed</p>
                </div>
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  {enrolledCourses.slice(0, 3).map((c) => {
                    const cLessons = c.modules.reduce((a, m) => a + m.lessons.length, 0);
                    const cCompleted = c.modules.reduce((a, m) => a + m.lessons.filter((l) => l.completed).length, 0);
                    return (
                      <div key={c.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 truncate max-w-[160px]">{c.title}</span>
                        <span className="text-gray-900 font-medium">{cCompleted}/{cLessons}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Learning Streak */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <FireIcon className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">{streak} Days</p>
                    <p className="text-sm text-orange-100">Learning Streak</p>
                  </div>
                </div>
                <p className="text-sm text-orange-100">Keep it up! Complete a lesson today to maintain your streak.</p>
                <div className="flex gap-1 mt-3">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full ${i < Math.min(streak, 7) ? 'bg-white' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-orange-200">
                  <span>Mon</span>
                  <span>Sun</span>
                </div>
              </div>

              {/* DB Status */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  <span className="text-gray-600">All data persisted to database</span>
                </div>
                {user && (
                  <p className="text-xs text-gray-400 mt-2">User ID: {user.id.slice(0, 8)}...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Achievements */}
        {activeSection === 'achievements' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Achievements</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-xl border p-6 transition-all ${
                    achievement.earned
                      ? 'border-gray-200 hover:shadow-md'
                      : 'border-dashed border-gray-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      achievement.earned ? achievement.color : 'bg-gray-200'
                    }`}>
                      <achievement.icon className={`w-7 h-7 ${achievement.earned ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                      {achievement.earned ? (
                        <span className="text-xs text-green-600 font-medium mt-1 inline-block">Earned</span>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium mt-1 inline-block">Locked</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule */}
        {activeSection === 'schedule' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Schedule</h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {[
                { day: 'Monday', time: '9:00 AM', course: 'Business Analytics', type: 'Lecture' },
                { day: 'Tuesday', time: '2:00 PM', course: 'Web Development', type: 'Lab Session' },
                { day: 'Wednesday', time: '10:00 AM', course: 'UX Design', type: 'Workshop' },
                { day: 'Thursday', time: '3:00 PM', course: 'Spanish', type: 'Practice' },
                { day: 'Friday', time: '11:00 AM', course: 'Web Development', type: 'Project Review' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-6 p-5 ${i !== 4 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <div className="w-24 flex-shrink-0">
                    <p className="font-semibold text-gray-900">{item.day}</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.course}</p>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
