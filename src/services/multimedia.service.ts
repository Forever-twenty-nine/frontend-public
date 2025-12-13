import axios, { AxiosResponse } from "axios";

export const getImages = async (
  imageFileName: string,
): Promise<AxiosResponse<Blob>> => {
  const encodedFileName = encodeURIComponent(imageFileName);
  const cacheBreaker = Math.floor(Date.now() / 60000); // Invalida cada minuto
  const directUrl = `/api/direct?path=/file/${encodedFileName}/image&cb=${cacheBreaker}`;

  try {
    // Intentar cargar desde Bunny CDN vía backend
    const resp = await axios.get(directUrl, {
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
    // Esto es normal en desarrollo local
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
  const encodedFileName = encodeURIComponent(imageFileName);
  const cacheBreaker = Math.floor(Date.now() / 60000);
  const directUrl = `/api/direct?path=/user/${encodedFileName}/image&cb=${cacheBreaker}`;

  try {
    const resp = await axios.get(directUrl, {
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
    console.error(
      "Error obteniendo imagen de perfil de usuario desde direct:",
      error,
    );
    throw error;
  }
};
