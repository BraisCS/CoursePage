import { getServerSession } from "next-auth";
import Nav from "./components/nav";
import "./globals.css"
import CourseInfo from "./homecomponents/CourseInfo";
import { PrismaClient } from '@prisma/client';

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
        <main className="w-[95%] lg:w-[90%] flex flex-col justify-start items-center mt-10">
          <div className="w-full px-3 py-2 rounded-md">
            <p className="text-[#ffffff] font-DMSans font-normal text-xl text-center">Descubre el mundo de la programación con nuestra aplicación. Ofrecemos una amplia gama de cursos de programación que te permitirán adquirir nuevas habilidades o perfeccionar las que ya tienes. Desde principiantes hasta expertos, hay algo para todos. ¡Empieza tu viaje de aprendizaje con nosotros hoy mismo!</p>
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-evenly items-center gap-10 mt-10">
            <div className=" flex flex-col items-start gap-5 bg-Light-Green hover:bg-Light-Purple cursor-pointer rounded-lg px-3 py-2 w-[95%] lg:w-[30%]">
              <h2 className=" text-2xl font-DMSans font-bold text-[#000] text-center w-full">Paquete gratuito</h2>
              <p className=" text-base font-DMSans font-normal text-[#000]">Válido por 30 días </p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Solo permite un curso por semana</p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> No obtendras un certificado</p>
            </div>
            <div className=" flex flex-col items-start gap-5 bg-Light-Green hover:bg-Light-Purple cursor-pointer rounded-lg px-3 py-2 w-[95%] lg:w-[30%]">
              <h2 className=" text-2xl font-DMSans font-bold text-[#000] text-center w-full">Paquete mensual</h2>
              <p className=" text-base font-DMSans font-normal text-[#000]"> 35€ </p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Podras realizar todos los cursos que necesites</p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Obtendras un certificado</p>
            </div>
            <div className=" flex flex-col items-start gap-5 bg-Light-Green hover:bg-Light-Purple cursor-pointer rounded-lg px-3 py-2 w-[95%] lg:w-[30%]">
              <h2 className=" text-2xl font-DMSans font-bold text-[#000] text-center w-full">Paquete anual</h2>
              <p className=" text-base font-DMSans font-normal text-[#000]"> 100€ </p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Podras realizar todos los cursos que necesites</p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Obtendras un certificado</p>
            </div>
        </div>
        <div className="h-16 w-[90%] border-b border-b-Light-Purple  flex flex-row justify-between items-center lg:block"></div>
        <div className="w-full flex flex-col justify-start items-center px-3 py-2 rounded-md mt-10">
          <p className="text-[#ffffff] font-DMSans font-normal text-xl text-center">Cursos más recientes</p>
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-5  w-full mt-10">
            <CourseInfo courses={coursesWithImages} /> 
          </div>
        </div>
      </main>
      </article>
    </>
  );
}
