// Configuración de entorno que funciona tanto en build-time como en runtime
// En Next.js 16, las variables NEXT_PUBLIC_* se pueden leer en runtime si se pasan
// como variables de entorno al contenedor Docker

export const conf = {
  // URL del backend público para operaciones generales
  urlBack: typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_URL_BACK 
    : (window as any).__ENV?.NEXT_PUBLIC_URL_BACK || process.env.NEXT_PUBLIC_URL_BACK || 'https://cursala.com.ar/api/v1',

  // URL del frontend privado (para redirecciones a login/register)
  frontendPrivateUrl: typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_FRONTEND_PRIVATE_URL
    : (window as any).__ENV?.NEXT_PUBLIC_FRONTEND_PRIVATE_URL || process.env.NEXT_PUBLIC_FRONTEND_PRIVATE_URL || 'https://app.cursala.com.ar',
};