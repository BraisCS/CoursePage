import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

async function handler(request: Request) {
  const { name, email, password }: {
    name: string,
    email: string,
    password: string, 
  } = await request.json();

  const prisma = new PrismaClient();

  // Verifica si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    // Si el usuario ya existe, devuelve un error
    return new Response('Ya existe un usuario con este mismo email.', {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Generar un hash de la contraseña
  const saltRounds = 10; // Puedes ajustar la complejidad del hash aquí
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Crear el usuario con la contraseña encriptada
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash, // Guarda el hash de la contraseña, no la contraseña plana
    }
  });

  // Devuelve el usuario creado, omitiendo la contraseña
  const { password: _, ...userData } = user;
  return new Response(JSON.stringify(userData), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export { handler as POST };
