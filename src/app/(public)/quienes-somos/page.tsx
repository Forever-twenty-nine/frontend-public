"use client";
import React from "react";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";
import Image from "next/image";
import HeroSection from "../sections/HeroSection";

const AboutPage: React.FC = () => {
 return (
 <div className="flex min-h-screen flex-col">
 <Navbar />
 
 {/* Hero Section */}
 <HeroSection
 title="Quiénes Somos"
 subtitle="Capacitación profesional con enfoque práctico"
 description="Forma parte de una comunidad educativa que potencia el aprendizaje."
 buttonText="Registrarte"
 buttonHref="/registrarse"
 backgroundImage=""
 />

 <main className="grow bg-white ">
 <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
 
 {/* Main Content with Image */}
 <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
 <div className="flex flex-col justify-center">
 <h2 className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
 Misión
 </h2>
 <p className="mb-4 text-base leading-relaxed text-gray-700 md:text-lg text-justify">
 Equipo interdisciplinario dedicado a capacitar con enfoque práctico y de calidad. Brindamos herramientas concretas para mejorar el desempeño laboral. Trabajamos con empresas del sector industrial diseñando cursos a medida. Nuestro objetivo es generar un impacto real en la productividad, la empleabilidad y el desarrollo del talento humano.
 </p>
<h2 className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
 Visión
 </h2>
 <p className="mb-4 text-base leading-relaxed text-gray-700 md:text-lg text-justify">
    Ser un referente en formación técnica personalizada, reconocidos por la efectividad de nuestros cursos, la experiencia de nuestros instructores y nuestro compromiso con la mejora continua de las competencias laborales en distintos sectores productivos.

 </p>
 <h2 className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
 Valores
 </h2>
 <p className="mb-4 text-base leading-relaxed text-gray-700 md:text-lg text-justify">
• <strong>Calidad</strong>: Diseñamos cada curso con enfoque práctico, actualizado y orientado a resultados concretos. <br />
• <strong>Compromiso</strong>: Acompañamos a empresas y personas en su proceso de crecimiento profesional. <br />
• <strong>Flexibilidad</strong>: Adaptamos los contenidos, formatos y metodologías según las necesidades de cada cliente o participante. <br />
• <strong>Profesionalismo</strong>: Contamos con instructores altamente capacitados, con experiencia real en el ámbito técnico e industrial. <br />
• <strong>Inclusión</strong>: Promovemos el acceso a la capacitación como herramienta para mejorar oportunidades laborales y fomentar el desarrollo personal.
 </p>
 </div>
 <div className="relative h-64 overflow-hidden rounded-lg shadow-xl md:h-80 lg:h-full">
 <Image
 src="/images/frontend/cursala-analizando-estadisticas.jpg"
 alt="Capacitación empresarial"
 fill
 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
 priority
 className="object-cover"
 />
 </div>
 </div>

{/* Features Grid */}
 <div className="mt-10 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-tertiary transition-all duration-300 group-hover:bg-brand-secondary">
 <svg className="h-6 w-6 text-white group-hover:text-brand-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
 </svg>
 </div>
 <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:font-bold ">
 Capacitación Empresarial
 </h3>
 <p className="text-sm text-gray-600 ">
 Programas diseñados para equipos industriales
 </p>
 </div>

 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-tertiary transition-all duration-300 group-hover:bg-brand-secondary ">
 <svg className="h-6 w-6 text-white group-hover:text-brand-tertiary " fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
 </svg>
 </div>
 <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:font-bold ">Desarrollo Individual</h3>
 <p className="text-sm text-gray-600 ">
Cursos para aumentar empleabilidad
</p>
 </div>

 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-tertiary transition-all duration-300 group-hover:bg-brand-secondary ">
 <svg className="h-6 w-6 text-white group-hover:text-brand-tertiary " fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
 </svg>
 </div>
 <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:font-bold ">Enfoque Práctico</h3>
 <p className="text-sm text-gray-600 ">
Orientado a resultados aplicables </p>
 </div>
 </div>

 {/* Stats Section */}
  {/* <div className="mb-12 grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-3">
 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
  <Image
 src="/images/illustration/illustration-01.svg"
 alt="Capacitación"
 width={80}
 height={80}
 className="mx-auto mb-2"
 />
 <div className="mb-2 text-xl text-center font-bold text-brand-primary ">Capacitación Empresarial</div>
 <div className="text-base text-center text-brand-tertiary ">Programas diseñados para equipos industriales
</div>
 </div>
 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <Image
 src="/images/illustration/illustration-02.svg"
 alt="Desarrollo"
 width={80}
 height={80}
 className="mx-auto mb-2"
 />
 <div className="mb-2 text-xl text-center font-bold text-brand-primary ">Desarrollo Individual</div>
 <div className="text-base text-center text-brand-tertiary ">Cursos para aumentar empleabilidad</div>
 </div>
  <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <Image
 src="/images/illustration/illustration-03.svg"
 alt="Desarrollo"
 width={80}
 height={80}
 className="mx-auto mb-2"
 />
 <div className="mb-2 text-xl text-center font-bold text-brand-primary ">Enfoque Práctico</div>
 <div className="text-base text-center text-brand-tertiary ">Orientado a resultados aplicables</div>
 </div>
 </div>  */}


 {/* <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-2 text-3xl font-bold text-brand-primary ">10+</div>
 <div className="text-base text-brand-tertiary ">Años de Experiencia</div>
 </div>
 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-2 text-3xl font-bold text-brand-primary ">500+</div>
 <div className="text-base text-brand-tertiary ">Alumnos</div>
 </div>
 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-2 text-3xl font-bold text-brand-primary ">50+</div>
 <div className="text-base text-brand-tertiary ">Empresas</div>
 </div>
 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-2 text-3xl font-bold text-brand-primary ">95%</div>
 <div className="text-base text-brand-tertiary ">Satisfacción</div>
 </div>
 </div> */}

 {/* Features */}
 {/* <div className="grid gap-6 md:grid-cols-3">
 <div className="rounded-lg bg-brand-tertiary-lighten/10 border border-solid border-brand-tertiary-lighten/20 p-6 transition-all :shadow-blue-500/10">
 <div className="mb-4">
 <Image
 src="/images/illustration/illustration-01.svg"
 alt="Capacitación"
 width={80}
 height={80}
 className="mx-auto"
 />
 </div>
 <h3 className="mb-2 text-center text-lg font-semibold text-gray-900 ">
 Capacitación Empresarial
 </h3>
 <p className="text-center text-sm text-gray-600 ">
 Programas diseñados para equipos industriales
 </p>
 </div>
 <div className="rounded-lg bg-brand-tertiary-lighten/10 border border-solid border-brand-tertiary-lighten/20 p-6 transition-all :shadow-blue-500/10">
 <div className="mb-4">
 <Image
 src="/images/illustration/illustration-02.svg"
 alt="Desarrollo"
 width={80}
 height={80}
 className="mx-auto"
 />
 </div>
 <h3 className="mb-2 text-center text-lg font-semibold text-gray-900 ">
 Desarrollo Individual
 </h3>
 <p className="text-center text-sm text-gray-600 ">
 Cursos para aumentar empleabilidad
 </p>
 </div>
 <div className="rounded-lg bg-brand-tertiary-lighten/10 border border-solid border-brand-tertiary-lighten/20 p-6 transition-all :shadow-blue-500/10">
 <div className="mb-4">
 <Image
 src="/images/illustration/illustration-03.svg"
 alt="Práctico"
 width={80}
 height={80}
 className="mx-auto"
 />
 </div>
 <h3 className="mb-2 text-center text-lg font-semibold text-gray-900 ">
 Enfoque Práctico
 </h3>
 <p className="text-center text-sm text-gray-600 ">
 Orientado a resultados aplicables
 </p>
 </div>
 </div> */}
 </div>
 </main>

 <Footer />
 </div>
 );
};

export default AboutPage;
