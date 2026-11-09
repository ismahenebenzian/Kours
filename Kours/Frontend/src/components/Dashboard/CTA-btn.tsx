import React from 'react';

export const ShareCourseButton: React.FC = () => {
  return (
    <button className="flex items-[#center] justify-between gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-[12px] font-semibold hover:opacity-90 transition-opacity">
      <span>Partager un cours</span>
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  );
};

export default ShareCourseButton;