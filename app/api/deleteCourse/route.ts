import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    console.log('Received ID in API:', id); // Log para verificar el ID recibido

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const courseId = Number(id);
    if (isNaN(courseId) || courseId <= 0) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Eliminar dependencias
    await prisma.qandr.deleteMany({ where: { courseId } });
    await prisma.requirements.deleteMany({ where: { courseId } });
    await prisma.lesson.deleteMany({
      where: {
        module: {
          courseId
        }
      }
    });
    await prisma.module.deleteMany({ where: { courseId } });

    // Eliminar el curso
    await prisma.course.delete({ where: { id: courseId } });

    return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
