import React, { useState, useMemo, useEffect } from 'react';
import { Course, categories } from '@/data/courses';
import CourseCard from './CourseCard';
import { SearchIcon, FilterIcon, ChevronDownIcon, ClockIcon } from './Icons';

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
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
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

    // Price range filter
    if (selectedPriceRange !== 'All') {
      switch (selectedPriceRange) {
        case 'under-50':
          result = result.filter((c) => c.price < 50);
          break;
        case '50-100':
          result = result.filter((c) => c.price >= 50 && c.price <= 100);
          break;
        case '100-200':
          result = result.filter((c) => c.price > 100 && c.price <= 200);
          break;
        case 'over-200':
          result = result.filter((c) => c.price > 200);
          break;
      }
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
      case 'duration-short':
        result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case 'duration-long':
        result.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        break;
    }

    return result;
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, selectedPriceRange, sortBy]);

  // Stats for the header
  const totalStudents = useMemo(() => {
    return courses.reduce((acc, course) => acc + course.enrolled, 0).toLocaleString();
  }, [courses]);

  const averageRating = useMemo(() => {
    const avg = courses.reduce((acc, course) => acc + course.rating, 0) / courses.length;
    return avg.toFixed(1);
  }, [courses]);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with crypto stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Crypto Trading Academy</h2>
              <p className="text-gray-400 mt-1">Master cryptocurrency trading, blockchain, and Web3 technologies</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2">
                <div className="text-xs text-gray-400">Total Students</div>
                <div className="text-lg font-bold text-white">{totalStudents}</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2">
                <div className="text-xs text-gray-400">Avg Rating</div>
                <div className="text-lg font-bold text-yellow-400">{averageRating} ★</div>
              </div>
            </div>
          </div>
          
          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setSortBy('popular')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                sortBy === 'popular' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Most Popular
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                sortBy === 'rating' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Top Rated
            </button>
            <button
              onClick={() => setSortBy('duration-short')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                sortBy === 'duration-short' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              Quickest
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === 'under-50' ? 'All' : 'under-50')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedPriceRange === 'under-50' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              💰
              Under $50
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            {/* Search */}
            <div className="relative mb-6">
              <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses, topics, instructors..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter toggles for mobile */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
              >
                <FilterIcon className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  <option value="popular">Popular</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low</option>
                  <option value="price-high">Price: High</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Filter content - visible on desktop, toggle on mobile */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6`}>
              {/* Category Pills */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'bg-gray-900 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Difficulty Level</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDifficulty === diff
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'bg-gray-900 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Price Range</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'All', label: 'All Prices' },
                    { value: 'under-50', label: 'Under $50' },
                    { value: '50-100', label: '$50 - $100' },
                    { value: '100-200', label: '$100 - $200' },
                    { value: 'over-200', label: 'Over $200' },
                  ].map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setSelectedPriceRange(range.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedPriceRange === range.value
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'bg-gray-900 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredCourses.length}</span> courses
          </p>
          <div className="hidden md:block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration-short">Shortest Duration</option>
              <option value="duration-long">Longest Duration</option>
            </select>
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
          <div className="text-center py-20 bg-gray-800/30 rounded-xl border border-gray-700">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No courses found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                onSearch('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedPriceRange('All');
              }}
              className="px-6 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Market trends banner */}
        {filteredCourses.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">🚀 Crypto Market Update</h3>
                <p className="text-orange-100">Derivatives trading volume up 45% this quarter. Perfect time to upgrade your skills!</p>
              </div>
              <button
                onClick={() => setSelectedCategory('Derivatives Trading')}
                className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap"
              >
                View Derivatives Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseCatalog;