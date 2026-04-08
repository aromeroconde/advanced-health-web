'use client';

import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '@/context/CartContext';

interface CartDrawerProps {
  lang: string;
  dict: {
    title: string;
    empty: string;
    total: string;
    clear: string;
    checkout: string;
    remove: string;
    subtotal: string;
    shipping: string;
    discount: string;
    shipping_progress: string;
    shipping_congrats: string;
  };
  onClose: () => void;
}

export default function CartDrawer({ lang, dict, onClose }: CartDrawerProps) {
  const {
    items,
    itemCount,
    subtotal,
    subtotalFormatted,
    shippingFormatted,
    discountFormatted,
    totalFormatted,
    isFreeShipping,
    freeShippingThreshold,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

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
        justifyContent: 'flex-end',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(2px)',
        animation: 'cartFadeIn 200ms ease',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={dict.title}
        style={{
          width: '400px',
          maxWidth: '100vw',
          height: '100%',
          background: 'var(--surface-container-lowest, #fff)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'cartSlideIn 200ms ease',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--outline-variant, #e0e0e0)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-headline, sans-serif)',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--on-surface, #1a1a1a)',
            margin: 0,
          }}>
            {dict.title} {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem',
              color: 'var(--on-surface-variant, #666)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>close</span>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '1rem',
              color: 'var(--on-surface-variant, #666)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', opacity: 0.4 }}>
                shopping_cart
              </span>
              <p style={{ fontSize: '0.9375rem', fontFamily: 'var(--font-body, sans-serif)' }}>
                {dict.empty}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--surface-container, #f9f9f9)',
                    borderRadius: 'var(--radius-lg, 12px)',
                    border: '1px solid var(--outline-variant, #e0e0e0)',
                  }}
                >
                  {/* Image */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    background: 'var(--surface-container-high, #eee)',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.product.imagenUrl || '/images/product-placeholder.svg'}
                      alt={item.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--on-surface, #1a1a1a)',
                      lineHeight: 1.3,
                      margin: 0,
                      marginBottom: '0.25rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.product.name}
                    </p>
                    <p style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#059669',
                      margin: 0,
                      marginBottom: '0.5rem',
                    }}>
                      {item.product.priceFormatted}
                    </p>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="-"
                        style={{
                          width: '1.75rem',
                          height: '1.75rem',
                          borderRadius: '50%',
                          border: '1px solid var(--outline-variant, #ccc)',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: 'var(--on-surface, #1a1a1a)',
                        }}
                      >
                        -
                      </button>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        minWidth: '1.5rem',
                        textAlign: 'center',
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="+"
                        style={{
                          width: '1.75rem',
                          height: '1.75rem',
                          borderRadius: '50%',
                          border: '1px solid var(--outline-variant, #ccc)',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: 'var(--on-surface, #1a1a1a)',
                        }}
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label={dict.remove}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#c44536',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.125rem',
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                          delete_outline
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--outline-variant, #e0e0e0)',
            background: 'var(--surface-container-lowest, #fff)',
          }}>
            {/* Free Shipping Progress */}
            {!isFreeShipping && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--on-surface-variant, #666)',
                  marginBottom: '0.5rem'
                }}>
                  <span>
                    {dict.shipping_progress.replace('{amount}', '$' + new Intl.NumberFormat('es-CO').format(freeShippingThreshold - subtotal))}
                  </span>
                </div>
                <div style={{
                  height: '6px',
                  background: 'var(--surface-container-high, #eee)',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                    background: 'var(--primary, #059669)',
                    borderRadius: '9999px',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }} />
                </div>
              </div>
            )}

            {isFreeShipping && (
              <div style={{
                background: 'rgba(5, 150, 105, 0.08)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-lg, 12px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(5, 150, 105, 0.15)'
              }}>
                <span className="material-symbols-outlined" style={{ color: '#059669', fontSize: '1.25rem' }}>
                  local_shipping
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#059669',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {dict.shipping_congrats}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {/* Subtotal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant, #666)' }}>{dict.subtotal}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{subtotalFormatted}</span>
              </div>

              {/* Shipping */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant, #666)' }}>{dict.shipping}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{shippingFormatted}</span>
              </div>

              {/* Discount */}
              {isFreeShipping && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  animation: 'fadeIn 0.3s ease-out'
                }}>
                  <span style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 600 }}>{dict.discount}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#059669' }}>-{discountFormatted}</span>
                </div>
              )}

              {/* Total Divider */}
              <div style={{ height: '1px', background: 'var(--outline-variant, #e0e0e0)', margin: '0.25rem 0' }} />

              {/* Final Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.25rem' }}>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--on-surface, #1a1a1a)',
                  fontFamily: 'var(--font-headline, sans-serif)',
                }}>
                  {dict.total}
                </span>
                <span style={{
                  fontFamily: 'var(--font-headline, sans-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--primary, #059669)',
                }}>
                  {totalFormatted}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  const header = lang === 'en'
                    ? "Hello! I'd like to place an order with the following products:\n\n"
                    : "¡Hola! Me gustaría hacer un pedido con los siguientes productos:\n\n";

                  const productList = items.map(item => {
                    return `- ${item.product.name} x${item.quantity} (${item.product.priceFormatted})`;
                  }).join('\n');

                  const summary = lang === 'en'
                    ? `\n\nSubtotal: ${subtotalFormatted}\nShipping: ${shippingFormatted}${isFreeShipping ? `\nDiscount: -${discountFormatted}` : ''}\nTotal: ${totalFormatted}`
                    : `\n\nSubtotal: ${subtotalFormatted}\nEnvío: ${shippingFormatted}${isFreeShipping ? `\nDescuento: -${discountFormatted}` : ''}\nTotal: ${totalFormatted}`;

                  const msg = `${header}${productList}${summary}`;
                  window.open(`https://wa.me/576019178558?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: 'var(--primary, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.875rem',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  boxShadow: '0 4px 12px rgba(5,150,105,0.25)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>chat</span>
                {dict.checkout}
              </button>
              <button
                onClick={clearCart}
                style={{
                  width: '100%',
                  background: 'none',
                  border: '1px solid var(--outline-variant, #ccc)',
                  borderRadius: '9999px',
                  padding: '0.625rem',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--on-surface-variant, #666)',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
              >
                {dict.clear}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cartFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cartSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes cartFadeIn {
            from { opacity: 1; }
            to { opacity: 1; }
          }
          @keyframes cartSlideIn {
            from { transform: none; }
            to { transform: none; }
          }
        }
        @media (max-width: 480px) {
          [role="dialog"][aria-label="${dict.title}"] {
            width: 100vw !important;
          }
        }
      `}</style>
    </div>
  );

  return createPortal(content, document.body);
}
