import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CourseService from '@/lib/services/course.service';

const courseService = new CourseService();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const course = await courseService.findOnePublic(id);
    
    if (!course) {
      return NextResponse.json({ success: false, message: 'Curso no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: course,
      message: 'Detalle del curso obtenido exitosamente'
    });
  } catch (error: any) {
    console.error('Error fetching course by ID:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
