import React from "react";
import nextDynamic from "next/dynamic";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";
import CoursesSection, { type Course } from "./(public)/sections/CoursesSection";
import HomeRedirectHandler from "./HomeRedirectHandler";

export const dynamicParams = false;

const FAQSection = nextDynamic(() => import("./(public)/sections/FAQSection"), {
  loading: () => <div className="h-96 animate-pulse" />,
});
const CourseRequestForm = nextDynamic(
  () => import("./(public)/sections/CourseRequestForm").then(mod => mod.CourseRequestForm),
  { loading: () => <div className="h-96 animate-pulse" /> }
);

// 🔧 MANTENIMIENTO: Cambiar a true para activar modo mantenimiento
const MAINTENANCE_MODE = false;

async function fetchInitialCourses(): Promise<Course[] | undefined> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return undefined;
    const res = await fetch(`${baseUrl}/courses/home`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    const list: any[] = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    if (list.length === 0) return undefined;
    return list.map((c) => ({
      ...c,
      hasPromotionalCode: c.hasPromotionalCode ?? false,
      imageUrl: c.imageUrl?.startsWith("http")
        ? c.imageUrl
        : c.imageUrl
          ? `https://cursala.b-cdn.net/course-images/${c.imageUrl}`
          : "/images/placeholder.couse.png",
    }));
  } catch {
    return undefined;
  }
}

export default async function HomePage() {
  if (MAINTENANCE_MODE) {
    const { default: MaintenancePage } = await import("./(public)/mantenimiento/page");
    return <MaintenancePage />;
  }

  const initialCourses = await fetchInitialCourses();

  return (
    <div className="flex min-h-screen flex-col">
      <HomeRedirectHandler />
      <Navbar />
      <main className="grow">
        <CoursesSection initialCourses={initialCourses} />
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
}
