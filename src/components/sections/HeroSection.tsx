 'use client';

import { useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Loader from '@/components/layout/Loader';

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const awakenRef = useRef<HTMLSpanElement>(null);

  // New references for the slideshow images
  const slideshowContainerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Collect the images into an array for easy iteration
    const slides = [img1Ref.current, img2Ref.current, img3Ref.current];

    // Standardize all images to start invisible, slightly scaled up, and centered
    gsap.set(slides, {
      opacity: 0,
      scale: 1.10, // Must be > 1.0 to allow movement without hitting edges
      transformOrigin: 'center center',
    });

    const tl = gsap.timeline();

    // ==========================================
    // 1. Initial Loader Sequence (Keep existing)
    // ==========================================
    tl.to(counterRef.current, {
      innerHTML: 99,
      duration: 2,
      snap: { innerHTML: 1 },
      ease: 'power2.inOut',
    })
      .to(counterRef.current, { autoAlpha: 0, duration: 0.2 })
      .to(awakenRef.current, { autoAlpha: 1, duration: 0.5 })
      .to(awakenRef.current, { autoAlpha: 0, duration: 0.5, delay: 0.5 })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          try {
            if (loaderRef.current && loaderRef.current.parentNode) {
              loaderRef.current.remove();
            }
          } catch (e) {
            // ignore
          }
        }
      })

      // ==========================================
      // 2. Reveal Image 1 & Start Looping Movement
      // ==========================================
      .to(img1Ref.current, {
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
      }, '-=0.8')

      // ==========================================
      // 3. Content Reveal (Keep existing)
      // ==========================================
      .fromTo('.hero-element',
        {
          y: 60,
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.15,
          ease: 'power3.out'
        },
        '-=1.2' // Start slightly sooner than before to match the image reveal
      )

      // ==========================================
      // 4. Start the Repeating Slideshow
      // ==========================================
      .add(() => {
        // Create the perpetual looping timeline for crossfades
        const slideshowTl = gsap.timeline({ repeat: -1 });

        const fadeDuration = 1.8; // Smooth, slow crossfade
        const visibilityDuration = 6.0; // How long each image stays fully visible

        // Define distinct, BARELY noticeable movements for each slide.
        // These run concurrently and infinitely for each image when active.
        
        // Slide 1: Slow subtle zoom-in
        gsap.to(img1Ref.current, {
          scale: 1.15, // barely moving from 1.10
          duration: visibilityDuration + fadeDuration * 2, // covers visible + next fade
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Slide 2: Slow subtle zoom-out
        gsap.to(img2Ref.current, {
          scale: 1.05, // barely moving down from 1.10
          duration: visibilityDuration + fadeDuration * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Slide 3: Slight pan right/down
        gsap.to(img3Ref.current, {
          xPercent: 1.5, // 1.5% pan
          yPercent: 1.5,
          duration: visibilityDuration + fadeDuration * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Loop the slides
        slides.forEach((slide, i) => {
          const nextSlide = slides[(i + 1) % slides.length];

          // Crossfade: Raise opacity of NEXT slide, simultaneously lowering CURRENT
          slideshowTl.to(nextSlide, {
            opacity: 1,
            duration: fadeDuration,
            ease: 'sine.inOut',
          }, `+=${visibilityDuration}`); // Delayed start for each fade

          // (The stacking z-index handles which image is fully visible)
        });
      });

  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* Loader extracted to its own component */}
      <Loader 
        loaderRef={loaderRef as RefObject<HTMLDivElement>}
        counterRef={counterRef as RefObject<HTMLSpanElement>}
        awakenRef={awakenRef as RefObject<HTMLSpanElement>}
      />

      {/* --- NEW SLIDESHOW CONTAINER --- */}
      <div ref={slideshowContainerRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Slightly darker overlay */}

        {/* --- IMAGE 1 (Exterior Architectural) --- */}
        <img
          ref={img1Ref}
          // Swap these URLs with '/villa_01.jpg'
          src="/villa_01.png"
          alt="Obsidian Villa Kandy Exterior at Dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* --- IMAGE 2 (Infinity Pool/View) --- */}
        <img
          ref={img2Ref}
          // Swap these URLs with '/villa_02.jpg'
          src="/villa_02.png"
          alt="Obsidian Villa Infinity Edge over Misty Valley"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* --- IMAGE 3 (Interior/Bedroom) --- */}
        <img
          ref={img3Ref}
          // Swap these URLs with '/villa_03.jpg'
          src="/villa_03.png"
          alt="Obsidian Villa Canopy Bedroom View"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* --- MAIN CONTENT (Unchanged) --- */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center mt-10">

        <h1 className="hero-element mb-6 text-5xl md:text-8xl font-bold tracking-tighter leading-none">
          BREATHE.<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>
            YOU ARE ABOVE
          </span><br />
          THE CLOUDS.
        </h1>

        <p className="hero-element mb-12 max-w-2xl text-xs md:text-sm font-light tracking-[0.4em] text-gray-300">
          AN ARCHITECTURAL SANCTUARY IN THE HILLS OF KANDY, SRI LANKA.
        </p>

        {/* --- ELEGANT CTA BUTTON --- */}
        <a
          href="https://booking.com"
          target="_blank"
          rel="noreferrer"
          className="hero-element group relative flex items-center justify-center gap-4 border border-white/20 bg-transparent px-10 py-4 text-white backdrop-blur-sm transition-all duration-700 ease-out hover:border-white/60 hover:bg-white/5"
        >
          <span className="text-[11px] font-light tracking-[0.2em] transition-all duration-700 ease-out group-hover:tracking-[0.3em]">
            ESCAPE TO THE OBSIDIAN
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
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div className="hero-element absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
        <span className="text-[10px] tracking-[0.3em] text-gray-400">DESCEND INTO LUXURY</span>
        <div className="h-16 w-[1px] bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>

    </section>
  );
}