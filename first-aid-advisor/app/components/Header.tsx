import { useState, useEffect } from 'react';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-dark py-2' : 'glass py-4'
    }`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-500 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-75"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center pulse-ring transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl font-bold">+</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 bg-clip-text text-transparent animate-gradient">
                First Aid & Home Care Advisor
              </h1>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
            <p className="text-gray-600 text-sm">Your 24/7 Medical Assistant</p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">AI Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};
