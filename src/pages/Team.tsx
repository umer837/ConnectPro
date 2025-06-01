
import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Team = () => {
  const teamMembers = [
    {
      name: "Umar Farooq",
      role: "Lead Developer & Project Manager",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/umarfarooq",
      email: "umar@connectpro.com",
      description: "Full-stack developer with expertise in React, Node.js, and MongoDB. Leads the technical architecture and project development."
    },
    {
      name: "Tahir",
      role: "Frontend Developer & UI/UX Designer",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/tahir",
      email: "tahir@connectpro.com",
      description: "Specializes in creating beautiful, responsive user interfaces and exceptional user experiences using React and Tailwind CSS."
    },
    {
      name: "Malik Anas",
      role: "Backend Developer & Database Architect",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/malikanas",
      email: "anas@connectpro.com",
      description: "Backend specialist focused on API development, database design, and system architecture using Node.js and MongoDB."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600">
            The passionate developers behind ConnectPro
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm mb-6">{member.description}</p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-600 hover:text-gray-700 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Story */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              ConnectPro was born from a simple idea: making it easier for people to find and connect 
              with trusted service providers for their special events and media needs. Our team combines 
              years of experience in web development, user experience design, and system architecture.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We believe in creating technology that brings people together and helps build meaningful 
              professional relationships. Our platform is designed with both clients and service providers 
              in mind, ensuring a seamless experience for everyone involved.
            </p>
            <p className="text-lg text-gray-600">
              Each team member brings unique skills and perspectives, working together to continuously 
              improve and expand the ConnectPro platform.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              We constantly innovate to provide the best possible experience for our users.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust</h3>
            <p className="text-gray-600">
              Building trust between clients and service providers is at the core of what we do.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
            <p className="text-gray-600">
              We maintain high standards in everything we do, from code quality to user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
