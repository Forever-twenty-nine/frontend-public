export const conf = {
  // URL del backend público para operaciones generales
  urlBack: process.env.NEXT_PUBLIC_URL_BACK_SSR || process.env.NEXT_PUBLIC_URL_BACK,
  
  // URL del backend privado para autenticación (login, register)
  urlBackAuth: process.env.NEXT_PUBLIC_URL_BACK_AUTH_SSR || process.env.NEXT_PUBLIC_URL_BACK_AUTH || process.env.NEXT_PUBLIC_URL_BACK_SSR || process.env.NEXT_PUBLIC_URL_BACK,
  
  // URL del frontend privado (para redirecciones a login/register)
  frontendPrivateUrl: process.env.NEXT_PUBLIC_FRONTEND_PRIVATE_URL || 'http://localhost:4200',
};
