import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { businessTrainingService } from '@/lib/services';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // El servicio maneja la creación en DB y el envío de emails (vía Ethereal en dev)
    const result = await businessTrainingService.create(body);
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Solicitud de capacitación empresarial recibida correctamente'
    });
  } catch (error: any) {
    console.error('Error in BusinessTraining API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
