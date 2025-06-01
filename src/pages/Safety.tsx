
import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Safety = () => {
  const safetyFeatures = [
    {
      icon: CheckCircle,
      title: "Verified Providers",
      description: "All service providers undergo thorough verification including background checks and portfolio review."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your personal information is protected with industry-standard encryption and security measures."
    },
    {
      icon: Lock,
      title: "Safe Communication",
      description: "All initial communications happen through our secure platform before direct contact."
    },
    {
      icon: AlertTriangle,
      title: "Report System",
      description: "Easy reporting system for any safety concerns or inappropriate behavior."
    }
  ];

  const safetyTips = [
    {
      category: "Before Booking",
      tips: [
        "Review provider profiles, portfolios, and customer reviews carefully",
        "Verify provider credentials and business licenses when applicable",
        "Ask for detailed quotes and contracts before committing",
        "Check if the provider has insurance coverage for their services"
      ]
    },
    {
      category: "During Communication",
      tips: [
        "Keep all initial communications through the ConnectPro platform",
        "Be wary of providers asking for upfront payments before meeting",
        "Ask for references from recent clients",
        "Trust your instincts - if something feels wrong, don't proceed"
      ]
    },
    {
      category: "Meeting Providers",
      tips: [
        "Meet in public places for initial consultations when possible",
        "Bring someone with you to meetings if you feel more comfortable",
        "Verify the provider's identity matches their profile",
        "Document any agreements in writing"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Safety is Our Priority</h1>
          <p className="text-xl text-gray-600">
            Learn about our safety measures and best practices for using ConnectPro
          </p>
        </div>

        {/* Safety Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Safety Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Safety Tips</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {safetyTips.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.category}</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Report Issues */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-16">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-900 mb-4">Report Safety Concerns</h2>
            <p className="text-red-700 mb-6">
              If you encounter any safety issues, inappropriate behavior, or have concerns about a provider, 
              please report it immediately. We take all reports seriously and investigate promptly.
            </p>
            <a
              href="/contact"
              className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
            >
              Report an Issue
            </a>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Emergency Situations</h2>
            <p className="text-blue-700 mb-4">
              If you're in immediate danger or experiencing an emergency, please contact local emergency services first.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white p-4 rounded-md border border-blue-300">
                <h3 className="font-semibold text-blue-900">Emergency</h3>
                <p className="text-blue-700">Call 911</p>
              </div>
              <div className="bg-white p-4 rounded-md border border-blue-300">
                <h3 className="font-semibold text-blue-900">ConnectPro Support</h3>
                <p className="text-blue-700">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
