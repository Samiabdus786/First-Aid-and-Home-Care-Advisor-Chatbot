import { useEffect, useState } from 'react';

export const ParallaxBackground = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };

    const handleScroll = () => {
      setScroll(window.scrollY * 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Base gradient */}
      <div className="fixed inset-0 -z-30 bg-gradient-to-br from-blue-50 to-white opacity-90" />
      
      {/* Medical pattern background with parallax */}
      <div
        className="fixed inset-0 -z-20 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5 - scroll * 0.2}px) scale(1.1)`,
          backgroundImage: 'url(/images/medical-pattern.svg)',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          opacity: 0.7,
        }}
      />
      
      {/* Main background with stronger parallax */}
      <div
        className="fixed inset-0 -z-10 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y - scroll * 0.1}px) scale(1.1)`,
          backgroundImage: 'url(/images/medical-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
        }}
      />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-white/20 to-white/80" />
    </>
  );
};
