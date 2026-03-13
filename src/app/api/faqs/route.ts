import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FAQService from '@/lib/services/faq.service';
import FAQRepository from '@/lib/repositories/faq.repository';

// Inicializar repositorio y servicio
const faqRepository = new FAQRepository();
const faqService = new FAQService(faqRepository);

export async function GET() {
  try {
    await dbConnect();
    // Obtenemos solo las FAQs activas para el público
    const faqs = await faqService.getAllFAQs(true);
    
    // El frontend espera un objeto con { success, data, message }
    // o directamente los datos dependiendo de cómo esté implementado el servicio del frontend.
    // Revisando faq.service.ts del frontend, getAllFAQs hace api.get('/faqs') y luego usa response.data.
    // Si queremos ser consistentes con la estructura del backend original:
    return NextResponse.json({
      success: true,
      data: faqs,
      message: 'Preguntas frecuentes obtenidas exitosamente'
    });
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
