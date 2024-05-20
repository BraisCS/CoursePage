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

      console.log('Extracted ID from URL:', id); // Log para verificar el ID

      // Verifica que el ID sea un número válido
      if (!isNaN(id) && id > 0) {
        const course = courses.find(course => course.id === id);
        setSelectedCourse(course || null);
        console.log('Selected Course:', course); // Log para verificar el curso seleccionado
      }
    }
  }, [courses]);

  const handleDelete = async () => {
    if (!selectedCourse) {
      alert('No se encontró el curso.');
      return;
    }

    console.log('Deleting Course ID:', selectedCourse.id); // Log para verificar el ID del curso a eliminar

    try {
      const response = await fetch(`/api/deleteCourse`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedCourse.id }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el curso');
      }

      alert('Curso eliminado con éxito');
      window.location.href = '/'; // Redirigir a la página principal
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
      alert('Error al eliminar el curso');
    }
  };

  if (!selectedCourse) {
    return <p>No se encontró el curso.</p>;
  }

  return (
    <main className='w-[90%] mt-10'>
      <div className='w-full flex flex-row justify-between items-stretch'>
        <div className='w-1/2 px-5 flex flex-col justify-between items-start'>
          <p className='font-DMSans font-semibold text-[#FFF] text-3xl'>{selectedCourse.title}</p>
          <p className='font-DMSans font-normal text-[#FFF] text-xl'>{selectedCourse.introduction}</p>
          <div className='flex flex-col justify-start items-start gap-3'>
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
        {selectedCourse.image ? (
          <div className='flex flex-col w-1/2'>
            <Image
              height={2400}
              width={2400}
              alt='Imagen de curso'
              src={selectedCourse.image}
              className='h-72 w-full object-cover rounded-md'
            />
            <div className='w-full flex flex-col justify-start gap-5 bg-[#ffffff5d] py-6 rounded-md'>
              <div className='w-full flex flex-row justify-evenly'>
                <p className='font-DMSans font-normal text-[#FFF] text-3xl'>{selectedCourse.category}</p>
                <p className='font-DMSans font-normal text-[#FFF] text-3xl'>{selectedCourse.price}€</p>
              </div>
              <div className='w-full flex flex-row justify-evenly'>
                <a className='px-5 py-2 bg-Light-Purple hover:bg-Light-Green rounded-md font-DMSans font-normal text-Dark text-xl cursor-pointer'>
                  Comprar curso
                </a>
                <a className='px-5 py-2 bg-Light-Purple hover:bg-Light-Green rounded-md font-DMSans font-normal text-Dark text-xl cursor-pointer'>
                  Guardar curso
                </a>
                <button
                  onClick={handleDelete}
                  className='px-5 py-2 bg-Light-Purple hover:bg-[#d24141] rounded-md font-DMSans font-normal text-Dark text-xl cursor-pointer'
                >
                  Eliminar curso
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200 text-gray-600">
            Imagen no disponible
          </div>
        )}
      </div>
      <div className='w-full flex flex-col justify-start items-start mt-5 px-5'>
        <div className="h-1 w-[100%] border-b top-0 left-0 bg-fade-to-b border-b-Light-Purple flex flex-row justify-between items-center lg:block mt-5"></div>
        <div className='flex flex-row justify-start items-start w-full'>
          <div className='flex flex-col justify-start items-start w-1/2 mt-5 gap-3'>
            <p className='font-DMSans font-semibold text-[#FFF] text-3xl'>Requisitos</p>
            <ul>
              {selectedCourse.requirements.map((req) => (
                <li key={req.id} className='font-DMSans font-normal text-[#FFF] text-xl'>- {req.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
