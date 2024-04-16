import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import Nav from "../components/nav";
import ShowCourses from "./components/showCourses";

export default async function page() {
  const session = await getServerSession();
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({
    include: {
      Requirements: true,
      modules: {
        include: {
          lessons: true, // Incluye las lecciones dentro de cada módulo
        },
      },
    },
  });

  return (
    <>
      <article className="w-full flex flex-col items-center">
        <Nav session={session} />
        <main className="w-full flex flex-col justify-start items-center gap-10 mt-10">
          <ShowCourses courses={courses} />
        </main>
      </article>
    </>
  );
}
