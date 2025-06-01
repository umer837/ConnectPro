import React from 'react';
import { Search, HelpCircle, MessageCircle, Book } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I find a service provider?",
      answer: "You can browse our verified providers by category or use the search function to find specific services in your area."
    },
    {
      question: "Are all service providers verified?",
      answer: "Yes, all service providers go through our verification process and are approved by our admin team before appearing on the platform."
    },
    {
      question: "How do I contact a provider?",
      answer: "Simply click on a provider's profile and use the contact form to send them an inquiry with your requirements."
    },
    {
      question: "Is there a fee for using ConnectPro?",
      answer: "ConnectPro is free for clients. Service providers may have subscription fees for premium features."
    },
    {
      question: "How do I leave a review?",
      answer: "After working with a provider, you can leave a review on their profile to help other clients make informed decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions and get support
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for help..."
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
          </div>

          {/* Quick Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
              <p className="text-gray-600">Learn how to use ConnectPro</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Communication</h3>
              <p className="text-gray-600">How to contact providers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Book className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Policies</h3>
              <p className="text-gray-600">Terms and guidelines</p>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still need help?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you with any questions
            </p>
            <Button asChild>
              <a href="/contact">Contact Support</a>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
