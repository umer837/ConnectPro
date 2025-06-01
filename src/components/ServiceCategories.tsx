
import React from 'react';
import { Home, Car, Wrench, Palette, Heart, Laptop, Scissors, Camera } from 'lucide-react';

const ServiceCategories = () => {
  const categories = [
    {
      name: 'Home Services',
      icon: Home,
      description: 'Cleaning, repairs, maintenance',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Automotive',
      icon: Car,
      description: 'Auto repair, detailing, towing',
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Handyman',
      icon: Wrench,
      description: 'Plumbing, electrical, carpentry',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      name: 'Creative',
      icon: Palette,
      description: 'Design, photography, art',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'Health & Wellness',
      icon: Heart,
      description: 'Fitness, massage, nutrition',
      color: 'bg-red-100 text-red-600'
    },
    {
      name: 'Technology',
      icon: Laptop,
      description: 'IT support, web design, tutoring',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      name: 'Beauty',
      icon: Scissors,
      description: 'Hair, nails, skincare',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      name: 'Events',
      icon: Camera,
      description: 'Photography, catering, planning',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Service Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover professional services across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/providers"
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            View All Providers
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
