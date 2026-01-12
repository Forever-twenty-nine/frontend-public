import api from "@/utils/axiosinstance";

export interface IFAQ {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface IFaqResponse {
  success: boolean;
  data: IFaqItem[];
  message: string;
}

/**
 * Cache para las preguntas frecuentes
 */
let cachedFaqItems: IFaqItem[] | null = null;


/**
 * Obtiene todas las preguntas frecuentes.
 * @returns Promesa con el array de preguntas frecuentes
 */
export const getFaqItems = async (): Promise<IFaqResponse> => {
  // Devuelve cache si existe
  if (cachedFaqItems) {
    return {
      success: true,
      data: cachedFaqItems,
      message: 'Preguntas frecuentes (cache)'
    };
  }

  try {
    const response = await getAllFAQs();
    const data = response.data || [];

    const convertedData: IFaqItem[] = data.map((faq: IFAQ) => ({
      id: faq._id || '',
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    }));

    cachedFaqItems = convertedData;

    return {
      success: true,
      data: convertedData,
      message: response.message || 'Preguntas frecuentes obtenidas exitosamente'
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: 'Error al obtener las preguntas frecuentes'
    };
  }
};


/**
 * Constante que obtiene todas las preguntas frecuentes desde la API.
 */
const getAllFAQs = async () => {
  const response = await api.get(`/api/v1/faqs`);
  return response.data;
};

export const clearFaqCache = () => {
  cachedFaqItems = null;
};

