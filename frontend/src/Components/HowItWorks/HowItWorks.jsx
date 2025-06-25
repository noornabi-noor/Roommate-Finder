import React from 'react';
import { FaUserPlus, FaSearch, FaComments, FaHome } from 'react-icons/fa';

const steps = [
  {
    icon: <FaUserPlus className="text-3xl text-black" />,
    title: 'Create Your Profile',
    description: 'Sign up and set your preferences to get matched with the best roommates.',
  },
  {
    icon: <FaSearch className="text-3xl text-black" />,
    title: 'Find a Roommate',
    description: 'Browse profiles or list your space for others to find you easily.',
  },
  {
    icon: <FaComments className="text-3xl text-black" />,
    title: 'Connect & Chat',
    description: 'Reach out to potential roommates through our secure chat system.',
  },
  {
    icon: <FaHome className="text-3xl text-black" />,
    title: 'Move In',
    description: 'Finalize your decision and start living with your new roommate!',
  },
];

const HowItWorks = () => {
  return (
    <div className="mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-2xl
                       hover:shadow-lg 
                       transform hover:-translate-y-2 hover:scale-105 transition-transform ease-in-out duration-300
                       min-h-[260px]"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl text-primary font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
