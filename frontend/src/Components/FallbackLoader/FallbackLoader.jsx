import React from 'react';

const FallbackLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default FallbackLoader;
