import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { iWantToTrainService } from '@/lib/services';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // El servicio maneja la creación en DB y el envío de emails
    const result = await iWantToTrainService.create(body);
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Solicitud de formación recibida correctamente'
    });
  } catch (error: any) {
    console.error('Error in IWantToTrain API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
