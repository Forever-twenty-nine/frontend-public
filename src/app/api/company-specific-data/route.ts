import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CompanySpecificDataService from '@/lib/services/companySpecificData.service';
import CompanySpecificDataRepository from '@/lib/repositories/companySpecificData.repository';

// Inicializar repositorio y servicio
const companyRepository = new CompanySpecificDataRepository();
const companyService = new CompanySpecificDataService(companyRepository);

export async function GET() {
  try {
    await dbConnect();
    const data = await companyService.getPublicCompanyData();
    
    return NextResponse.json({
      success: true,
      data: data,
      message: 'Datos de la compañía obtenidos exitosamente'
    });
  } catch (error: any) {
    console.error('Error fetching company data:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
