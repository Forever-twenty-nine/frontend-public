"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCoursesOnHome, getImages } from "@/services";
import { generateCourseSlug } from "@/utils/slugify";

export interface Course {
    _id: string;
    name: string;
    imageUrl: string;
}

type PromotionsMap = Record<string, boolean>;

/**
 * Sección de cursos más solicitados
 * Muestra una grid responsive de cursos con imágenes, badges de descuento y links
 */
const CoursesSection: React.FC<{ className?: string }> = ({ className }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar cursos e imágenes optimizado
    useEffect(() => {
        let isMounted = true;
        const imageUrls: string[] = [];

        async function fetchCourses() {
            try {
                setLoading(true);
                setError(null);

                // Fetch courses - La respuesta tiene estructura: { status, message, data: [...] }
                const response = await getCoursesOnHome();
                const coursesData: Course[] = Array.isArray((response as any)?.data) 
                    ? (response as any).data 
                    : Array.isArray(response) 
                    ? response 
                    : [];

                if (!isMounted) return;

                // Fetch images con error handling
                const imagePromises = coursesData.map(async (course) => {
                    try {
                        if (course.imageUrl) {
                            const res = await getImages(course.imageUrl);
                            if (res.data) {
                                const url = URL.createObjectURL(res.data);
                                imageUrls.push(url);
                                return url;
                            }
                        }
                        return "";
                    } catch (error) {
                        console.warn(`Error loading image for course ${course._id}:`, error);
                        return "";
                    }
                });

                const loadedImages = await Promise.all(imagePromises);

                if (isMounted) {
                    setCourses(coursesData);
                    setImages(loadedImages);
                }
            } catch (error) {
                console.error("Error fetching courses for home:", error);
                if (isMounted) {
                    setError("Error al cargar los cursos");
                    setCourses([]);
                    setImages([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCourses();

        // Cleanup
        return () => {
            isMounted = false;
            imageUrls.forEach((url) => {
                if (url && url.startsWith("blob:")) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    // Skeleton loader
    const SkeletonCard = () => (
        <div className="group relative flex animate-pulse flex-col overflow-hidden rounded-lg bg-gray-200 shadow-md ">
            <div className="aspect-4/3 w-full bg-white"></div>
            <div className="flex h-20 items-center justify-center bg-white/10 px-4">
                <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            </div>
        </div>
    );

    // Course Card Component
    const CourseCard = ({ course, imageUrl, priority }: { course: Course; imageUrl: string; priority: boolean }) => {
        const slug = generateCourseSlug(course.name, course._id);

        return (
            <Link
                href={`/detalle-curso/${slug}`}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-solid border-brand-tertiary-lighten/60 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/20 "
            >
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={course.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority={priority}
                            loading={priority ? "eager" : "lazy"}
                            fetchPriority={priority ? "high" : undefined}
                            onError={(e) => {
                                console.warn(`Error displaying image for ${course.name}`);
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-200 to-gray-300 text-gray-500">
                            <svg
                                className="h-16 w-16"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    )}


                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-brand-primary-dark via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute bottom-3 left-3 right-3">
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                                Ver detalles
                                <svg
                                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Course Title */}
                <div className="flex flex-1 items-center justify-center bg-white px-4 py-4 text-center transition-colors">
                    <h3 className="line-clamp-2 text-lg leading-tight font-bold text-brand-tertiary group-hover:text-brand-primary">
                        {course.name}
                    </h3>
                </div>
            </Link>
        );
    };

        if (error) {
            return (
                <section className={`bg-white py-12 md:py-16 ${className || ""}`}>
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-center rounded-lg bg-red-50 py-16 text-center">
                            <svg
                                className="mb-4 h-16 w-16 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="mb-4 text-lg text-red-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="relative inline-block px-6 py-3 text-base font-semibold mt-4  cursor-pointer text-brand-primary rounded-full transition duration-500 bg-transparent border border-solid border-brand-primary hover: hover:bg-brand-primary/10 hover:ring-[3px] active:bg-brand-tertiary active:text-white active:ring-brand-secondary"
                                aria-label="Reintentar carga de cursos"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </section>
            );
        }

    return (
        <section
            className={`bg-linear-to-b from-brand-tertiary/5 to-brand-tertiary/20 py-10 pb-16 ${className || ""}`}
            aria-label="Cursos más solicitados"
        >
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8 text-center md:mb-12">
                    <h2 className="font-bold text-3xl lg:text-5xl leading-tight max-w-2xl mx-auto mb-4 lg:mb-6 bg-linear-to-bl from-brand-primary/60 to-brand-primary bg-clip-text text-transparent">
                        Desarrolla tus habilidades y avanza en tu carrera profesional
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-brand-tertiary">
                        En Cursala te damos las competencias que hoy exige la industria para convertirte en el talento que las empresas necesitan.
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(4)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : courses.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <svg
                            className="mb-4 h-20 w-20 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <p className="text-lg text-gray-600">
                            No hay cursos disponibles en este momento
                        </p>
                    </div>
                ) : (
                    /* Courses Grid */
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {courses.map((course, index) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                imageUrl={images[index]}
                                priority={index < 4}
                            />
                        ))}
                    </div>
                )}

                {/* View All Button */}
                {!loading && courses.length > 0 && (
                    <div className="mt-8 flex justify-center md:mt-12">
                        <Link
                            href="/cursos"
                            className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-base font-bold text-white shadow-2xl border-2 border-white transition-all duration-500 hover:bg-brand-primary-dark hover:text-white hover:ring-[3px] hover:ring-brand-primary active:bg-brand-tertiary active:text-white active:ring-brand-secondary focus:outline-none focus:ring-4 focus:ring-brand-primary"
                        >
                            Ver Todos los Cursos
                            <svg
                                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default React.memo(CoursesSection);
