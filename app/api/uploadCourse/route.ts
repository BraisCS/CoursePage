import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: any) {
  const data = await request.formData();
  const title = data.get("title");
  const introduction = data.get("introduction");
  const category = data.get("category");
  const price = parseFloat(data.get("price"));
  const imageFile = data.get("image");

  // Convertir la imagen a Buffer
  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

  try {
    // Crear el curso con la imagen como un campo binario
    const course = await prisma.course.create({
      data: {
        title,
        introduction,
        category,
        price,
        image: imageBuffer,  // Guardar el buffer directamente en la base de datos
      },
    });

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
