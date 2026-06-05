'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the ScrollToPlugin so GSAP knows how to scroll the window
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- THE FIX: Custom Smooth Scroll Handler ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault(); // Stop the browser from instantly jumping
    
    gsap.to(window, {
      duration: 1.5, // 1.5 seconds for a luxurious, slow sweep down the page
      scrollTo: { y: target, offsetY: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 flex items-center justify-between text-white ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'
      }`}
    >
      {/* --- LOGO --- */}
      <div 
        onClick={() => gsap.to(window, { duration: 1.5, scrollTo: 0, ease: 'power3.inOut' })}
        className="text-lg md:text-xl font-bold tracking-[0.4em] uppercase cursor-pointer z-50"
      >
        The Obsidian
      </div>

      {/* --- DESKTOP NAVIGATION --- */}
      <nav className="hidden md:flex gap-10 text-[11px] font-light tracking-[0.3em]">
        <a 
          href="#about" 
          onClick={(e) => handleNavClick(e, '#about')}
          className="relative overflow-hidden group"
        >
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">CONCEPT</span>
          <span className="absolute inset-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-gray-400">CONCEPT</span>
        </a>
        <a 
          href="#features" 
          onClick={(e) => handleNavClick(e, '#features')}
          className="relative overflow-hidden group"
        >
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">SPACES</span>
          <span className="absolute inset-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-gray-400">SPACES</span>
        </a>
      </nav>

      {/* --- ACTIONS (Reserve & Menu) --- */}
      <div className="flex items-center gap-8 z-50">
        <a 
          href="https://booking.com" 
          target="_blank" 
          rel="noreferrer"
          className="group relative hidden md:inline-flex items-center justify-center px-2 py-2 transition-all duration-500"
        >
          <span className="text-[14px] font-light tracking-[0.2em] text-white/70 transition-all duration-700 ease-out group-hover:text-white group-hover:tracking-[0.3em]">
            RESERVE
          </span>
          <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-700 ease-out group-hover:scale-x-100" />
        </a>
        
        {/* Minimalist 2-Line Hamburger Menu */}
        <button className="flex flex-col gap-2 p-2 group">
          <div className="w-8 h-[1px] bg-white transition-transform duration-300 group-hover:translate-y-[2px]"></div>
          <div className="w-8 h-[1px] bg-white transition-transform duration-300 group-hover:-translate-y-[2px]"></div>
        </button>
      </div>
    </header>
  );
}