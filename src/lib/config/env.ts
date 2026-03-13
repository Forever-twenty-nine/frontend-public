// Configuración de entorno compatible con Next.js y el código migrado de backend
import path from "path";

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL || "",

  // SMTP / EMAIL
  EMAIL_FROM: process.env.EMAIL_FROM || "no-reply@cursala.com.ar",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: Number(process.env.EMAIL_PORT || 587),
  
  // Usar Ethereal en desarrollo por defecto
  EMAIL_USE_ETHEREAL:
    process.env.EMAIL_USE_ETHEREAL === "true" ||
    (process.env.EMAIL_USE_ETHEREAL === undefined && process.env.NODE_ENV !== "production"),

  // Notificaciones
  ADMIN_NOTIFICATION_EMAIL: process.env.ADMIN_NOTIFICATION_EMAIL || 'info@cursala.com.ar',
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'no-reply@cursala.com.ar',
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'soporte@cursala.com.ar',

  // URLs
  FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
};

export default config;
