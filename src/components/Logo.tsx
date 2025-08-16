import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* System Icon Logo */}
      <div 
        className="p-3 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 border-2 border-black shadow-brutal cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
        onClick={() => window.location.href = '/'}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/>
          <path d="m7 16.5-4.74-2.85"/>
          <path d="m7 16.5 5-3"/>
          <path d="M7 16.5v5.17"/>
          <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/>
          <path d="m17 16.5-5-3"/>
          <path d="m17 16.5 4.74-2.85"/>
          <path d="M17 16.5v5.17"/>
          <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/>
          <path d="M12 8 7.26 5.15"/>
          <path d="m12 8 4.74-2.85"/>
          <path d="M12 13.5V8"/>
        </svg>
      </div>
      
      <div>
        <h1 
          className="text-2xl font-black text-black cursor-pointer hover:text-blue-600 hover:scale-105 transition-all duration-200 active:scale-95" 
          onClick={() => window.location.href = '/'}
        >
          uoee.rocks
        </h1>
        <div className="text-xs font-bold text-black">
          Built by <a href="https://farooqqureshi.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Farooq</a>
        </div>
      </div>
    </div>
  );
};

export default Logo;
