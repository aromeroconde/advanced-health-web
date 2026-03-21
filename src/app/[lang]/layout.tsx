import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/lib/dictionaries';

export const metadata: Metadata = {
  title: {
    default: 'Advanced Health | Clinical Excellence & Editorial Vitality',
    template: '%s | Advanced Health',
  },
  description: 'Nutrición avanzada diseñada para el rendimiento humano. Ciencia pura, resultados probados. Suplementos clínicos premium.',
  keywords: ['suplementos clínicos', 'salud', 'colágeno', 'vitaminas', 'bienestar', 'premium'],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://www.advancedhealth.com.co',
    siteName: 'Advanced Health',
    title: 'Advanced Health | Clinical Excellence & Editorial Vitality',
    description: 'Nutrición avanzada diseñada para el rendimiento humano. Ciencia pura, resultados probados.',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang as 'es' | 'en');

  return (
    <html lang={params.lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar lang={params.lang} dict={dict.navbar} />
        <main id="main-content">{children}</main>
        <Footer lang={params.lang} dict={dict.navbar} />
      </body>
    </html>
  );
}
