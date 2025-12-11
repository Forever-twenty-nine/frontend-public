import api from "@/utils/axiosinstance";

export const getPublicCompanyData = async () => {
  try {
    const resp = await api.get(`/api/fetch?path=/public/company-data`);

    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.data.data;
  } catch (error) {
    console.error("Error al obtener datos públicos de la compañía:", error);
    throw error;
  }
};