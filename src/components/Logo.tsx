import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* EE Logo */}
      <div 
        className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-none border-2 border-black shadow-brutal cursor-pointer hover:scale-110 hover:rotate-2 transition-all duration-200 active:scale-95"
        onClick={() => window.location.href = '/'}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 relative">
            {/* Lightning bolt design */}
            <div className="absolute top-0 left-2 w-2 h-2 bg-white"></div>
            <div className="absolute top-1 left-1 w-4 h-1 bg-white"></div>
            <div className="absolute top-2 left-2 w-2 h-1 bg-white"></div>
            <div className="absolute top-3 left-1 w-4 h-1 bg-white"></div>
            <div className="absolute top-4 left-2 w-2 h-2 bg-white"></div>
          </div>
        </div>
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
