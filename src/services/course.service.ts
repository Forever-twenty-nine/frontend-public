import api from "@/utils/axiosinstance";

/**
 * Obtiene cursos publicados con soporte opcional de paginación y filtros.
 * Mapea al endpoint backend: GET /api/v1/courses/public
 */
export const getPublishedCourses = async (
  page?: number,
  size?: number,
  filters?: Record<string, any>,
) => {
  try {
    const params: Record<string, any> = {};
    if (typeof page === "number") params.page = page;
    if (typeof size === "number") params.size = size;
    if (filters && typeof filters === "object") {
      Object.keys(filters).forEach((k) => {
        params[k] = filters[k];
      });
    }

    const resp = await api.get(`/api/v1/courses/public`, {
      headers: {
        "Content-Type": "application/json",
      },
      params,
    });

    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.data;
  } catch (error) {
    console.error("Error obteniendo cursos publicados:", error);
    throw error;
  }
};

/**
 * Obtiene un curso público por ID.
 * Endpoint backend: GET /api/v1/courses/public/:id
 */
export const getCourseById = async (id: string) => {
  try {
    const resp = await api.get(`/api/v1/courses/public/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.data;
  } catch (error) {
    console.error("Error obteniendo curso por ID:", error);
    throw error;
  }
};

/**
 * Obtiene cursos destacados para la página de inicio.
 * Endpoint backend: GET /api/v1/courses/home
 */
export const getCoursesOnHome = async () => {
  try {
    const resp = await api.get(`/api/v1/courses/home`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.data;
  } catch (error) {
    console.error("Error obteniendo cursos para la página de inicio:", error);
    throw error;
  }
};
