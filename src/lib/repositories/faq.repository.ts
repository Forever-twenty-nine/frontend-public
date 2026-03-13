import { FAQ, IFAQ } from "@models/mongo/faq.model";
import mongoose from "mongoose";

class FAQRepository {
  private readonly model = FAQ;

  constructor() {}

  /**
   * Devuelves todas las preguntas frecuentes de la base de datos
   * @param activeOnly Indica si se deben recuperar solo las preguntas frecuentes activas
   * @returns Array de preguntas frecuentes
   */
  async getFAQs(activeOnly: boolean = false): Promise<IFAQ[]> {
    const filter = activeOnly ? { isActive: true } : {};
    const res = await this.model
      .find(filter)
      .sort({ category: 1, order: 1 })
      .exec();
    return res as unknown as IFAQ[];
  }

}

export default FAQRepository;
