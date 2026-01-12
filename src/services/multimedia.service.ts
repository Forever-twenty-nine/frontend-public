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


export const getPublicFile = async (
  fileName: string,
): Promise<AxiosResponse<Blob>> => {
  // Soportar principalmente URLs completas hacia Bunny CDN; si no es URL, construir ruta CDN
  let bunnyUrl: string;
  if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
    bunnyUrl = fileName;
  } else {
    bunnyUrl = `${BUNNY_STORAGE_CDN}/${fileName}`;
  }

  try {
    const resp = await axios.get(bunnyUrl, {
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
    console.error("Error obteniendo archivo público desde Bunny CDN:", error);
    throw error;
  }
};

export const getUserProfileImage = async (
  imageFileName: string,
): Promise<AxiosResponse<Blob>> => {
  // Si ya es una URL completa, usarla directamente
  if (imageFileName.startsWith('http://') || imageFileName.startsWith('https://')) {
    try {
      const resp = await axios.get(imageFileName, {
        headers: {
          Accept: "image/jpeg, image/png",
        },
        responseType: "blob",
        validateStatus: (status) => status === 200 || status === 201,
      });

      if ([200, 201].includes(resp.status)) {
        return resp;
      }
    } catch (error) {
      console.warn(`⚠️ No se pudo cargar imagen de perfil desde URL completa: ${imageFileName}`, error);
      // Continuar con el flujo normal para intentar otras opciones
    }
  }

  // Si el nombre del archivo está vacío o es null, usar placeholder
  if (!imageFileName || imageFileName.trim() === '') {
    try {
      const placeholderResp = await axios.get("/images/placeholder.user.png", {
        headers: {
          Accept: "image/jpeg, image/png",
        },
        responseType: "blob",
      });
      return placeholderResp;
    } catch (placeholderError) {
      console.error("Error: No se pudo cargar placeholder:", placeholderError);
      throw placeholderError;
    }
  }

  // Intentar primero con el nombre original (puede que ya tenga el prefijo o que el archivo exista sin él)
  const tryLoadImage = async (fileName: string): Promise<AxiosResponse<Blob> | null> => {
    try {
      const bunnyUrl = `${BUNNY_STORAGE_CDN}/profile-images/${encodeURIComponent(fileName)}`;
      const resp = await axios.get(bunnyUrl, {
        headers: {
          Accept: "image/jpeg, image/png",
        },
        responseType: "blob",
        validateStatus: (status) => status === 200 || status === 201,
      });

      if ([200, 201].includes(resp.status)) {
        return resp;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  // Intentar primero con el nombre original
  let resp = await tryLoadImage(imageFileName);
  if (resp) {
    return resp;
  }
  // Si el nombre original no tiene el prefijo "profile-", intentar agregándolo
  if (!imageFileName.startsWith('profile-')) {
    const withPrefix = `profile-${imageFileName}`;
    resp = await tryLoadImage(withPrefix);
    if (resp) {
      return resp;
    }
  }

  // Si todo falla, usar placeholder
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
    throw new Error(`No se pudo cargar la imagen de perfil: ${imageFileName}`);
  }
};
