

"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
}

export default function SelectId({ courses }: { courses: Course[] }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (courses) {
      const path = window.location.pathname;
      const id = parseInt(path.split('/').pop() || '0', 10);

      // Filtrar el curso basado en el ID obtenido de la URL
      const course = courses.find(course => course.id === id);
      setSelectedCourse(course || null);
    }
  }, [courses]);

  if (!selectedCourse) {
    return <p>No se encontró el curso.</p>;
  }

  return (
    <main className='w-[90%] mt-10'>
      <div className='w-full flex flex-row justify-between items-stretch '>
        <div className='w-1/2 px-5 flex flex-col justify-evenly items-start'>
            <p className='font-DMSans font-semibold text-[#FFF] text-3xl'>{selectedCourse.title}</p>
            <p className='font-DMSans font-normal text-[#FFF] text-xl'>{selectedCourse.introduction}</p>
            <p className='font-DMSans font-normal text-[#FFF] text-xl'>El precio del curso es de {selectedCourse.price}€</p>
            <a className='px-5 py-2 bg-Light-Purple hover:bg-Light-Green rounded-md font-DMSans font-normal text-Dark text-xl cursor-pointer'>
              {selectedCourse.category}
            </a>
        </div>
        {selectedCourse.image ? (       
            <Image 
              height={2400} 
              width={2400} 
              alt='Imagen de curso' 
              src={selectedCourse.image} 
              className='h-72 w-[39%] object-cover rounded-md'
            />
        ) : (
        <div className="w-full h-full flex justify-center items-center bg-gray-200 text-gray-600">
            Imagen no disponible
          </div>
        )}
      </div>

        <div className='w-full flex flex-col justify-start items-start mt-5 px-5'>
          <div className=" h-1 w-[100%] border-b top-0 left-0 bg-fade-to-b border-b-Light-Purple  flex flex-row justify-between items-center lg:block mt-5"></div>
          <div className='flex flex-row justify-start items-start w-full'>
            <div className='flex flex-col justify-start items-start w-1/2 mt-5 gap-3'>
              <p className='font-DMSans font-semibold text-[#FFF] text-3xl '>Requisitos</p>
              <ul>
                {selectedCourse.requirements.map((req) => (
                  <li key={req.id} className='font-DMSans font-normal text-[#FFF] text-xl'>- {req.title}</li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col justify-start items-start w-1/2 mt-5 gap-3'>
              <p className='font-DMSans font-semibold text-[#FFF] text-3xl'>Módulos</p>
              <ul>
                {selectedCourse.modules.map((module) => (
                  <li key={module.id} className='font-DMSans font-normal text-[#FFF] text-xl'>
                    - {module.title}
                    <ul className='ml-4'>
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id} className='font-DMSans font-normal text-[#FFF] text-lg'>
                          * {lesson.title}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
          
        </div>
    </main>
  );
}
