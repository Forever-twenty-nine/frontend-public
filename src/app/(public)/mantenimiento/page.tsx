"use client";

import React from "react";

/**
 * Página de mantenimiento que se muestra cuando el sistema está en actualización
 */
const MaintenancePage: React.FC = () => {
 const handleImageError = (
 e: React.SyntheticEvent<HTMLImageElement, Event>,
 ) => {
 e.currentTarget.style.display = "none";
 };

 return (
 <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ">
 <div className="space-y-8 px-6 text-center">
 {/* Logo */}
 <div className="flex justify-center">
 <img
 src="/logo-cursala.png"
 alt="Cursala Logo"
 className="h-20 w-auto md:h-24"
 onError={handleImageError}
 />
 </div>

 {/* Título principal */}
 <div className="space-y-4">
 <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
 🚧 Actualizaciones en Progreso
 </h1>

 <p className="mx-auto max-w-2xl text-xl text-gray-600 md:text-2xl">
 Estamos mejorando tu experiencia de aprendizaje
 </p>
 </div>

 {/* Mensaje explicativo */}
 <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg ">
 <div className="space-y-4">
 <div className="flex items-center justify-center space-x-2 text-blue-600 ">
 <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
 <span className="font-semibold">Sistema en mantenimiento</span>
 </div>

 <p className="leading-relaxed text-gray-700 ">
 Nuestro equipo técnico está realizando actualizaciones importantes
 para mejorar el rendimiento y la funcionalidad de la plataforma.
 </p>

 <div className="space-y-2 text-sm text-gray-500 ">
 <p>⚡ Optimizaciones de velocidad</p>
 <p>🔧 Mejoras en la carga de imágenes</p>
 <p>✨ Nuevas funcionalidades</p>
 </div>
 </div>
 </div>

 {/* Información de contacto */}
 <div className="space-y-2 text-gray-600 ">
 <p className="text-lg font-medium">
 ⏱️ Tiempo estimado: Unos minutos
 </p>
 <p className="text-sm">
 Si tienes consultas urgentes, contacta con soporte
 </p>
 </div>

 {/* Botón de reintento */}
 <button
 onClick={() => window.location.reload()}
 className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 hover:shadow-xl"
 aria-label="Reintentar carga de la página"
 >
 🔄 Reintentar
 </button>
 </div>
 </main>
 );
};

export default MaintenancePage;
