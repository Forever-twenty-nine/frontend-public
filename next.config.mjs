/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,

  // Configuración de Turbopack (requerida para Next.js 16)
  turbopack: {},

  // Optimizaciones para producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimización para reducir legacy JavaScript
  experimental: {
    optimizePackageImports: ['jsvectormap', 'flatpickr'],
  },

  // Configuración de imágenes
  images: {
    qualities: [75, 90],
    localPatterns: [
      {
        pathname: '/api/direct',
        search: '?path=*',
      },
      {
        pathname: '/images/**',
      },
    ],
  },
  
  // Configuración de headers para caché optimizada
  async headers() {
    return [
      {
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/covers/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/sections/hero/cursos.jpg',
        headers: [
          {
            key: 'Link',
            value: '</images/sections/hero/cursos.jpg>; rel=preload; as=image',
          },
        ],
      },
    ];
  },
  
  webpack: (config, { dev }) => {
    // Optimizaciones para desarrollo
    if (dev) {
      config.infrastructureLogging = {
        level: 'error',
      };
      
      // Optimizar resolución de módulos
      config.resolve.symlinks = false;
      
      // Reducir checks en desarrollo  
      config.watchOptions = {
        poll: false,
        ignored: /node_modules/,
      };
      
      // Optimizar cache
      config.cache = {
        type: 'filesystem',
      };
    }
    
    // Suprimir warnings de dependencias y fuentes
    config.ignoreWarnings = [
      /Critical dependency/,
      /Module not found/,
      (warning) => warning.message.includes('-ms-high-contrast'),
      (warning) => warning.message && warning.message.includes('Glyph bbox'),
      (warning) => warning.message && warning.message.includes('font-family'),
    ];
    
    return config;
  },
};

export default nextConfig;