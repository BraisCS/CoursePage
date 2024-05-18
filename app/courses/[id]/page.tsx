import Nav from '@/app/components/nav';
import { getServerSession } from 'next-auth';
import SelectId from './components/selectId';
import { PrismaClient } from '@prisma/client';

export default async function Page() {
  const session = await getServerSession();
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({
    include: {
      requirements: true,
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
        <SelectId courses={coursesWithImages} />
      </article>
      </>
    );
}
