import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { requestACourseService } from '@/lib/services';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // El servicio maneja la creación en DB y el envío de emails
    const result = await requestACourseService.create(body);
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Solicitud de curso recibida correctamente'
    });
  } catch (error: any) {
    console.error('Error in RequestACourse API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
