import React from 'react';
import { StarIcon } from './Icons';

const testimonials = [
  {
    id: 1,
    name: 'Jessica Williams',
    role: 'Software Developer',
    text: 'LearnHub completely transformed my career. The web development bootcamp gave me the skills I needed to land my dream job at a top tech company.',
    rating: 5,
    avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364117815_dbf6a3ce.jpg',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Data Analyst',
    text: 'The data science course was incredibly well-structured. The hands-on projects and real-world datasets made learning practical and engaging.',
    rating: 5,
    avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364079300_f2dd486d.jpg',
  },
  {
    id: 3,
    name: 'Sarah Mitchell',
    role: 'UX Designer',
    text: 'The UX design masterclass exceeded my expectations. The instructor\'s expertise and the community support made all the difference in my learning journey.',
    rating: 5,
    avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364118665_7d7591e7.jpg',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Join thousands of satisfied learners who have transformed their careers through our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" filled={i < t.rating} />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
