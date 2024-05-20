"use client"
import CourseInfo from "./CourseInfo";

interface Requirement {
  id: number;
  title: string;
}

interface Lesson {
  id: number;
  title: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  category: string;
  image: string | null;
  price: number;
  introduction: string;
  requirements: Requirement[];
  modules: Module[];
  updatedAt: Date;
}

export default function Main({coursesWithImages} : { coursesWithImages: Course[] }) {

  return (
    <>
      <main className={`w-[95%] bg lg:w-[100%] flex flex-col justify-start items-center py-10`}>
        <div className="w-[90%] px-3 py-2 rounded-md">
          <p className="text-[#ffffff] font-DMSans font-normal text-xl text-center">Descubre el mundo de la programación con nuestra aplicación. Ofrecemos una amplia gama de cursos de programación que te permitirán adquirir nuevas habilidades o perfeccionar las que ya tienes. Desde principiantes hasta expertos, hay algo para todos. ¡Empieza tu viaje de aprendizaje con nosotros hoy mismo!</p>
        </div>
        <div className="flex flex-row justify-between items-center lg:block mt-5"></div>
        <div className={` bg-Dark  w-full flex flex-col justify-start items-center px-3 py-10`}>
          <div className="flex flex-col justify-evenly items-center gap-5 py-10 w-[90%] rounded-md">
            <CourseInfo courses={coursesWithImages} /> 
          </div>
        </div>
      </main>
    </>
  );
}