import React from "react";
import Link from "next/link";
import { ArrowLeft, Construction, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Próximamente | Cursala",
  description: "La plataforma privada de Cursala está en construcción. ¡Pronto estará disponible!",
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-tertiary flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icono principal */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
              <Construction className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          ¡Próximamente!
        </h1>

        {/* Subtítulo */}
        <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-6">
          La plataforma privada de Cursala
        </h2>

        {/* Descripción */}
        <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg mx-auto">
          Estamos trabajando arduamente para traerte la mejor experiencia de aprendizaje personalizado.
          La plataforma privada con todas las funcionalidades avanzadas estará disponible muy pronto.
        </p>

        {/* Características destacadas */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">Funcionalidades Avanzadas</h3>
            <p className="text-white/70 text-sm">Herramientas exclusivas para estudiantes y profesores</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">Aprendizaje Personalizado</h3>
            <p className="text-white/70 text-sm">Contenido adaptado a tu ritmo y objetivos</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Construction className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">En Construcción</h3>
            <p className="text-white/70 text-sm">Trabajando para ti con dedicación</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="space-y-4">
          <p className="text-white/90 font-medium">
            ¿Quieres ser el primero en saber cuando esté lista?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 bg-white text-brand-primary px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Volver al inicio
            </Link>

            <a
              href="mailto:info@cursala.com"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Contactanos
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">
            © 2025 Cursala. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}