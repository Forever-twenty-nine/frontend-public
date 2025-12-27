import axios, { AxiosResponse } from "axios";

// Configuración de Bunny CDN
const BUNNY_STORAGE_CDN = "https://cursala.b-cdn.net";

export const getImages = async (
  imageFileName: string,
): Promise<AxiosResponse<Blob>> => {
  // Si ya es una URL completa, usarla directamente
  let bunnyUrl: string;
  if (imageFileName.startsWith('http://') || imageFileName.startsWith('https://')) {
    bunnyUrl = imageFileName;
  } else {
    // Construir URL directa de Bunny CDN (mismo path que frontend-private)
    bunnyUrl = `${BUNNY_STORAGE_CDN}/course-images/${imageFileName}`;
  }

  try {
    // Intentar cargar directamente desde Bunny CDN
    const resp = await axios.get(bunnyUrl, {
      headers: {
        Accept: "image/jpeg, image/png",
      },
      responseType: "blob",
    });

    if (![200, 201].includes(resp.status)) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp;
  } catch (error) {
    // Si Bunny CDN no está disponible, usar placeholder
    console.warn(`⚠️ No se pudo cargar imagen desde Bunny CDN: ${imageFileName}`, error);
    try {
      const placeholderResp = await axios.get("/images/placeholder.couse.png", {
        headers: {
          Accept: "image/jpeg, image/png",
        },
        responseType: "blob",
      });
      return placeholderResp;
    } catch (placeholderError) {
      console.error("Error: No se pudo cargar imagen ni placeholder:", placeholderError);
      throw error;
    }
  }
};

export const getStreamVideo = async (
  videoFileName: string,
  range: string,
): Promise<Response> => {
  const encodedFileName = encodeURIComponent(videoFileName);
  const directUrl = `/api/direct?path=/file/${encodedFileName}/video`;

  // Verificar si hay token de autenticación disponible
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Se requiere autenticación para acceder a este contenido");
  }

  try {
    const response = await fetch(directUrl, {
      method: "GET",
      headers: {
        Accept: "video/*",
        Authorization: `Bearer ${token}`,
        Range: range,
      },
    });

    if (![200, 206].includes(response.status)) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error obteniendo video desde direct:", error);
    throw error;
  }
};

export const getSupportMaterial = async (
  supportMaterial: string,
): Promise<AxiosResponse<Blob>> => {
  const encodedFileName = encodeURIComponent(supportMaterial);

  // Verificar si hay token de autenticación disponible
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Se requiere autenticación para descargar este material");
  }

  const directUrl = `/api/direct?path=/file/${encodedFileName}/download&auth=${encodeURIComponent(token)}`;

  try {
    const resp = await axios.get(directUrl, {
      headers: {
        Accept: "*/*",
        "Content-Disposition": "attachment",
      },
      responseType: "blob",
    });

    if (![200, 201].includes(resp.status)) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp;
  } catch (error) {
    console.error("Error obteniendo material de soporte desde direct:", error);
    throw error;
  }
};

export const getPublicFile = async (
  fileName: string,
): Promise<AxiosResponse<Blob>> => {
  const encodedFileName = encodeURIComponent(fileName);
  const directUrl = `/api/direct?path=/file/${encodedFileName}/publicdownload`;

  try {
    const resp = await axios.get(directUrl, {
      headers: {
        Accept: "*/*",
        "Content-Disposition": "attachment",
      },
      responseType: "blob",
    });

    if (![200, 201].includes(resp.status)) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp;
  } catch (error) {
    console.error("Error obteniendo archivo público desde direct:", error);
    throw error;
  }
};

export const getUserProfileImage = async (
  imageFileName: string,
): Promise<AxiosResponse<Blob>> => {
  // Construir URL directa de Bunny CDN para imágenes de perfil
  const bunnyUrl = `${BUNNY_STORAGE_CDN}/profile-images/${imageFileName}`;

  try {
    const resp = await axios.get(bunnyUrl, {
      headers: {
        Accept: "image/jpeg, image/png",
      },
      responseType: "blob",
    });

    if (![200, 201].includes(resp.status)) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp;
  } catch (error) {
    console.warn(`⚠️ No se pudo cargar imagen de perfil desde Bunny CDN: ${imageFileName}`, error);
    // Usar placeholder de perfil por defecto
    try {
      const placeholderResp = await axios.get("/images/placeholder.user.png", {
        headers: {
          Accept: "image/jpeg, image/png",
        },
        responseType: "blob",
      });
      return placeholderResp;
    } catch (placeholderError) {
      console.error("Error: No se pudo cargar imagen de perfil ni placeholder:", placeholderError);
      throw error;
    }
  }
};
