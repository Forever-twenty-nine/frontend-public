export const conf = {
  // URL del backend público para operaciones generales
  urlBack: process.env.NEXT_PUBLIC_URL_BACK || 'http://localhost:8080/api/v1',
  
  // URL del frontend privado (para redirecciones a login/register)
  frontendPrivateUrl: process.env.NEXT_PUBLIC_FRONTEND_PRIVATE_URL || 'http://localhost:4200',
};
