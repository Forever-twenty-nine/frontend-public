  {/* Preconnect para Bunny CDN */}
  <link rel="preconnect" href="https://cursala.b-cdn.net" crossOrigin="anonymous" />
import "@/css/style.css";
import type { Metadata } from "next";
import RootLayoutClient from "@/components/RootLayoutClient";
import { Titillium_Web } from 'next/font/google';

// Optimización de fuentes: Usar next/font/google para eliminar CLS y mejorar performance
const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--font-titillium',
});

// Función para generar CSP condicional
const getCSP = () => {
  const baseCSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://static.cloudflareinsights.com https://connect.facebook.net; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https: blob:; connect-src 'self' https://cloudflareinsights.com https://cloudflareinsights.com/cdn-cgi/rum";

  // Permitir hosts adicionales para `connect-src` configurados vía variable de entorno
  // Ejemplo: NEXT_PUBLIC_CSP_CONNECT_SRC="http://localhost:8080 https://api.example.com"
  const extraConnect = process.env.NEXT_PUBLIC_CSP_CONNECT_SRC ? ` ${process.env.NEXT_PUBLIC_CSP_CONNECT_SRC}` : '';

  return `${baseCSP}${extraConnect}; frame-src 'self';`;
};

// Metadata global por defecto
export const metadata: Metadata = {
  metadataBase: new URL('https://cursala.com.ar'),
  title: {
    default: 'Cursala - Plataforma de Cursos Online',
    template: '%s | Cursala'
  },
  description: 'Cursala - Plataforma de cursos online. Aprende nuevas habilidades con nuestros cursos especializados.',
  keywords: ['cursos online', 'educación', 'capacitación', 'e-learning', 'formación profesional', 'cursos especializados'],
  authors: [{ name: 'Cursala' }],
  creator: 'Cursala',
  publisher: 'Cursala',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://cursala.com.ar',
    siteName: 'Cursala',
    title: 'Cursala - Plataforma de Cursos Online',
    description: 'Aprende nuevas habilidades con nuestros cursos especializados',
    images: [
      {
        url: '/logo-cursala.png',
        width: 1200,
        height: 630,
        alt: 'Cursala - Plataforma de Cursos Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursala - Plataforma de Cursos Online',
    description: 'Aprende nuevas habilidades con nuestros cursos especializados',
    images: ['/logo-cursala.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo-cursala.png',
  },
  alternates: {
    canonical: 'https://cursala.com.ar',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
    <html lang="es" className={`scroll-smooth ${titillium.variable}`} data-scroll-behavior="smooth">  
      <head>
        <meta charSet="utf-8" />
        {/* Content Security Policy básica */}
        <meta httpEquiv="Content-Security-Policy" content={getCSP()} />

        {/* Preconnect para Bunny CDN */}
        <link rel="preconnect" href="https://cursala.b-cdn.net" crossOrigin="anonymous" />

        {/* Cloudflare Web Analytics */}
        {process.env.NODE_ENV !== 'development' && (
          <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "757eee8aa1ac4e3890e4ed4d28dcbd16"}'></script>
        )}
        {/* End Cloudflare Web Analytics */}

      </head>
      <body suppressHydrationWarning={true} className="front">
        <RootLayoutClient> 
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
