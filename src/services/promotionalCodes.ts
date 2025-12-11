import api from "@/utils/axiosinstance";

// Respuesta para cursos con promociones activas
export type CoursesWithActivePromotions = Record<string, boolean>;

/**
 * Consulta qué cursos tienen promociones activas
 * @param courseIds Array de IDs de cursos a consultar
 * @returns Objeto con courseId: boolean indicando si tiene promoción activa
 */
export const getCoursesWithActivePromotions = async (
  courseIds: string[],
): Promise<CoursesWithActivePromotions> => {
  // En desarrollo, deshabilitar temporalmente las promociones para evitar errores
  if (process.env.NODE_ENV === 'development') {
    return {};
  }

  try {
    const response = await api.post(
      "/api/fetch?path=/promotional-codes/courses-with-active",
      {
        courseIds,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data.data as CoursesWithActivePromotions;
  } catch (error: any) {
    console.error("Error al consultar cursos con promociones activas:", error);
    // Fallback seguro - retornar objeto vacío
    return {};
  }
};
