import React from 'react';
import { PlayIcon } from './Icons';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onViewDashboard: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCourses, onViewDashboard }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-700/50 border border-blue-500/30 rounded-full text-blue-200 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Over 50,000 students learning right now
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transform Your
              <span className="block bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Future with Learning
              </span>
            </h1>
            <p className="text-lg text-blue-100/80 mb-8 max-w-lg leading-relaxed">
              Access world-class courses from industry experts. Build skills that matter, earn certificates, and advance your career at your own pace.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onExploreCourses}
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
              >
                Explore Courses
              </button>
              <button
                onClick={onViewDashboard}
                className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <PlayIcon className="w-5 h-5" />
                My Dashboard
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-sm text-blue-200/70 mt-1">Expert Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-blue-200/70 mt-1">Active Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-blue-200/70 mt-1">Completion Rate</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771363967974_8009751d.png"
                alt="Students learning"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Course Completed!</p>
                <p className="text-xs text-gray-500">Web Development Bootcamp</p>
              </div>
            </div>
            {/* Floating Card 2 */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></div>
              </div>
              <span className="text-xs font-medium text-gray-600">+2.4k joined today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
