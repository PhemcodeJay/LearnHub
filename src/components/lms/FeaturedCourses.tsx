import React from 'react';
import { Course } from '@/data/courses';
import CourseCard from './CourseCard';
import { ChevronRightIcon } from './Icons';

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
  const featured = courses.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
            <p className="text-gray-500 mt-2">Top-rated courses loved by thousands of students</p>
          </div>
          <button
            onClick={onViewAll}
            className="hidden sm:flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View All Courses
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>

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

        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={onViewAll}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
