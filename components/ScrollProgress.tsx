'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      bar.style.height = `${p * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 2, background: '#0a0a0a', zIndex: 9990, pointerEvents: 'none' }}>
      <div ref={barRef} style={{ width: '100%', height: '0%', background: '#E8622A', transition: 'height .06s linear' }} />
    </div>
  );
}
