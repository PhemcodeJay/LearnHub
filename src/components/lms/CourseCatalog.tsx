import React, { useState, useMemo, useEffect } from 'react';
import { Course, categories } from '@/data/courses';
import CourseCard from './CourseCard';
import { SearchIcon, FilterIcon, ChevronDownIcon } from './Icons';

interface CourseCatalogProps {
  courses: Course[];
  searchQuery: string;
  onSearch: (query: string) => void;
  onSelectCourse: (courseId: string) => void;
  bookmarkedCourses: Set<string>;
  onBookmark: (courseId: string) => void;
  initialCategory?: string;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  searchQuery,
  onSearch,
  onSelectCourse,
  bookmarkedCourses,
  onBookmark,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);


  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query) ||
          c.instructor.name.toLowerCase().includes(query) ||
          c.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      result = result.filter((c) => c.difficulty === selectedDifficulty);
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.enrolled - a.enrolled);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Course Catalog</h2>
            <p className="text-gray-500 mt-1">Discover {filteredCourses.length} courses to advance your skills</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FilterIcon className="w-4 h-4" />
              Filters
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-8`}>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Search */}
            <div className="relative mb-6">
              <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by course name, topic, or instructor..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Difficulty Level</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === diff
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={onSelectCourse}
                onBookmark={onBookmark}
                isBookmarked={bookmarkedCourses.has(course.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                onSearch('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseCatalog;
