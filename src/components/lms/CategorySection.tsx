import React from 'react';

interface CategorySectionProps {
  onSelectCategory: (category: string) => void;
}

const categoryData = [
  { name: 'Business', icon: '📊', count: 24, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50' },
  { name: 'Technology', icon: '💻', count: 42, color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50' },
  { name: 'Design', icon: '🎨', count: 18, color: 'from-pink-500 to-pink-600', bgLight: 'bg-pink-50' },
  { name: 'Marketing', icon: '📢', count: 21, color: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-50' },
  { name: 'Science', icon: '🔬', count: 15, color: 'from-green-500 to-green-600', bgLight: 'bg-green-50' },
  { name: 'Languages', icon: '🌍', count: 12, color: 'from-teal-500 to-teal-600', bgLight: 'bg-teal-50' },
  { name: 'Arts', icon: '🎭', count: 16, color: 'from-red-500 to-red-600', bgLight: 'bg-red-50' },
  { name: 'Personal Development', icon: '🧠', count: 19, color: 'from-indigo-500 to-indigo-600', bgLight: 'bg-indigo-50' },
];

const iconMap: Record<string, React.ReactNode> = {
  Business: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Technology: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Design: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  Marketing: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  Science: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  Languages: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  Arts: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  'Personal Development': (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Explore our diverse range of courses across 8 categories, designed to help you master new skills
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryData.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all text-left hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {iconMap[cat.name]}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.count} courses</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
