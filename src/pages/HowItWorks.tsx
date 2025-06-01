
import React from 'react';
import { Search, UserCheck, MessageSquare, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Search & Browse",
      description: "Browse through our verified service providers by category or search for specific services in your area.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: UserCheck,
      title: "2. View Profiles",
      description: "Check provider profiles, portfolios, reviews, and ratings to find the perfect match for your needs.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MessageSquare,
      title: "3. Send Inquiry",
      description: "Contact providers directly through our platform with your requirements and get personalized quotes.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Star,
      title: "4. Book & Review",
      description: "Work with your chosen provider and leave a review to help other clients make informed decisions.",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const benefits = [
    {
      title: "Verified Professionals",
      description: "All service providers are thoroughly vetted and approved by our admin team."
    },
    {
      title: "Transparent Reviews",
      description: "Read genuine reviews from real customers to make informed decisions."
    },
    {
      title: "Direct Communication",
      description: "Communicate directly with providers without any intermediaries."
    },
    {
      title: "Secure Platform",
      description: "Your personal information and communications are protected and secure."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How ConnectPro Works</h1>
          <p className="text-xl text-gray-600">
            Connect with trusted event and media professionals in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex p-4 rounded-full ${step.color} mb-6`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* For Clients Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">For Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Service Providers Section */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">For Service Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Verified</h3>
              <p className="text-gray-600">
                Submit your profile and portfolio for admin approval to join our trusted network.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Receive Inquiries</h3>
              <p className="text-gray-600">
                Get direct inquiries from potential clients and respond with personalized quotes.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Reputation</h3>
              <p className="text-gray-600">
                Collect reviews and ratings to build your reputation and attract more clients.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers and service providers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/providers"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Find Services
            </a>
            <a
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Become a Provider
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
