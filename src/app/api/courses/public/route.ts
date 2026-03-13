import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CourseService from '@/lib/services/course.service';

const courseService = new CourseService();

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '10');
    
    // Obtenemos cursos publicados
    const { items, total } = await courseService.findPublished(page, size);
    
    return NextResponse.json({
      success: true,
      data: items,
      total,
      message: 'Cursos obtenidos exitosamente'
    });
  } catch (error: any) {
    console.error('Error fetching public courses:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
