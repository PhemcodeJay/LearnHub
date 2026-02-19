import React from 'react';

interface StatsSectionProps {
  onGetStarted: () => void;
}

const StatsSection: React.FC<StatsSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Start Learning Today
            </h2>
            <p className="text-blue-100/80 text-lg mb-8 max-w-lg">
              Join our community of learners and unlock your potential. With expert-led courses, 
              hands-on projects, and a supportive community, your success is our priority.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
              >
                Get Started Free
              </button>
              <button className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '200+', label: 'Expert Courses', desc: 'Across 8 categories' },
              { value: '50K+', label: 'Active Students', desc: 'Learning worldwide' },
              { value: '150+', label: 'Expert Instructors', desc: 'Industry professionals' },
              { value: '95%', label: 'Success Rate', desc: 'Student satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium text-white mt-1">{stat.label}</div>
                <div className="text-xs text-blue-200/70 mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
