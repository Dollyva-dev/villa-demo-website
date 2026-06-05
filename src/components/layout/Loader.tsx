'use client';

import React from 'react';

export default function Loader({
  loaderRef,
  counterRef,
  awakenRef,
}: {
  loaderRef: React.RefObject<HTMLDivElement>;
  counterRef: React.RefObject<HTMLSpanElement>;
  awakenRef: React.RefObject<HTMLSpanElement>;
}) {
  return (
    <div ref={loaderRef} className="absolute inset-0 z-[9999] pointer-events-auto flex items-center justify-center bg-[#050505]">
      <div className="text-4xl font-light tracking-[0.3em]">
        <span ref={counterRef}>00</span>
        <span
          ref={awakenRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          AWAKEN
        </span>
      </div>
    </div>
  );
}
