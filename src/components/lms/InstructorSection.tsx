import React from 'react';
import { StarIcon, UsersIcon } from './Icons';

const instructors = [
  {
    name: 'Sarah Chen',
    title: 'Senior Software Engineer',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364123803_f375b60e.png',
    courses: 8,
    students: 12453,
    rating: 4.9,
  },
  {
    name: 'Dr. James Mitchell',
    title: 'Data Science Director',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364100556_c77d932c.png',
    courses: 5,
    students: 8234,
    rating: 4.8,
  },
  {
    name: 'Emily Rodriguez',
    title: 'Lead UX Designer',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364117815_dbf6a3ce.jpg',
    courses: 6,
    students: 9876,
    rating: 4.7,
  },
  {
    name: 'Dr. Aisha Patel',
    title: 'AI Research Scientist',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364119119_ead4d6de.jpg',
    courses: 4,
    students: 6543,
    rating: 4.9,
  },
];

const InstructorSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Learn from the Best</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Our instructors are industry professionals with years of real-world experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <div
              key={instructor.name}
              className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100 group-hover:border-blue-100 transition-colors"
              />
              <h3 className="font-semibold text-gray-900">{instructor.name}</h3>
              <p className="text-sm text-blue-600 mt-0.5">{instructor.title}</p>
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-yellow-400" filled />
                  <span>{instructor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4" />
                  <span>{(instructor.students / 1000).toFixed(1)}k</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{instructor.courses} courses</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
