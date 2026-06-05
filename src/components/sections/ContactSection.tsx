'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.reveal-item');
    
    items.forEach((item: any) => {
      // Different elements get different scroll speeds based on their data-speed attribute
      const speed = item.dataset.speed || 1;
      
      gsap.fromTo(item, 
        { y: 100 * speed, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section 
      id="features"
      ref={containerRef} 
      className="relative w-full bg-[#050505] py-32 px-6 md:px-12 text-white"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="reveal-item mb-24 text-center md:text-left" data-speed="0.5">
          <h2 className="text-[10px] font-light tracking-[0.4em] text-white/50 uppercase mb-4">
            The Experience
          </h2>
          <h3 className="text-4xl md:text-6xl font-light tracking-tighter">
            CURATED ISOLATION.
          </h3>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
          
          {/* Feature 1: Culinary Alchemy */}
          <div className="reveal-item col-span-1 md:col-span-5 md:mt-24" data-speed="1.2">
            <div className="group relative overflow-hidden aspect-[4/5] mb-8">
              <div className="absolute inset-0 bg-black/20 z-10 transition-colors duration-500 group-hover:bg-transparent" />
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
                alt="Culinary Alchemy" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <h4 className="text-xl font-light tracking-wide mb-4">Culinary Alchemy</h4>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Forget menus. Our resident chef forages local Kandy spices and creates a bespoke tasting menu daily, served on your private terrace under the stars.
            </p>
          </div>

          {/* Feature 2: The Thermal Edge (Offset Image) */}
          <div className="reveal-item col-span-1 md:col-span-6 md:col-start-7" data-speed="0.8">
            <div className="group relative overflow-hidden aspect-video mb-8">
              <div className="absolute inset-0 bg-black/20 z-10 transition-colors duration-500 group-hover:bg-transparent" />
              <img 
                src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=2070&auto=format&fit=crop" 
                alt="The Thermal Edge" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <h4 className="text-xl font-light tracking-wide mb-4">The Thermal Edge</h4>
            <p className="text-sm font-light leading-relaxed text-white/60">
              A 20-meter heated infinity pool composed of black volcanic tile. It doesn't just reflect the sky; it absorbs it.
            </p>
          </div>

          {/* Feature 3: Wellness in the Mist */}
          <div className="reveal-item col-span-1 md:col-span-8 md:col-start-3 md:mt-12" data-speed="1.5">
            <div className="group relative overflow-hidden aspect-[21/9] mb-8">
              <div className="absolute inset-0 bg-black/20 z-10 transition-colors duration-500 group-hover:bg-transparent" />
              <img 
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" 
                alt="Wellness in the Mist" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="max-w-xl mx-auto text-center">
              <h4 className="text-xl font-light tracking-wide mb-4">Wellness in the Mist</h4>
              <p className="text-sm font-light leading-relaxed text-white/60">
                In-villa Ayurvedic therapies tailored to your body's frequency, using oils pressed from the surrounding Hanthana hills.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}