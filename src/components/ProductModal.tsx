'use client';

import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';

const PLACEHOLDER_IMG = '/images/product-placeholder.svg';

interface ProductModalProps {
  product: Product;
  lang: string;
  dict: {
    buy: string;
    add_to_cart: string;
    benefits: string;
    how_to_use: string;
    presentation: string;
    flavor: string;
    soon: string;
    close: string;
  };
  onClose: () => void;
}

export default function ProductModal({ product, lang, dict, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isGudd = product.brand === 'gudd';

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus the close button
    const timer = setTimeout(() => {
      contentRef.current?.querySelector<HTMLElement>('button')?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      clearTimeout(timer);
      previousFocusRef.current?.focus();
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleAction = () => {
    if (isGudd) {
      addToCart(product);
      onClose();
    } else if (product.urlCompra) {
      window.open(product.urlCompra, '_blank', 'noopener,noreferrer');
    }
  };

  const actionLabel = isGudd
    ? dict.add_to_cart
    : product.urlCompra
      ? dict.buy
      : dict.soon;

  const isActionDisabled = !isGudd && !product.urlCompra;

  const content = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 200ms ease',
      }}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        style={{
          background: 'var(--surface-container-lowest, #fff)',
          borderRadius: 'var(--radius-lg, 16px)',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'slideUp 200ms ease',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--surface-container, #f5f5f5)', overflow: 'hidden', borderRadius: 'var(--radius-lg, 16px) var(--radius-lg, 16px) 0 0' }}>
          <img
            src={product.imagenUrl || PLACEHOLDER_IMG}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <span style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            color: 'var(--primary, #059669)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            letterSpacing: '0.04em',
          }}>
            {product.brand}
          </span>
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label={dict.close}
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              borderRadius: '50%',
              width: '2.25rem',
              height: '2.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'background 150ms',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>close</span>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          {product.presentation && (
            <span style={{
              display: 'inline-block',
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--outline, #666)',
              background: 'var(--surface-container, #f5f5f5)',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {product.presentation}
            </span>
          )}

          <h2 style={{
            fontFamily: 'var(--font-headline, sans-serif)',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            color: 'var(--on-surface, #1a1a1a)',
            marginBottom: '0.5rem',
          }}>
            {product.name}
          </h2>

          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--on-surface-variant, #666)',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
          }}>
            {product.description}
          </p>

          {product.flavor && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--outline, #888)', fontFamily: 'var(--font-label, sans-serif)' }}>
                {dict.flavor}
              </span>
              <p style={{ fontSize: '0.875rem', color: 'var(--on-surface, #1a1a1a)', marginTop: '0.25rem' }}>
                {product.flavor}
              </p>
            </div>
          )}

          {product.benefits && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--outline, #888)', fontFamily: 'var(--font-label, sans-serif)' }}>
                {dict.benefits}
              </span>
              <p style={{ fontSize: '0.875rem', color: 'var(--on-surface, #1a1a1a)', lineHeight: 1.7, marginTop: '0.25rem' }}>
                {product.benefits}
              </p>
            </div>
          )}

          {product.modoUso && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--outline, #888)', fontFamily: 'var(--font-label, sans-serif)' }}>
                {dict.how_to_use}
              </span>
              <p style={{ fontSize: '0.875rem', color: 'var(--on-surface, #1a1a1a)', lineHeight: 1.7, marginTop: '0.25rem' }}>
                {product.modoUso}
              </p>
            </div>
          )}

          {/* Price + Action */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--outline-variant, #e0e0e0)',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'var(--font-headline, sans-serif)',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#059669',
            }}>
              {product.priceFormatted}
            </span>

            <button
              onClick={handleAction}
              disabled={isActionDisabled}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: isActionDisabled ? '#ccc' : 'var(--primary, #059669)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.875rem 1.75rem',
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: isActionDisabled ? 'not-allowed' : 'pointer',
                transition: 'all 200ms',
                boxShadow: isActionDisabled ? 'none' : '0 4px 12px rgba(5,150,105,0.25)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                {isGudd ? 'add_shopping_cart' : 'open_in_new'}
              </span>
              {actionLabel}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeIn {
            from { opacity: 1; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 1; transform: none; }
            to { opacity: 1; transform: none; }
          }
        }
      `}</style>
    </div>
  );

  return createPortal(content, document.body);
}
