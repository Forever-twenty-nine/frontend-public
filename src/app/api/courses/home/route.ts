import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CourseService from '@/lib/services/course.service';

const courseService = new CourseService();

export async function GET() {
  try {
    await dbConnect();
    const courses = await courseService.findForHome();
    return NextResponse.json({
      success: true,
      data: courses,
      message: 'Cursos de inicio obtenidos exitosamente'
    });
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
