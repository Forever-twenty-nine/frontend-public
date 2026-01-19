// Configuración de entorno que funciona tanto en build-time como en runtime
// En Next.js 16, las variables NEXT_PUBLIC_* se pueden leer en runtime si se pasan
// como variables de entorno al contenedor Docker

export const conf = {
  // URL del backend público para operaciones generales
  // Se espera que `NEXT_PUBLIC_URL_BACK` sea inyectada por Docker Compose
  // No hacer fallback hardcodeado: dejar en string vacío si no está presente
  urlBack: typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_BASE_URL || ''
    : (window as any).__ENV?.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '',

  // URL del frontend privado (para redirecciones a login/register)
  // Se espera que `NEXT_PUBLIC_FRONTEND_PRIVATE_URL` sea inyectada por Docker Compose
  frontendPrivateUrl: typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_FRONTEND_PRIVATE_URL || ''
    : (window as any).__ENV?.NEXT_PUBLIC_FRONTEND_PRIVATE_URL || process.env.NEXT_PUBLIC_FRONTEND_PRIVATE_URL || '',
};