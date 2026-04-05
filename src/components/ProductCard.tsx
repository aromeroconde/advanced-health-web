'use client';

import { useState } from 'react';
import type { Product } from '@/types/product';
import ProductModal from '@/components/ProductModal';

const PLACEHOLDER_IMG = '/images/product-placeholder.svg';

const BADGE_STYLES: Record<string, { bg: string; color: string; icon: string }> = {
  'Más Vendido': { bg: '#0c4a6e', color: '#e0f2fe', icon: 'trending_up' },
  'Últimas Unidades': { bg: '#7f1d1d', color: '#fecaca', icon: 'timer' },
  'Promoción': { bg: '#14532d', color: '#bbf7d0', icon: 'local_offer' },
  'Nuevo': { bg: '#4c1d95', color: '#ddd6fe', icon: 'fiber_new' },
};

interface ProductCardProps {
  product: Product;
  lang: string;
  dict: {
    add_to_cart: string;
    buy: string;
    benefits: string;
    how_to_use: string;
    presentation: string;
    flavor: string;
    soon: string;
    close: string;
  };
  className?: string;
}

export default function ProductCard({ product, lang, dict, className }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const badge = product.etiqueta ? BADGE_STYLES[product.etiqueta] : null;

  return (
    <>
      <article
        className={className}
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowModal(true);
          }
        }}
        style={{
          position: 'relative',
          background: 'var(--surface-container-lowest, #fff)',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          border: '1px solid var(--outline-variant, #e5e7eb)',
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 20px 40px -12px rgba(0,0,0,0.15), 0 8px 16px -8px rgba(0,0,0,0.1)'
            : '0 1px 3px rgba(0,0,0,0.04)',
          borderColor: isHovered ? 'var(--primary, #059669)' : undefined,
        }}
      >
        {/* Image container */}
        <div style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          overflow: 'hidden',
          background: 'var(--surface-container, #f5f5f5)',
        }}>
          <img
            src={product.imagenUrl || PLACEHOLDER_IMG}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />

          {/* Gradient overlay at bottom of image */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)',
            pointerEvents: 'none',
          }} />

          {/* Badge */}
          {badge && product.etiqueta && (
            <span style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: badge.bg,
              color: badge.color,
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '0.3rem 0.75rem',
              borderRadius: '10px',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              lineHeight: 1.4,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>{badge.icon}</span>
              {product.etiqueta}
            </span>
          )}

          {/* Brand pill */}
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            color: 'var(--on-surface, #1a1a1a)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            padding: '0.3rem 0.75rem',
            borderRadius: '10px',
            letterSpacing: '0.03em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            {product.brand}
          </span>

          {/* Quick action button — appears on hover */}
          <button
            aria-label={dict.add_to_cart}
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              border: 'none',
              background: 'var(--primary, #059669)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(5,150,105,0.35)',
              transition: 'opacity 200ms, transform 200ms',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
              add_shopping_cart
            </span>
          </button>
        </div>

        {/* Body */}
        <div style={{
          padding: '1.25rem 1.25rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
          {/* Presentation tag */}
          {product.presentation && (
            <span style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              fontSize: '0.625rem',
              fontWeight: 600,
              color: 'var(--on-surface-variant, #666)',
              background: 'var(--surface-container-high, #eee)',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              marginBottom: '0.625rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontFamily: 'var(--font-label, sans-serif)',
            }}>
              {product.presentation}
            </span>
          )}

          {/* Product name */}
          <h3 style={{
            fontFamily: 'var(--font-headline, sans-serif)',
            fontWeight: 700,
            fontSize: '1.0625rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.35,
            color: 'var(--on-surface, #1a1a1a)',
            margin: 0,
            marginBottom: '0.375rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.name}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.8125rem',
            color: 'var(--on-surface-variant, #666)',
            lineHeight: 1.6,
            margin: 0,
            marginBottom: 'auto',
            paddingBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.description}
          </p>

          {/* Price + brand verification */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.875rem',
            borderTop: '1px solid var(--outline-variant, #e5e7eb)',
            marginTop: 'auto',
          }}>
            <span style={{
              fontFamily: 'var(--font-headline, sans-serif)',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#059669',
              letterSpacing: '-0.02em',
            }}>
              {product.priceFormatted}
            </span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--on-surface-variant, #888)',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '0.875rem',
                color: 'var(--primary, #059669)',
                fontVariationSettings: "'FILL' 1",
              }}>verified</span>
              {product.brand}
            </span>
          </div>
        </div>
      </article>

      {showModal && (
        <ProductModal
          product={product}
          lang={lang}
          dict={dict}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
