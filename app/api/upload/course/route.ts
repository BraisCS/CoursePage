import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(res : any) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        Requirements: true,
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    const coursesWithImages = courses.map(course => ({
      ...course,
      image: course.image ? `data:image/jpeg;base64,${Buffer.from(course.image).toString('base64')}` : null,
    }));

    res.status(200).json(coursesWithImages);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}
