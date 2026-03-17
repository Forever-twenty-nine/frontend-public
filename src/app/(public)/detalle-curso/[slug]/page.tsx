import React from "react";
import { Metadata } from "next";
import { getCourseById, getPublishedCourses } from "@/services/course.service";
import { extractCourseIdFromSlug } from "@/utils/slugify";
import CourseDetailClient from "./CourseDetailClient";
import dbConnect from "@/lib/mongodb";
import CourseService from "@/lib/services/course.service";

interface CourseDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

// Función para generar metadatos dinámicos
export async function generateMetadata({ params }: CourseDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const shortId = extractCourseIdFromSlug(slug);

  try {
    // 1. Acceso directo a la base de datos para evitar problemas de red en SSR (monolito)
    await dbConnect();
    const courseLibService = new CourseService();
    
    // Obtenemos cursos publicados para encontrar el ID completo
    // findPublished devuelve { items, total }
    const { items: coursesData } = await courseLibService.findPublished(1, 100);

    // Buscar el curso por el ID corto
    const foundCourse = coursesData.find((c: any) => {
      const idStr = String(c._id);
      return idStr.slice(-8) === shortId;
    });

    // Imagen por defecto que cumple con los requisitos de tamaño (1200x630 recomendado)
    // Usamos el placeholder de curso que ya existe en el proyecto
    const DEFAULT_OG_IMAGE = "https://cursala.com.ar/images/placeholder.couse.png";

    if (!foundCourse) {
      console.warn(`[generateMetadata] No se encontró el curso con shortId: ${shortId}`);
      return { 
        title: 'Curso no encontrado | Cursala',
        openGraph: {
          images: [DEFAULT_OG_IMAGE]
        }
      };
    }

    // 2. Ahora que tenemos el ID real (_id), obtenemos el detalle completo directamente del servicio de lib
    const course = await courseLibService.findOnePublic(String(foundCourse._id));

    if (course) {
      const title = course.name;
      const description = course.description?.replace(/<[^>]*>?/gm, '').slice(0, 160) || 'Aprende nuevas habilidades con nuestros cursos especializados en Cursala.';
      
      const BUNNY_STORAGE_CDN = "https://cursala.b-cdn.net";
      let imageUrl = DEFAULT_OG_IMAGE;

      if (course?.imageUrl) {
        if (course.imageUrl.startsWith('http')) {
          imageUrl = course.imageUrl;
        } else {
          imageUrl = `${BUNNY_STORAGE_CDN}/course-images/${encodeURIComponent(course.imageUrl)}`;
        }
      }

      const pageUrl = `https://cursala.com.ar/detalle-curso/${slug}`;

      return {
        title: title,
        description,
        alternates: {
          canonical: pageUrl,
        },
        openGraph: {
          title: `${title} | Cursala`,
          description,
          type: 'website',
          url: pageUrl,
          siteName: 'Cursala',
          locale: 'es_AR',
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
              type: 'image/jpeg',
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${title} | Cursala`,
          description,
          images: [imageUrl],
        },
        facebook: {
          appId: 'your-fb-app-id-here', // Opcional pero recomendado para evitar advertencias
        },
        other: {
          'image': imageUrl,
          'itemprop:image': imageUrl,
          'fb:app_id': 'your-fb-app-id-here', // ID de aplicación de Facebook para analíticas
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
      images: ['https://cursala.com.ar/images/placeholder.couse.png'],
      url: `https://cursala.com.ar/detalle-curso/${slug}`,
    }
  };
}

export default function Page({ params }: CourseDetailProps) {
  return <CourseDetailClient params={params} />;
}

