'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  // Ref for the Spotlight effect
  const obsidianRef = useRef<HTMLDivElement>(null);
  
  // Ref for the Floating Shift effect
  const secureRef = useRef<HTMLDivElement>(null);
  
  const [time, setTime] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Live Clock synced to Kandy, Sri Lanka
  useEffect(() => {
    const timer = setInterval(() => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(formatter.format(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current) return;
    const { clientX, clientY } = e;
    
    // 1. Math for the Floating Shift (SECURE text + Glow)
    const { width, height, left: fLeft, top: fTop } = footerRef.current.getBoundingClientRect();
    const xShift = (clientX - fLeft) / width - 0.5;
    const yShift = (clientY - fTop) / height - 0.5;
    setMousePosition({ x: xShift, y: yShift });

    // 2. Math strictly for the Spotlight (THE OBSIDIAN text)
    if (obsidianRef.current) {
      const { left: tLeft, top: tTop } = obsidianRef.current.getBoundingClientRect();
      const xSpot = clientX - tLeft;
      const ySpot = clientY - tTop;
      
      obsidianRef.current.style.setProperty('--cursor-x', `${xSpot}px`);
      obsidianRef.current.style.setProperty('--cursor-y', `${ySpot}px`);
    }
  };

  useGSAP(() => {
    // Reveal top and bottom elements
    gsap.fromTo('.footer-reveal', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: footerRef });

  useGSAP(() => {
    // Smoothly shift the massive SECURE text based on mouse position
    gsap.to(secureRef.current, {
      x: mousePosition.x * 30, // Max 30px movement
      y: mousePosition.y * 30,
      ease: 'power3.out',
      duration: 1,
    });
  }, [mousePosition]);

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black p-6 md:p-12 text-white"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-black to-transparent" />

      

      {/* --- CENTER AREA: BOTH TEXTS STACKED --- */}
      <div className="pointer-events-none my-12 flex w-full flex-1 flex-col items-center justify-center gap-16">
        
        

        {/* 2. SECURE YOUR SANCTUARY (Massive Shifting Text) */}
        <div 
          ref={secureRef}
          className="pointer-events-auto relative z-10 flex flex-col items-center justify-center text-center w-full"
        >
          <h2 className="text-[12vw] font-bold leading-[0.85] tracking-tighter mix-blend-difference">
            SECURE<br />
            <span className="italic font-light opacity-80 text-[11vw]">YOUR</span><br />
            SANCTUARY.
          </h2>
          
          <p className="mt-12 text-sm md:text-lg font-light tracking-[0.3em] text-white/60 uppercase">
            The mountain is waiting. Will you answer?
          </p>
        </div>
        {/* 1. THE OBSIDIAN (Spotlight Interactive Text) */}
        <div 
          ref={obsidianRef}
          className="group relative flex pointer-events-auto items-center justify-center"
        >
          {/* Layer 1: Hollow Outline Text */}
          <h2 
            className="text-[14vw] font-bold leading-none tracking-tighter text-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
          >
            THE OBSIDIAN
          </h2>

          {/* Layer 2: Masked "Spotlight" Text */}
          <h2 
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-[14vw] font-bold leading-none tracking-tighter text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitMaskImage: 'radial-gradient(circle 250px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 0%, transparent 100%)',
              maskImage: 'radial-gradient(circle 250px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 0%, transparent 100%)',
            }}
          >
            THE OBSIDIAN
          </h2>
        </div>

      </div>
      {/* --- TOP ROW: LOCATION & LIVE TIME --- */}
      <div className="footer-reveal relative z-20 flex w-full justify-between border-b border-white/10 pb-6 pt-12">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Location</span>
          <span className="text-xs font-light tracking-[0.2em] md:text-sm">KANDY, SRI LANKA</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Local Time</span>
          <span className="inline-block w-[120px] text-xs font-light tracking-[0.2em] md:text-sm">
            {time || '00:00:00 AM'}
          </span>
        </div>
      </div>

      {/* --- BOTTOM ROW: LINKS & CTA --- */}
      <div className="footer-reveal relative z-20 flex w-full flex-col items-center justify-between gap-12 border-t border-white/10 pt-12 md:flex-row md:gap-0">
        
        <div className="flex gap-8 text-[10px] uppercase font-light tracking-[0.3em] text-white/50">
          <a href="#" className="transition-colors duration-300 hover:text-white">Instagram</a>
          <a href="#" className="transition-colors duration-300 hover:text-white">Location</a>
          <a href="#" className="transition-colors duration-300 hover:text-white">Terms</a>
        </div>

        <a
          href="https://booking.com"
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center justify-center gap-4 border border-white/20 bg-transparent px-10 py-4 text-white backdrop-blur-sm transition-all duration-700 ease-out hover:border-white/60 hover:bg-white/5"
        >
          <span className="text-[10px] font-light tracking-[0.2em] transition-all duration-700 ease-out group-hover:tracking-[0.3em]">
            BOOK YOUR STAY
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-50 transition-all duration-700 ease-out group-hover:translate-x-2 group-hover:opacity-100"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <div className="text-[10px] uppercase font-light tracking-[0.3em] text-white/30">
          © 2026 THE OBSIDIAN KANDY
        </div>
      </div>

      {/* --- SUBTLE BACKGROUND GLOW EFFECT (Tracks global mouse) --- */}
      <div 
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-5 blur-[100px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x * 100}px), calc(-50% + ${mousePosition.y * 100}px))`
        }}
      />
    </footer>
  );
}