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

// Legacy interfaces for backward compatibility (if needed)
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
 * Get all FAQs
 * @param activeOnly Whether to retrieve only active FAQs
 * @returns Promise with FAQs array
 */
export const getAllFAQs = async (activeOnly: boolean = false) => {
  const response = await api.get(`/api/fetch?path=/faqs?activeOnly=${activeOnly}`);
  return response.data;
};

/**
 * Get FAQs by category
 * @param category FAQ category
 * @param activeOnly Whether to retrieve only active FAQs
 * @returns Promise with FAQs array
 */
export const getFAQsByCategory = async (category: string, activeOnly: boolean = false) => {
  const response = await api.get(`/api/fetch?path=/faqs/category/${encodeURIComponent(category)}?activeOnly=${activeOnly}`);
  return response.data;
};

/**
 * Get FAQ by ID
 * @param id FAQ ID
 * @returns Promise with FAQ object
 */
export const getFAQById = async (id: string) => {
  const response = await api.get(`/api/fetch?path=/faqs/${id}`);
  return response.data;
};

/**
 * Get all unique categories
 * @returns Promise with categories array
 */
export const getFAQCategories = async () => {
  const response = await api.get('/api/fetch?path=/faqs/categories');
  return response.data;
};

// Legacy functions for backward compatibility
export const getFaqItems = async (): Promise<IFaqResponse> => {
  try {
    const response = await getAllFAQs(true); // Get only active FAQs
    const data = response.data || [];
    
    const convertedData: IFaqItem[] = data.map((faq: IFAQ) => ({
      id: faq._id || '',
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    }));

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

export const getFaqByCategory = async (category: string): Promise<IFaqResponse> => {
  try {
    const response = await getFAQsByCategory(category, true);
    const data = response.data || [];
    
    const convertedData: IFaqItem[] = data.map((faq: IFAQ) => ({
      id: faq._id || '',
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    }));

    return {
      success: true,
      data: convertedData,
      message: response.message || `Preguntas frecuentes de la categoría "${category}" obtenidas exitosamente`
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error al obtener las preguntas frecuentes de la categoría "${category}"`
    };
  }
};

export const searchFaq = async (query: string): Promise<IFaqResponse> => {
  try {
    const response = await getAllFAQs(true);
    const allFaqs = response.data || [];
    
    const filteredData = allFaqs.filter((faq: IFAQ) =>
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase())
    );

    const convertedData: IFaqItem[] = filteredData.map((faq: IFAQ) => ({
      id: faq._id || '',
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    }));

    return {
      success: true,
      data: convertedData,
      message: `Búsqueda de FAQ completada para: "${query}"`
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error en la búsqueda de FAQ para: "${query}"`
    };
  }
};