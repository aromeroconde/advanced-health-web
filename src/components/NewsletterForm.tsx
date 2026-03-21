'use client';

export default function NewsletterForm() {
  return (
    <form
      style={{
        display: 'flex',
        gap: '1rem',
        maxWidth: '40rem',
        margin: '0 auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Tu correo electrónico"
        required
        style={{
          flexGrow: 1,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          outline: 'none',
          minWidth: '200px',
        }}
      />
      <button type="submit" className="btn btn-solid-white">
        SUSCRIBIRME
      </button>
    </form>
  );
}
