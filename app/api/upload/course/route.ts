import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs';
import { promisify } from 'util';
import path from 'path';

// Inicializa el cliente de Prisma
const prisma = new PrismaClient();

const writeFileAsync = promisify(writeFile);

export async function POST(request: any) {
  
  const data = await request.formData();
  const title = data.get("title");
  const introduction = data.get("introduction");
  const category = data.get("category");
  const price = parseFloat(data.get("price"));
  const image = data.get("image");
  
  // Parsear requisitos y módulos desde el formulario
  const requirementsData = data.get("requirements");
  let requirements = requirementsData ? JSON.parse(requirementsData) : [];
  
  const moduleData = data.get("modules");
  let modules = moduleData ? JSON.parse(moduleData) : [];
  
  // Procesar la imagen
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const imageName = `${Date.now()}-${image.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", imageName);

  await writeFileAsync(filePath, buffer);

  try {
    // Crea el curso junto con sus requisitos y módulos (incluyendo lecciones)
    const course = await prisma.course.create({
      data: {
        title,
        introduction,
        category,
        price,
        imageUrl: `/uploads/${imageName}`,
        Requirements: {
          create: requirements.map((req : any)  => ({
            title: req,
          })),
        },
        modules: {
          create: modules.map((mod : any) => ({
            title: mod.title,
            lessons: {
              create: mod.lessons.map((lesson : any) => ({
                title: lesson.title,
              })),
            },
          })),
        },
      },
    });
    
    console.log(course);
    
    return new Response(JSON.stringify({ message: "Curso creado con éxito", course }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error al crear el curso:", error);
    return new Response(JSON.stringify({ message: "Error al crear el curso" }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}