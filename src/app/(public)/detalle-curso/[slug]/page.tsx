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

  // Intentar obtener la URL base para el servidor
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://cursala.com.ar";
  const apiUrl = baseUrl.startsWith('http') ? baseUrl : `https://cursala.com.ar${baseUrl}`;

  try {
    // Intentar buscar el curso. Usamos fetch directo para evitar problemas de instancia en el servidor
    const response = await fetch(`${apiUrl}/api/v1/courses/public?page=1&size=1000`, { 
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const body = await response.json();
    
    // El backend parece devolver { data: { data: [...] } } o { data: [...] }
    const rawData = body?.data?.data || body?.data || body || [];
    const coursesData = Array.isArray(rawData) ? rawData : (rawData.items || []);

    const foundCourse = coursesData.find((c: any) => c._id && c._id.toString().endsWith(courseId));

    if (foundCourse) {
      const title = foundCourse.name;
      const description = foundCourse.description?.replace(/<[^>]*>?/gm, '').slice(0, 160) || 'Aprende nuevas habilidades con nuestros cursos especializados en Cursala.';
      
      const BUNNY_STORAGE_CDN = "https://cursala.b-cdn.net";
      let imageUrl = "https://cursala.com.ar/logo-cursala.png";

      if (foundCourse.imageUrl) {
        if (foundCourse.imageUrl.startsWith('http')) {
          imageUrl = foundCourse.imageUrl;
        } else {
          imageUrl = `${BUNNY_STORAGE_CDN}/course-images/${encodeURIComponent(foundCourse.imageUrl)}`;
        }
      }

      return {
        title: `${title} | Cursala`,
        description,
        alternates: {
          canonical: `https://cursala.com.ar/detalle-curso/${slug}`,
        },
        openGraph: {
          title: `${title} | Cursala`,
          description,
          type: 'website',
          url: `https://cursala.com.ar/detalle-curso/${slug}`,
          siteName: 'Cursala',
          locale: 'es_AR',
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${title} | Cursala`,
          description,
          images: [imageUrl],
        },
        other: {
          'image': imageUrl,
          'medium': 'multimedia',
          'url': `https://cursala.com.ar/detalle-curso/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata para curso:", slug, error);
  }

  // Fallback con un indicador visual para saber que entró aquí
  return {
    title: 'Detalle del Curso | Cursala',
    description: 'Aprende nuevas habilidades con nuestros cursos especializados en Cursala.',
    openGraph: {
      title: 'Cursos Especializados | Cursala',
      description: 'Explora nuestra oferta de cursos y capacítate con expertos.',
      images: ['https://cursala.com.ar/logo-cursala.png'],
      url: `https://cursala.com.ar/detalle-curso/${slug}`,
    }
  };
}

export default function Page({ params }: CourseDetailProps) {
  return <CourseDetailClient params={params} />;
}

