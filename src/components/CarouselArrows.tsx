'use client';

import { useRef, useCallback } from 'react';

export default function CarouselArrows({ children, lang }: { children: React.ReactNode; lang: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isEn = lang === 'en';

  const scroll = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.featured-carousel-item');
    if (!card) return;
    const cardWidth = (card as HTMLElement).offsetWidth + 32; // card width + gap (2rem)
    track.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="carousel-wrapper">
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={() => scroll('left')}
        aria-label={isEn ? 'Previous products' : 'Productos anteriores'}
        type="button"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <div className="featured-carousel-track" ref={trackRef}>
        {children}
      </div>
      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={() => scroll('right')}
        aria-label={isEn ? 'Next products' : 'Productos siguientes'}
        type="button"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      <style>{`
        .carousel-wrapper {
          position: relative;
        }
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          border: 1px solid var(--outline-variant);
          background: var(--surface-container-lowest);
          color: var(--on-surface-variant);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: all 200ms;
        }
        .carousel-arrow:hover {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
        }
        .carousel-arrow:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
        .carousel-arrow .material-symbols-outlined {
          font-size: 1.5rem;
        }
        .carousel-arrow-left {
          left: -1.375rem;
        }
        .carousel-arrow-right {
          right: -1.375rem;
        }
        @media (max-width: 768px) {
          .carousel-arrow {
            width: 2.25rem;
            height: 2.25rem;
          }
          .carousel-arrow .material-symbols-outlined {
            font-size: 1.25rem;
          }
          .carousel-arrow-left {
            left: -0.5rem;
          }
          .carousel-arrow-right {
            right: -0.5rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .carousel-arrow {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
