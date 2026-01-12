"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";
import { getPublishedCourses, getCourseById } from "@/services/course.service";
import { getImages, getPublicFile } from "@/services/multimedia.service";
import { getUserProfileImage } from "@/services/multimedia.service";
import { extractCourseIdFromSlug } from "@/utils/slugify";
import { conf } from "@/config/env";
import { showError, showSuccess } from "@/utils/swal";

interface CourseDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

const CourseDetailPage: React.FC<CourseDetailProps> = ({ params }) => {
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasPromotion, setHasPromotion] = useState(false);
  const [courseImageUrl, setCourseImageUrl] = useState<string | null>(null);
  const [teacherPhotoUrls, setTeacherPhotoUrls] = useState<{ [key: number]: string | null }>({});
  const [courseId, setCourseId] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const objectUrls = useRef<string[]>([]);

  // Unwrap params y extraer el ID del slug
  useEffect(() => {
    params.then((unwrappedParams) => {
      // Extraer el ID corto del slug
      const shortId = extractCourseIdFromSlug(unwrappedParams.slug);
      setCourseId(shortId);
    });
  }, [params]);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const response = await getPublishedCourses();
        const raw = Array.isArray((response as any)?.data)
          ? (response as any).data
          : (response as any)?.data?.items || [];
        const coursesData: any[] = Array.isArray(raw) ? raw : [];

        // Buscar el curso por el ID corto (últimos 8 caracteres del _id)
        const foundCourse = coursesData.find((c: any) => c._id.slice(-8) === courseId);

          if (foundCourse) {
          // Obtener los detalles completos del curso usando el ID completo
          const courseDetailResponse = await getCourseById(foundCourse._id);
          let courseDetail = (courseDetailResponse as any)?.data || courseDetailResponse;
          // Normalizar caso donde el backend envía { courseData: { ... } }
          if (courseDetail && (courseDetail as any).courseData) {
            courseDetail = (courseDetail as any).courseData;
          }
          const processedCourse = { ...courseDetail, hasPromotionalCode: courseDetail.hasPromotionalCode ?? false };
          setCourse(processedCourse);

          // Eliminada lógica de promociones (PromotionalTooltip)

          // Cargar imagen del curso
          if (courseDetail.imageUrl) {
            try {
              const imgResponse = await getImages(courseDetail.imageUrl);
              if (imgResponse?.data) {
                const objectURL = URL.createObjectURL(imgResponse.data);
                objectUrls.current.push(objectURL);
                setCourseImageUrl(objectURL);
              }
            } catch (error) {
              // Imagen no disponible, se mostrará placeholder
              setCourseImageUrl(null);
            }
          }

          // Cargar fotos de todos los profesores
          if (courseDetail.teachers && Array.isArray(courseDetail.teachers)) {
            const newPhotoUrls: { [key: number]: string | null } = {};
            
            for (let i = 0; i < courseDetail.teachers.length; i++) {
              const teacher = courseDetail.teachers[i];
              if (teacher?.profilePhotoUrl) {
                const url = teacher.profilePhotoUrl;
                if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
                  // URL pública en CDN: usar directamente
                  newPhotoUrls[i] = url;
                } else {
                  // Caso legacy: pedir al backend y crear objectURL
                  try {
                    const photoResponse = await getUserProfileImage(url);
                    if (photoResponse?.data) {
                      const objectURL = URL.createObjectURL(photoResponse.data);
                      objectUrls.current.push(objectURL);
                      newPhotoUrls[i] = objectURL;
                    } else {
                      newPhotoUrls[i] = null;
                    }
                  } catch (error) {
                    newPhotoUrls[i] = null;
                  }
                }
              }
            }
            
            setTeacherPhotoUrls(newPhotoUrls);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();

    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.current = [];
    };
  }, [courseId]);

  // Manejar redirección después del render
  useEffect(() => {
    if (notFound && !loading) {
      router.push("/cursos");
    }
  }, [notFound, loading, router]);

  const getCourseStatus = () => {
    if (!course) return { label: "", className: "" };

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const registrationOpenDate = new Date(
      course.registrationOpenDate || course.startDate,
    );
    registrationOpenDate.setUTCHours(0, 0, 0, 0);

    const courseStartDate = new Date(course.startDate);
    courseStartDate.setUTCHours(0, 0, 0, 0);

    const courseEndDate = course.endDate ? new Date(course.endDate) : null;
    if (courseEndDate) {
      courseEndDate.setUTCHours(23, 59, 59, 999);
    }

    if (courseEndDate && currentDate > courseEndDate) {
      return { label: "FINALIZADO", className: "bg-gray-400 text-white" };
    }

    if (currentDate < registrationOpenDate) {
      const month = registrationOpenDate
        .toLocaleString("es-ES", { month: "long" })
        .toUpperCase();
      return {
        label: `INSCRIPCIÓN ${month}`,
        className: "bg-gray-600 text-white",
      };
    }

    if (currentDate >= registrationOpenDate) {
      if (currentDate >= courseStartDate) {
        return { label: "EN CURSO", className: "bg-brand-primary text-white" };
      } else {
        return {
          label: "INSCRIPCIÓN ABIERTA",
          className: "bg-brand-secondary text-brand-tertiary",
        };
      }
    }

    return { label: "PRÓXIMAMENTE", className: "bg-brand-tertiary text-white" };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/D";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDownloadProgram = async () => {
    if (!course?.programUrl) return;

    try {
      // Si es una URL completa de Bunny CDN, abrir directamente en nueva pestaña
      // El navegador permitirá descargar/ver el PDF sin problemas de CORS
      if (course.programUrl.startsWith('http://') || course.programUrl.startsWith('https://')) {
        window.open(course.programUrl, '_blank');
        showSuccess("Programa abierto en nueva pestaña");
        return;
      }

      // Si es un archivo legacy, usar el método anterior con el backend
      const response = await getPublicFile(course.programUrl);
      const blob = response.data;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Programa_${course.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showSuccess("Programa descargado correctamente");
    } catch (error) {
      console.error("Error al descargar el programa:", error);
      showError("Error al descargar el programa. Por favor, intente nuevamente.");
    }
  };

  if (loading || !course) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex grow items-center justify-center bg-gray-50 ">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-brand-primary "></div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusInfo = getCourseStatus();

  const isFree =
    course?.isFree === true ||
    course?.price === 0 ||
    course?.price === "0" ||
    (typeof course?.price === "string" && course.price.toLowerCase() === "free");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="grow bg-white">
        {/* Botón volver */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push("/cursos")}
            className="flex items-center space-x-2 text-brand-tertiary cursor-pointer transition-all hover:text-brand-primary active:text-brand-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Volver a todos los cursos</span>
          </button>
        </div>

        {/* Hero con imagen */}
        <section className="relative bg-linear-to-tr from-brand-primary/10 to-brand-primary/10 py-12 text-white md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              {/* Imagen del curso */}
              <div className="w-full md:w-1/3">
                <div className="relative">
                  {courseImageUrl ? (
                    <div className="overflow-hidden rounded-xl">
                      <Image
                        src={courseImageUrl}
                        alt={course.name}
                        width={400}
                        height={300}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center rounded-lg bg-white/10">
                      <svg
                        className="h-16 w-16 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {course.hasPromotionalCode && (
                    <div className={`absolute top-3 ${isFree ? 'right-3' : 'left-3'} z-20`}>
                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-md shadow-md text-xs font-semibold leading-tight max-w-30">
                        <div className="whitespace-pre-line text-[11px]">CÓDIGO{`\n`}PROMOCIONAL</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Info del curso */}
              <div className="flex-1">
                <h1 className="mb-4 text-3xl font-bold md:text-4xl text-brand-tertiary">
                  {course.name}
                </h1>
                <div className="mb-4 inline-block text-brand-tertiary items-center gap-3">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${statusInfo.className}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>
                <p className="mb-6 mt-4 text-lg leading-relaxed text-brand-tertiary text-justify">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Columna principal */}
            <div className="lg:col-span-2">
              {/* Descripción completa */}
              <div className="mb-8 rounded-lg bg-white p-8 border border-solid border-brand-tertiary-lighten/40">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 ">
                  Descripción del Curso
                </h2>
                <p className="whitespace-pre-line text-gray-700 leading-relaxed text-justify">
                  {course.longDescription || course.description}
                </p>
              </div>

              {/* Información de los profesores */}
              {course.teachers && course.teachers.length > 0 && (
                <div className="rounded-lg bg-white p-8 border border-solid border-brand-tertiary-lighten/40">
                  <h2 className="mb-8 text-2xl font-bold text-gray-900">
                    Profesores
                  </h2>
                  <div className="space-y-10">
                    {course.teachers.map((teacher: any, index: number) => {
                      const name = teacher?.firstName && teacher?.lastName
                        ? `${teacher.firstName} ${teacher.lastName}`
                        : teacher?.name || teacher?.fullName || `Profesor ${index + 1}`;

                      const desc = teacher?.professionalDescription || teacher?.description || null;

                      // Priorizar la URL directa del teacher sobre el estado procesado
                      const photoSrc = teacher?.profilePhotoUrl || teacherPhotoUrls[index] || teacher?.photoUrl || '';

                      return (
                        <div key={index} className="flex items-start flex-col md:flex-row gap-4">
                          <div className="flex items-center justify-center rounded-full bg-brand-primary overflow-hidden shrink-0 h-16 w-16">
                            {photoSrc ? (
                              <img
                                alt={name}
                                className="h-full w-full object-cover"
                                src={photoSrc}
                              />
                            ) : (
                              <svg
                                className="h-10 w-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-gray-900"> 
                              {name}
                            </h3>
                            {desc && (
                              <p className="mt-2 text-gray-700 ">
                                {desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Card de detalles */}
              <div className="sticky top-4 rounded-lg bg-linear-to-bl from-brand-tertiary-light to-brand-tertiary p-8 border border-solid border-brand-tertiary-lighten/40">

                <h3 className="mb-4 text-xl font-bold text-white">
                  Detalles del Curso
                </h3>

                <div className="space-y-4">
                  {/* Fecha de inicio */}
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 text-brand-tertiary-lighten"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Inicio
                      </p>
                      <p className="text-brand-secondary">
                        {formatDate(course.startDate)}
                      </p>
                    </div>
                  </div>

                  {/* Duración */}
                  {typeof course.classCount === "number" && course.classCount > 0 && (
                    <div className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 text-brand-tertiary-lighten"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Clases
                        </p>
                        <p className="text-brand-secondary">{course.classCount} clases</p>
                      </div>
                    </div>
                  )}

                  {/* Horario */}
                  {course.time && (
                    <div className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 text-brand-tertiary-lighten"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Horario
                        </p>
                        <p className="text-brand-secondary">{course.time}</p>
                      </div>
                    </div>
                  )}

                  {/* Días */}
                  {course.days && course.days.length > 0 && (
                    <div className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 text-brand-tertiary-lighten"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Días
                        </p>
                        <p className="text-brand-secondary">{course.days.join(", ")}</p>
                      </div>
                    </div>
                  )}

                  {/* Modalidad */}
                  {course.modality && (
                    <div className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 text-brand-tertiary-lighten"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Modalidad
                        </p>
                        <p className="text-brand-secondary">{course.modality}</p>
                      </div>
                    </div>
                  )}

                  {/* Precio */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-white">
                        Precio
                      </span>
                      {course.price > 0 ? (
                        <span className="text-3xl font-bold text-white">
                          ${course.price.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-3xl font-bold text-brand-secondary">
                          GRATIS
                        </span>
                      )}
                    </div>
                    {course.maxInstallments > 1 && (
                      <p className="mt-1 text-xs text-gray-500">
                        Hasta {course.maxInstallments} cuotas
                        {course.interestFree && " sin interés"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Botón de inscripción */}
                <button
                  onClick={() => window.location.href = `${conf.frontendPrivateUrl}/login`}
                  className="mt-6 w-full rounded-full cursor-pointer text-brand-tertiary px-6 py-3 font-semibold transition-all duration-500 bg-brand-secondary hover:ring-[3px] hover:ring-[#dcab07] hover:bg-brand-secondary active:bg-brand-tertiary active:text-white"
                >
                  Inscribirme
                </button>

                {/* Botón de descarga de programa PDF dentro del card sticky */}
                {course.programUrl && (
                  <div className="mt-6">
                    <button
                      onClick={handleDownloadProgram}
                      className="active:bg-brand-tertiary active:text-white active:ring-[#f2f2f2] bg-[#dad6d6] cursor-pointer duration-500 flex font-semibold gap-1 hover:bg-brand-primary-dark hover:border-brand-primary hover:ring-[#8f8f8f] transition-all hover:ring-[3px] items-center justify-center mt-6 px-6 py-3 rounded-full text-brand-tertiary  w-full"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v12m0 0l-4-4m4 4l4-4"
                        />
                      </svg>
                      Descargar Programa del Curso
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailPage;
