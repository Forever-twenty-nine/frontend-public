import React from "react";
import { Metadata } from "next";
import { getPublishedCourses, getCourseById } from "@/services/course.service";
import { extractCourseIdFromSlug } from "@/utils/slugify";
import CourseDetailClient from "./CourseDetailClient";

interface CourseDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

// Función para generar metadatos dinámicos
export async function generateMetadata({ params }: CourseDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const courseId = extractCourseIdFromSlug(slug);

  try {
    const response = await getPublishedCourses();
    const raw = Array.isArray((response as any)?.data)
      ? (response as any).data
      : (response as any)?.data?.items || [];
    const coursesData: any[] = Array.isArray(raw) ? raw : [];

    const foundCourse = coursesData.find((c: any) => c._id.slice(-8) === courseId);

    if (foundCourse) {
      const courseDetailResponse = await getCourseById(foundCourse._id);
      let course = (courseDetailResponse as any)?.data || courseDetailResponse;
      
      if (course && course.courseData) {
        course = course.courseData;
      }

      const title = `${course.name} | Cursala`;
      const description = course.description || 'Aprende nuevas habilidades con nuestros cursos especializados en Cursala.';
      
      // Construir la URL de la imagen (Bunny CDN)
      const BUNNY_STORAGE_CDN = "https://cursala.b-cdn.net";
      let imageUrl = "https://cursala.com.ar/logo-cursala.png"; // fallback

      if (course.imageUrl) {
        if (course.imageUrl.startsWith('http')) {
          imageUrl = course.imageUrl;
        } else {
          imageUrl = `${BUNNY_STORAGE_CDN}/course-images/${course.imageUrl}`;
        }
      }

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'website',
          url: `https://cursala.com.ar/detalle-curso/${slug}`,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: course.name,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: [imageUrl],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: 'Detalle del Curso | Cursala',
    description: 'Aprende nuevas habilidades con nuestros cursos especializados.',
  };
}

export default function Page({ params }: CourseDetailProps) {
  return <CourseDetailClient params={params} />;
}

