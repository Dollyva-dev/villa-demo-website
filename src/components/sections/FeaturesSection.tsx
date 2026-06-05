'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const rooms = [
  {
    id: 1,
    title: 'THE MONOLITH SUITE',
    capacity: '02',
    description: '1,200 sq ft of polished concrete and glass. Suspended over the valley edge with a private plunge pool and floating fire pit.',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'THE CANOPY LOFT',
    capacity: '02',
    description: 'Wake up at eye-level with the Eagles. A two-story glass atrium featuring a freestanding black-stone bathtub and open-air rain shower.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'THE OBSIDIAN RESIDENCE',
    capacity: '04',
    description: 'The ultimate private enclave. Two bedrooms, a private chef\'s kitchen, and a wraparound infinity deck facing the Temple of the Tooth in the distance.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop'
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const getScrollDistance = () => {
      const slider = sliderRef.current;

      if (!slider) {
        return 0;
      }

      return Math.max(0, slider.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(sliderRef.current, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${getScrollDistance()}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinSpacing: true,
      }
    });

    return () => {
      tween.kill();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      
      {/* Absolute Header for the section */}
      <div className="absolute top-10 left-6 z-20 md:top-24 md:left-12">
        <h2 className="text-[10px] font-light uppercase tracking-[0.4em] text-white/50">
          Your Private Apex
        </h2>
      </div>

      {/* The scrolling container - Set exactly to 300vw */}
      <div 
        ref={sliderRef}
        className="flex h-full w-[300vw] flex-nowrap" 
      >
        {rooms.map((room) => (
          <div 
            key={room.id} 
            className="room-card relative flex h-full w-screen shrink-0 items-center justify-center p-6 md:p-24"
          >
            <div className="group relative flex h-[70vh] w-full max-w-6xl flex-col items-center gap-4 overflow-hidden md:h-[80vh] md:flex-row md:gap-8">
              
              {/* Image Container with Hover Zoom */}
              <div className="relative h-1/2 w-full overflow-hidden transition-transform duration-500 group-hover:translate-y-[-2px] md:h-full md:w-2/3">
                <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                
                {/* Capacity Tag overlay */}
                <div className="absolute bottom-6 left-6 z-20 border border-white/20 bg-black/60 px-4 py-2 backdrop-blur-md">
                  <span className="text-[10px] tracking-[0.2em]">CAPACITY: {room.capacity}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex h-1/2 w-full flex-col justify-center md:h-full md:w-1/3">
                <h3 className="mb-4 text-3xl font-light tracking-tight transition-colors duration-300 md:text-5xl md:group-hover:text-white/90">
                  {room.title}
                </h3>
                
                <div className="mb-4 h-[1px] w-full origin-left bg-white/20 transition-colors duration-300 group-hover:bg-white/40" />
                
                <p className="text-sm font-light leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
                  {room.description}
                </p>

                {/* Explore Button */}
                <button className="mt-6 self-start border-b border-white pb-1 text-[10px] tracking-[0.2em] transition-all duration-300 hover:border-white/50 hover:text-white/50">
                  EXPLORE SPACE
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll Progress Indicator lines at the bottom */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-4">
        {rooms.map((_, i) => (
          <div key={i} className="h-[1px] w-12 bg-white/20"></div>
        ))}
      </div>
    </section>
  );
}