import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    // Asume que `imageUrl` es un campo en tus modelos de curso
    const courses = await prisma.course.findMany({
      include: {
        Requirements: true, // Incluye los requirements si también los necesitas
      },
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los cursos' });
  }
}
