import { getServerSession } from "next-auth";
import Nav from "./components/nav";
import "./globals.css"
import CourseInfo from "./homecomponents/CourseInfo";
import { PrismaClient } from '@prisma/client';
import Main from "./homecomponents/main";

export default async function Home() {
  const session = await getServerSession();
  const prisma = new PrismaClient();
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

  

  return (
    <>
      <article className="w-full flex flex-col items-center">
        <Nav session={session} /> 
        <Main coursesWithImages={coursesWithImages} />
      </article>
    </>
  );
}
