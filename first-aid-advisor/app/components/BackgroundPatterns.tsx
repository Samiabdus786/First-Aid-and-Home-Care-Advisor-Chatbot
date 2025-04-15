export const WavyPattern = () => (
  <div className="fixed inset-0 -z-10">
    <svg width="100%" height="100%" className="opacity-[0.03]">
      <defs>
        <pattern id="medical-cross" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M15 0v15H0v10h15v15h10V25h15V15H25V0H15z" fill="currentColor"/>
        </pattern>
        <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 50 Q 25 0, 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="2"/>
        </pattern>
        <linearGradient id="medical-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
          <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#medical-gradient)"/>
      <rect width="100%" height="100%" fill="url(#medical-cross)"/>
      <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
    </svg>
  </div>
);

export const PulsingDots = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute w-4 h-4 bg-blue-500 rounded-full animate-ping" style={{ top: '10%', left: '20%', animationDelay: '0s' }} />
    <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-ping" style={{ top: '70%', left: '80%', animationDelay: '0.5s' }} />
    <div className="absolute w-4 h-4 bg-blue-500 rounded-full animate-ping" style={{ top: '40%', left: '90%', animationDelay: '1s' }} />
    <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-ping" style={{ top: '80%', left: '10%', animationDelay: '1.5s' }} />
  </div>
);
