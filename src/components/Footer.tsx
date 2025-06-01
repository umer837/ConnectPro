
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ConnectPro</h3>
            <p className="text-gray-400">
              Connecting you with trusted event and media professionals.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/providers" className="hover:text-white">Find Services</a></li>
              <li><a href="/how-it-works" className="hover:text-white">How It Works</a></li>
              <li><a href="/safety" className="hover:text-white">Safety</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Providers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/register" className="hover:text-white">Join as Provider</a></li>
              <li><a href="/how-it-works" className="hover:text-white">Provider Resources</a></li>
              <li><a href="/team" className="hover:text-white">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/help" className="hover:text-white">Help Center</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ConnectPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
