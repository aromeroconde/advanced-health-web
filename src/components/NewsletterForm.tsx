'use client';

interface NewsletterFormProps {
  buttonText: string;
}

export default function NewsletterForm({ buttonText }: NewsletterFormProps) {
  const whatsappUrl = `https://wa.me/576019178558?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20el%2015%25%20de%20descuento%20y%20consejos%20cl%C3%ADnicos`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: '40rem',
        margin: '0 auto',
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-solid-white"
        style={{
          padding: '1.25rem 3rem',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
          textDecoration: 'none',
        }}
      >
        <span className="material-symbols-outlined">chat</span>
        {buttonText}
      </a>
    </div>
  );
}
