import api from "@/utils/axiosinstance";

export const getPublishedCourses = async () => {
  try {
    const resp = await api.get(`/api/fetch?path=/courses/public`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 201 && resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const result = await resp.data;
    return result;
  } catch (error) {
    console.error("Error getting published courses:", error);
    throw error;
  }
};

export const getVisibleCourses = async () => {
  try {
    // Para sitio público, solo obtener cursos publicados
    const resp = await api.get(`/api/fetch?path=/courses/public`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 201 && resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.data;
  } catch (error) {
    console.error("Error fetching visible courses:", error);
    throw error;
  }
};

export const getCourseById = async (id: string) => {
  try {
    const resp = await api.get(`/api/fetch?path=/course/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 201 && resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const result = await resp.data;
    return result;
  } catch (error) {
    console.error("Error getting course by id:", error);
    throw error;
  }
};

export const getClassesByCourse = async (courseId: string) => {
  try {
    const resp = await api.get(`/api/fetch?path=/classes/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 201 && resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const result = await resp.data;
    return result;
  } catch (error) {
    console.error("Error getting classes by course:", error);
    throw error;
  }
};

export const getClassById = async (classId: string) => {
  try {
    const resp = await api.get(`/api/fetch?path=/class/${classId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 201 && resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const result = await resp.data;
    return result;
  } catch (error) {
    console.error("Error getting class by id:", error);
    throw error;
  }
};

export const getClassVideo = async (videoFileName: string) => {
  try {
    const resp = await api.get(`/api/fetch?path=/class/video/${videoFileName}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.data;
  } catch (error) {
    console.error("Error getting class video:", error);
    throw error;
  }
};

export const isCourseAccessible = async (courseId: string) => {
  try {
    const resp = await api.get(`/api/fetch?path=/course/${courseId}/accessible`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.data;
  } catch (error) {
    console.error("Error checking course accessibility:", error);
    throw error;
  }
};

export const getCoursesOnHome = async () => {
  try {
    // Para sitio público, obtener cursos publicados en home
    const resp = await api.get(`/api/fetch?path=/courses/home`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.data;
  } catch (error) {
    console.error("Error fetching courses for home:", error);
    throw error;
  }
};