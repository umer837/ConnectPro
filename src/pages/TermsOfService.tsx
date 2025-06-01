import React from 'react';
import { Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Last updated: December 1, 2024</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using ConnectPro, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 mb-4">
                  ConnectPro is a platform that connects clients with verified service providers 
                  including photographers, videographers, caterers, and event organizers. We facilitate 
                  connections but are not party to any agreements between clients and service providers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                <ul className="text-gray-600 space-y-2 ml-6">
                  <li>• Provide accurate and complete information</li>
                  <li>• Maintain the security of your account</li>
                  <li>• Use the service in compliance with all applicable laws</li>
                  <li>• Respect other users and maintain professional conduct</li>
                  <li>• Not engage in fraudulent or harmful activities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Provider Terms</h2>
                <p className="text-gray-600 mb-4">
                  Service providers must undergo verification before appearing on the platform. 
                  They are responsible for:
                </p>
                <ul className="text-gray-600 space-y-2 ml-6">
                  <li>• Providing accurate service descriptions and pricing</li>
                  <li>• Maintaining professional standards</li>
                  <li>• Responding to client inquiries promptly</li>
                  <li>• Delivering services as agreed with clients</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
                <p className="text-gray-600 mb-4">
                  We are committed to protecting your privacy. Personal information collected 
                  is used solely for platform functionality and will not be shared with third 
                  parties without consent, except as required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  ConnectPro acts as a platform connecting clients and service providers. We are 
                  not responsible for the quality of services provided, disputes between parties, 
                  or any damages arising from the use of our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications to Terms</h2>
                <p className="text-gray-600 mb-4">
                  ConnectPro reserves the right to modify these terms at any time. Users will be 
                  notified of significant changes, and continued use of the platform constitutes 
                  acceptance of modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="text-gray-600">
                  For questions about these Terms of Service, please contact us at 
                  <a href="mailto:legal@connectpro.com" className="text-blue-600 hover:underline"> legal@connectpro.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
