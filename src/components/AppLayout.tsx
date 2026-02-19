import React, { useState, useCallback } from 'react';
import { useUserData } from '@/hooks/useUserData';
import Navbar from './lms/Navbar';
import HeroSection from './lms/HeroSection';
import CategorySection from './lms/CategorySection';
import FeaturedCourses from './lms/FeaturedCourses';
import FeaturesSection from './lms/FeaturesSection';
import InstructorSection from './lms/InstructorSection';
import TestimonialsSection from './lms/TestimonialsSection';
import StatsSection from './lms/StatsSection';
import CourseCatalog from './lms/CourseCatalog';
import CourseDetail from './lms/CourseDetail';
import Dashboard from './lms/Dashboard';
import Footer from './lms/Footer';
import SignInModal from './lms/SignInModal';

type View = 'home' | 'catalog' | 'dashboard' | 'course-detail';

const AppLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [initialCategory, setInitialCategory] = useState('All');

  const {
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
    refetch,
  } = useUserData();

  const handleNavigate = useCallback((view: string) => {
    if (view === 'home' || view === 'catalog' || view === 'dashboard') {
      setCurrentView(view as View);
      if (view !== 'catalog') {
        setSearchQuery('');
        setInitialCategory('All');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCourse = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = useCallback((category: string) => {
    setSearchQuery('');
    setInitialCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  // Global loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading your workspace...</h2>
          <p className="text-sm text-gray-500">Syncing courses, progress, and preferences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Global Error Toast */}
      {error && (
        <div className="fixed top-20 right-4 z-[200] max-w-sm animate-slide-in">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-800">Something went wrong</p>
                <p className="text-xs text-red-600 mt-1 line-clamp-2">{error}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={refetch}
                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Retry
                  </button>
                  <button
                    onClick={clearError}
                    className="px-3 py-1.5 bg-white text-red-700 text-xs font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearch={(q) => {
          setSearchQuery(q);
          if (q && currentView !== 'catalog') {
            setCurrentView('catalog');
          }
        }}
      />

      {/* Home View */}
      {currentView === 'home' && (
        <>
          <HeroSection
            onExploreCourses={() => handleNavigate('catalog')}
            onViewDashboard={() => handleNavigate('dashboard')}
          />
          <CategorySection onSelectCategory={handleSelectCategory} />
          <FeaturedCourses
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onViewAll={() => handleNavigate('catalog')}
            bookmarkedCourses={bookmarkedCourses}
            onBookmark={handleBookmark}
          />
          <FeaturesSection />
          <InstructorSection />
          <TestimonialsSection />
          <StatsSection onGetStarted={() => setShowSignIn(true)} />
        </>
      )}

      {/* Catalog View */}
      {currentView === 'catalog' && (
        <CourseCatalog
          courses={courses}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onSelectCourse={handleSelectCourse}
          bookmarkedCourses={bookmarkedCourses}
          onBookmark={handleBookmark}
          initialCategory={initialCategory}
        />
      )}

      {/* Dashboard View */}
      {currentView === 'dashboard' && (
        <Dashboard
          courses={courses}
          onSelectCourse={handleSelectCourse}
          user={user}
        />
      )}

      {/* Course Detail View */}
      {currentView === 'course-detail' && selectedCourse && (
        <CourseDetail
          course={selectedCourse}
          onBack={() => {
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onEnroll={handleEnroll}
          isBookmarked={bookmarkedCourses.has(selectedCourse.id)}
          onBookmark={handleBookmark}
          initialNotes={notesMap[selectedCourse.id] || ''}
          onSaveNote={handleSaveNote}
          onToggleLesson={handleToggleLesson}
          isSaving={isSaving}
        />
      )}

      <Footer onNavigate={handleNavigate} />
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </div>
  );
};

export default AppLayout;
