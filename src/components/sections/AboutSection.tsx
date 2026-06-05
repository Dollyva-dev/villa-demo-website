'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the plugin before using it
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const ghostTextRef = useRef<HTMLDivElement>(null);
  
  // Refs for the extended content
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Refs for the counters
  const suitesRef = useRef<HTMLSpanElement>(null);
  const viewsRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // 1. Parallax Ghost Text
    gsap.to(ghostTextRef.current, {
      xPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom', 
        end: 'bottom top',   
        scrub: 1,            
      },
    });

    // 2. Main Text Reveal
    gsap.fromTo('.stagger-text', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stagger-text',
          start: 'top 80%', 
        },
      }
    );

    // 3. Stat Counters
    const counters = [
      { ref: suitesRef, target: 4 },
      { ref: viewsRef, target: 180 },
    ];

    counters.forEach(({ ref, target }) => {
      gsap.fromTo(
        ref.current,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          },
        }
      );
    });

    // 4. Massive Image Parallax
    gsap.fromTo(imageRef.current, 
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // 5. The Pillars Stagger Reveal
    gsap.fromTo('.pillar-item',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pillar-item',
          start: 'top 85%',
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section 
      id="about"
      ref={containerRef} 
      className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#050505] py-32 text-white"
    >
      {/* --- GHOST BACKGROUND TEXT --- */}
      <div 
        ref={ghostTextRef}
        className="pointer-events-none absolute top-48 left-0 whitespace-nowrap text-[15vw] font-bold leading-none tracking-tighter text-white/[0.02] mix-blend-overlay"
      >
        RAW . MINIMAL . UNTAMED . RAW . MINIMAL
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 w-full">
        
        {/* --- ROW 1: THE ORIGINAL CONCEPT & STATS --- */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center max-w-2xl">
            <h2 className="stagger-text mb-8 text-[10px] font-light tracking-[0.4em] text-white/50 uppercase">
              The Concept
            </h2>
            <h3 className="stagger-text group mb-8 text-3xl md:text-5xl font-light leading-tight tracking-tight cursor-default">
              We didn't build on the mountain. <br className="hidden md:block"/>
              <span className="italic text-white/70 transition-colors duration-500 group-hover:text-white">We built with it.</span>
            </h3>
            <p className="stagger-text text-sm md:text-base font-light leading-relaxed text-white/60">
              The Obsidian is a masterclass in brutalist minimalism meeting the untamed Sri Lankan jungle. 
              Hovering 800 meters above sea level, every angle is designed to frame the mist, the canopy, 
              and the silence. No clutter. No distractions. Just pure, unadulterated elevation.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-12 border-l border-white/10 pl-8 md:pl-16">
            <div className="group flex flex-col gap-2 cursor-default">
              <div className="text-5xl md:text-7xl font-light tracking-tighter transition-transform duration-500 group-hover:translate-x-2">
                0<span ref={suitesRef}>0</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase transition-colors duration-500 group-hover:text-white/80">
                Exclusive Suites
              </div>
            </div>
            <div className="group flex flex-col gap-2 cursor-default">
              <div className="text-5xl md:text-7xl font-light tracking-tighter transition-transform duration-500 group-hover:translate-x-2">
                <span ref={viewsRef}>0</span>°
              </div>
              <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase transition-colors duration-500 group-hover:text-white/80">
                Panoramic Canopy Views
              </div>
            </div>
            <div className="group flex flex-col gap-2 cursor-default">
              <div className="text-5xl md:text-7xl font-light tracking-tighter transition-transform duration-500 group-hover:translate-x-2">
                ∞
              </div>
              <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase transition-colors duration-500 group-hover:text-white/80">
                Infinity Edge Pool
              </div>
            </div>
          </div>
        </div>

        {/* --- ROW 2: INTERACTIVE PARALLAX IMAGE --- */}
        <div 
          ref={imageWrapperRef} 
          className="group relative mt-32 h-[50vh] md:h-[70vh] w-full overflow-hidden bg-white/5 cursor-crosshair"
        >
          {/* Dark overlay that vanishes on hover */}
          <div className="absolute inset-0 z-10 bg-black/50 mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-0" />
          
          <img 
            ref={imageRef}
            src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop" 
            alt="Misty Hanthana Mountains" 
            // Image starts in Grayscale and transitions to full color on hover
            className="absolute -top-[20%] left-0 h-[140%] w-full object-cover grayscale-[80%] transition-all duration-1000 group-hover:grayscale-0"
          />

          {/* Frosted Glass Badge that appears on hover */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
            <span className="border border-white/20 bg-black/20 backdrop-blur-md px-10 py-4 text-[10px] tracking-[0.4em] uppercase text-white shadow-2xl">
              Immerse Yourself
            </span>
          </div>
        </div>

        {/* --- ROW 3: MAGNETIC ETHOS PILLARS --- */}
        <div className="mt-32 grid grid-cols-1 gap-4 border-t border-white/10 pt-16 md:grid-cols-3">
          
          {/* Pillar 1 */}
          <div className="pillar-item group relative flex cursor-default flex-col gap-6 border-l border-transparent p-8 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.03]">
            <div className="text-[10px] tracking-[0.3em] text-white/40 transition-colors duration-500 group-hover:text-white">01 // ARCHITECTURE</div>
            <h4 className="text-2xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-2">Concrete & Glass.</h4>
            <p className="text-sm font-light leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/80">
              Locally sourced brutalist materials form a stark, beautiful contrast against the wild, untamed greens of the surrounding tea estates.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="pillar-item group relative flex cursor-default flex-col gap-6 border-l border-transparent p-8 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.03]">
            <div className="text-[10px] tracking-[0.3em] text-white/40 transition-colors duration-500 group-hover:text-white">02 // HARMONY</div>
            <h4 className="text-2xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-2">Untouched Earth.</h4>
            <p className="text-sm font-light leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/80">
              The foundations were meticulously poured around ancient roots. We adapted the structure to the mountain, leaving the ecosystem completely undisturbed.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="pillar-item group relative flex cursor-default flex-col gap-6 border-l border-transparent p-8 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.03]">
            <div className="text-[10px] tracking-[0.3em] text-white/40 transition-colors duration-500 group-hover:text-white">03 // SECLUSION</div>
            <h4 className="text-2xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-2">Absolute Silence.</h4>
            <p className="text-sm font-light leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/80">
              Accessible only by a private, winding two-kilometer road, guaranteeing an atmosphere of absolute peace, far removed from the noise of the valley below.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}