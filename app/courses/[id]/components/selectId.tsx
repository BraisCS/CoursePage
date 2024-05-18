

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
      <div className='w-full flex flex-row justify-start items-stretch '>
        <div className='w-1/2 px-5 flex flex-col justify-evenly items-start'>
            <p className='font-DMSans font-semibold text-[#FFF] text-3xl'>{selectedCourse.title}</p>
            <p className='font-DMSans font-normal text-[#FFF] text-xl'>{selectedCourse.introduction}</p>
            <a className='px-5 py-2 bg-Light-Purple hover:bg-Light-Green rounded-md font-DMSans font-normal text-Dark text-xl cursor-pointer'>
              {selectedCourse.category}
            </a>
        </div>
        {selectedCourse.image ? (
        <div className="w-1/2 h-full">
            <Image 
              height={2400} 
              width={2400} 
              alt='Imagen de curso' 
              src={selectedCourse.image} 
              className=' h-72 object-cover'
            />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200 text-gray-600">
            Imagen no disponible
          </div>
        )}
        </div>
        <div className='w-[80%] flex flex-col justify-start items-start gap-3'>
          <p className='font-DMSans font-semibold text-[#FFF] text-2xl'>Requisitos:</p>
          <ul>
            {selectedCourse.requirements.map((req) => (
              <li key={req.id} className='font-DMSans font-normal text-[#FFF] text-xl'>- {req.title}</li>
            ))}
          </ul>
          <p className='font-DMSans font-semibold text-[#FFF] text-2xl'>Precio:</p>
          <p className='font-DMSans font-normal text-[#FFF] text-xl'>{selectedCourse.price}€</p>
          <p className='font-DMSans font-semibold text-[#FFF] text-2xl'>Módulos:</p>
          <ul>
            {selectedCourse.modules.map((module) => (
              <li key={module.id} className='font-DMSans font-normal text-[#FFF] text-xl'>
                - {module.title}
                <ul className='ml-4'>
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className='font-DMSans font-light text-[#FFF] text-lg'>
                      * {lesson.title}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
    </main>
  );
}
