
import React from 'react';
import { Camera, Video, ChefHat, Calendar } from 'lucide-react';

const ServiceCategories = () => {
  const categories = [
    {
      name: 'Photographers',
      icon: Camera,
      description: 'Wedding, event, portrait photography',
      color: 'bg-blue-100 text-blue-600',
      href: '/providers?category=photographers'
    },
    {
      name: 'Videographers',
      icon: Video,
      description: 'Event filming, editing, production',
      color: 'bg-green-100 text-green-600',
      href: '/providers?category=videographers'
    },
    {
      name: 'Catering',
      icon: ChefHat,
      description: 'Event catering, meal planning',
      color: 'bg-orange-100 text-orange-600',
      href: '/providers?category=catering'
    },
    {
      name: 'Event Organizers',
      icon: Calendar,
      description: 'Wedding planning, event coordination',
      color: 'bg-purple-100 text-purple-600',
      href: '/providers?category=event-organizers'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Service Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover professional event and media services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.href}
              className="group cursor-pointer bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
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
            </a>
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
