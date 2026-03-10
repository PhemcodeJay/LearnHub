import React from 'react';
import { Course } from '@/data/courses';
import CourseCard from './CourseCard';
import { ChevronRightIcon, StarIcon } from './Icons';

interface FeaturedCoursesProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onViewAll: () => void;
  bookmarkedCourses: Set<string>;
  onBookmark: (courseId: string) => void;
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  courses,
  onSelectCourse,
  onViewAll,
  bookmarkedCourses,
  onBookmark,
}) => {
  // Get top-rated or most popular courses
  const featured = courses
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // Get market trend data (just for display)
  const trendingCategories = ['Derivatives Trading', 'DeFi', 'Web3 Development'];
  const trendingCount = courses.filter(c => trendingCategories.includes(c.category)).length;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with crypto stats */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-orange-600/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold">
                🔥 TRENDING NOW
              </span>
              <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold">
                📈 +45% THIS MONTH
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white">Popular Courses</h2>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Top-rated cryptocurrency and blockchain courses trusted by thousands of traders worldwide
            </p>
          </div>
          
          {/* Market stats */}
          <div className="flex items-center gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2">
              <div className="text-xs text-gray-400">Trending Categories</div>
              <div className="text-lg font-bold text-white">{trendingCount}</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2">
              <div className="text-xs text-gray-400">Avg Rating</div>
              <div className="text-lg font-bold text-yellow-400 flex items-center gap-1">
                4.8 <StarIcon className="w-4 h-4" filled />
              </div>
            </div>
          </div>
        </div>

        {/* Featured course grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelectCourse}
              onBookmark={onBookmark}
              isBookmarked={bookmarkedCourses.has(course.id)}
            />
          ))}
        </div>

        {/* Bottom section with CTA and market update */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
              📈
            </div>
            <div>
              <p className="text-sm text-gray-400">Market Update</p>
              <p className="text-sm font-semibold text-white">Derivatives volume up 45% • 12 new courses added</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onViewAll}
              className="flex-1 sm:flex-none px-6 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              Explore All Courses
              <ChevronRightIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectCourse('1')} // Quick access to derivatives course
              className="hidden sm:flex px-6 py-3 bg-gray-800 text-gray-300 font-medium rounded-xl hover:bg-gray-700 transition-colors border border-gray-700"
            >
              Derivatives 🔥
            </button>
          </div>
        </div>

        {/* Mobile view all button */}
        <div className="mt-6 text-center sm:hidden">
          <button
            onClick={onViewAll}
            className="w-full px-6 py-3 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors border border-gray-700"
          >
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;