"use client";

export const dynamicParams = false;

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import nextDynamic from "next/dynamic";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";
import Link from "next/link";

// Metadata para la página principal se define en un archivo separado
// para mantener el componente como cliente

// Lazy loading de secciones para mejor performance
const CoursesSection = nextDynamic(() => import("./(public)/sections/CoursesSection"), {
  loading: () => <div className="h-96 animate-pulse " />,
});
const FAQSection = nextDynamic(() => import("./(public)/sections/FAQSection"), {
  loading: () => <div className="h-96 animate-pulse " />, 
});
const CourseRequestForm = nextDynamic(
  () => import("./(public)/sections/CourseRequestForm").then(mod => mod.CourseRequestForm),
  { loading: () => <div className="h-96 animate-pulse " /> }
);
const MaintenancePage = nextDynamic(() => import("./(public)/mantenimiento/page"));

// 🔧 MANTENIMIENTO: Cambiar a true para activar modo mantenimiento
const MAINTENANCE_MODE = false;

function HomePageInternal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Redirigir a la página de registro si viene con el parámetro
  useEffect(() => {
    const shouldRedirect = searchParams.get('register') === 'true';
    if (shouldRedirect) {
      router.push('/registrarse');
    }
  }, [searchParams, router]);

  // 🔧 FÁCIL SWITCH: Solo cambiar MAINTENANCE_MODE arriba para activar/desactivar
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  // Página normal
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        {/* <CarouselSection /> */}
        <CoursesSection />
        <FAQSection />
        <section className="bg-linear-to-b from-brand-primary/10 to-brand-primary/40 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 text-center">
                <h2 className="mb-3 text-4xl font-bold text-brand-primary">
                  ¿No encontraste el curso que buscabas?
                </h2>
                <p className="text-lg text-brand-tertiary">
                  Contanos sobre qué tema te gustaría recibir capacitación. ¡Podemos armarlo para vos!
                </p>
              </div>
              <CourseRequestForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};


// Componente principal con Suspense
const HomePage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    }>
      <HomePageInternal />
    </Suspense>
  );
};

export default HomePage;
