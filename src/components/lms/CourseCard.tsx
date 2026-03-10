import React from 'react';
import { Course } from '@/data/courses';
import { StarIcon, ClockIcon, UsersIcon, BookmarkIcon } from './Icons';

interface CourseCardProps {
  course: Course;
  onSelect: (courseId: string) => void;
  onBookmark: (courseId: string) => void;
  isBookmarked: boolean;
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
};

const categoryColors: Record<string, string> = {
  'Derivatives Trading': 'bg-purple-100 text-purple-700',
  'Blockchain Technology': 'bg-blue-100 text-blue-700',
  'DeFi': 'bg-cyan-100 text-cyan-700',
  'Web3 Development': 'bg-indigo-100 text-indigo-700',
  'NFT Markets': 'bg-pink-100 text-pink-700',
  'Technical Analysis': 'bg-orange-100 text-orange-700',
  'Risk Management': 'bg-red-100 text-red-700',
  'Crypto Fundamentals': 'bg-emerald-100 text-emerald-700',
};

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, onBookmark, isBookmarked }) => {
  return (
    <div
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
      onClick={() => onSelect(course.id)}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Bookmark */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(course.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
        >
          <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'text-orange-600' : 'text-gray-500'}`} filled={isBookmarked} />
        </button>

        {/* Difficulty Badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold ${difficultyColors[course.difficulty]}`}>
          {course.difficulty}
        </span>

        {/* Category Badge (optional overlay) */}
        <span className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold ${categoryColors[course.category] || 'bg-gray-100 text-gray-700'}`}>
          {course.category}
        </span>

        {/* Progress bar for enrolled courses */}
        {course.isEnrolled && course.progress !== undefined && course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="mt-2 text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-700 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">{course.shortDescription}</p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-4">
          <img src={course.instructor.avatar} alt={course.instructor.name} className="w-7 h-7 rounded-full object-cover" />
          <span className="text-sm text-gray-600">{course.instructor.name}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-400" filled />
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
            <span className="text-xs text-gray-400">({course.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <ClockIcon className="w-3.5 h-3.5" />
            <span className="text-xs">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <UsersIcon className="w-3.5 h-3.5" />
            <span className="text-xs">{course.enrolled.toLocaleString()}</span>
          </div>
        </div>

        {/* Price & Enroll */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">${course.price}</span>
          {course.isEnrolled ? (
            <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg">
              {course.progress}% Complete
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(course.id);
              }}
              className="px-4 py-1.5 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;