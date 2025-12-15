  {/* Preconnect para Bunny CDN */}
  <link rel="preconnect" href="https://cursala.b-cdn.net" crossOrigin="anonymous" />
import "@/css/style.css";
import type { Metadata } from "next";
import RootLayoutClient from "@/components/RootLayoutClient";

// Función para generar CSP condicional
const getCSP = () => {
  const baseCSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://static.cloudflareinsights.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self'";
  
  if (process.env.NODE_ENV === 'development') {
    return `${baseCSP} http://localhost:8080 https://cursala.com.ar https://cursala.b-cdn.net https://vz-19135c35-e7f.b-cdn.net https://www.googletagmanager.com https://analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com; frame-src 'self';`;
  }
  
  return `${baseCSP} https://cursala.com.ar https://cursala.b-cdn.net https://vz-19135c35-e7f.b-cdn.net https://www.googletagmanager.com https://analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com; frame-src 'self';`;
};

// Metadata global por defecto
export const metadata: Metadata = {
  metadataBase: new URL('https://cursala.com'),
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
    url: 'https://cursala.com',
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
    canonical: 'https://cursala.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth">  
      <head>
        <meta charSet="utf-8" />
        {/* Content Security Policy básica */}
        <meta httpEquiv="Content-Security-Policy" content={getCSP()} />

        {/* Preconnect para Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fuente Titillium Web de Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap" rel="stylesheet" />
        {/*
          Si en el futuro se requiere Google Analytics:
          1. Crear una propiedad en https://analytics.google.com/
          2. Reemplazar este comentario por el snippet de GA4 con el ID correspondiente (G-XXXXXXXXXX)
        */}

        {/* Cloudflare Web Analytics */}
        <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "757eee8aa1ac4e3890e4ed4d28dcbd16"}'></script>
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
