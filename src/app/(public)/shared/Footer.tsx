"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCoursesOnHome } from "@/services";
import { generateCourseSlug } from "@/utils/slugify";

// Lista dinámica de cursos para el Footer
const FooterCoursesList: React.FC = () => {
  const [courses, setCourses] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);
        const response = await getCoursesOnHome();
        // La respuesta tiene estructura: { status, message, data: [...] }
        const data = Array.isArray((response as any)?.data) 
          ? (response as any).data 
          : Array.isArray(response) 
          ? response 
          : [];
        if (isMounted) {
          setCourses(Array.isArray(data) ? data.slice(0, 10) : []);
        }
      } catch (err) {
        setError("No se pudieron cargar los cursos");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchCourses();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-400">Cargando cursos...</div>;
  }
  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }
  if (!courses.length) {
    return <div className="text-sm text-gray-400">No hay cursos disponibles</div>;
  }

  // Dividir en dos columnas si hay más de 5 cursos
  const mid = Math.ceil(courses.length / 2);
  const col1 = courses.slice(0, mid);
  const col2 = courses.slice(mid);

  return (
    <div className="md:flex gap-20">
      <ul>
        {col1.map((course) => (
          <li key={course._id} className="mb-2">
            <Link
              href={`/detalle-curso/${generateCourseSlug(course.name, course._id)}`}
              className="hover:text-brand-primary active:text-brand-secondary"
            >
              {course.name}
            </Link>
          </li>
        ))}
        {col2.map((course) => (
          <li key={course._id} className="mb-2">
            <Link
              href={`/detalle-curso/${generateCourseSlug(course.name, course._id)}`}
              className="hover:text-brand-primary active:text-brand-secondary"
            >
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Footer público - Pie de página para todas las páginas públicas
 * Incluye enlaces rápidos, redes sociales y copyright
 */
const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const footerLinks = [
    { href: "/politica-privacidad", label: "Políticas de Privacidad" },
    { href: "/terminos-servicio", label: "Términos y Condiciones" },
    { href: "/quienes-somos", label: "Sobre Nosotros" },
  ];

  return (
    <footer
      className={`w-full border-t border-gray-200 bg-brand-tertiary-lighten/10 ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        {/* Main Content */}
        <div className="md:flex md:justify-between gap-20">
          <div className="text-center">
            {/* Logo para modo claro - negro */}
            <div style={{ position: 'relative', width: '160px', height: '32px' }} className="mb-3">
              <Image
                src="/logo/cursala.svg"
                alt="Logo Cursala"
                fill
                unoptimized
              />
            </div>
            {/* Logo para modo oscuro - blanco */}
            <div style={{ position: 'relative', width: '160px', height: '32px' }} className="hidden mb-3">
              <Image
                src="/logo/cursala-negativo.svg"
                alt="Logo Cursala"
                fill
                unoptimized
              />
            </div>
            <h3 className="text-left text-sm font-bold text-brand-tertiary-light">Descubriendo expertos</h3>
          </div>
          <div className="w-full md:flex gap-20">
            {/* col-1 */}
            <div>
              <h2 className="font-bold mb-4">
                Los cursos más solicitados
              </h2>
              <FooterCoursesList />
            </div>

            {/* col-2 */}
            <div>
              <h2 className="font-bold mb-4 mt-8 md:mt-0">
                Cursala y su comunidad
              </h2>
              <ul>
                <li className="mb-2">
                  <a href="/capacitaciones-empresas" className="hover:text-brand-primary active:text-brand-secondary">Capacitaciones para Empresas</a>
                </li>
                <li className="mb-2">
                  <a href="/quiero-capacitar" className="hover:text-brand-primary active:text-brand-secondary">Quiero Capacitar</a>
                </li>
                <li className="mb-2">
                  <a href="/registrarse" className="hover:text-brand-primary active:text-brand-secondary">Quiero Formarme</a>
                </li>
                <li className="mb-2">
                  <a href="/preguntas" className="hover:text-brand-primary active:text-brand-secondary">Preguntas Frecuentes</a>
                </li>
                <li className="mb-2">
                  <a href="/quienes-somos" className="hover:text-brand-primary active:text-brand-secondary">Sobre Nosotros</a>
                </li>
              </ul>
            </div>

            {/* col-3 */}
            <div>
              <h2 className="font-bold mb-4 mt-8 md:mt-0">
                Legal
              </h2>
              <ul>
                <li className="mb-2">
                  <a href="/politica-privacidad" className="hover:text-brand-primary active:text-brand-secondary">Políticas de privacidad</a>
                </li>
                <li className="mb-2">
                  <a href="/terminos-servicio" className="hover:text-brand-primary active:text-brand-secondary">Términos y Condiciones</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-center border-t border-brand-tertiary-lighten/50 border-solid mt-10 pt-4">
          <p className="text-xs text-brand-tertiary-light md:text-sm">
            © {new Date().getFullYear()} Cursala. Todos los derechos reservados.
          </p>
          <p className="flex items-center justify-center gap-1 text-xs text-brand-tertiary-light md:text-sm">
            Creado por
            <span className="font-semibold transition-colors">
              FTN Agency
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
