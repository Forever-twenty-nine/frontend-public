import axios from "axios";

// Usar la URL base configurable via env (Next.js: NEXT_PUBLIC_API_BASE_URL)
// Fallback a http://localhost:8080 para desarrollo local
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
});

// NOTA: Este axios instance NO agrega automáticamente tokens de autenticación
// Los servicios que requieran autenticación deben manejarla explícitamente
// Esto es apropiado para un frontend público donde la mayoría del contenido es anónimo

api.interceptors.request.use(
  (config) => {
    // No agregar automáticamente token - cada servicio decide si necesita autenticación
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log más detallado del error
    if (error.response) {
      console.error("❌ API Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
      });

      // Log adicional para datos específicos
      console.error("📋 Response data details:", JSON.stringify(error.response?.data, null, 2));
    } else if (error.request) {
      console.error("❌ Network Error:", error.message);
    } else {
      console.error("❌ Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;