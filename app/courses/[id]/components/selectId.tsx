"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Course {
  id: number;
  title: string;
  category: string;
  image: string | null;
  price: number;
}
export default function SelectId({ courses }: { courses: Course[] }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  useEffect(() => {
    if (courses) {
      const path = window.location.pathname;
      const id = parseInt(path.split('/').pop() || '0', 10);
      
      // Filtrar el curso basado en el ID obtenido de la URL
      const course : any = courses.find(course => course.id === id);
      setSelectedCourse(course);
    }
  }, [courses]);

  if (!selectedCourse) {
    return <p>No se encontró el curso.</p>;
  }

  return (
    <main className='flex flex-col justify-start items-center w-[90%] mt-10'>
        {selectedCourse.image ? (
        <Image 
            height={1200} 
            width={1200} 
            alt='Imagen de curso' 
            src={selectedCourse.image} 
        />
        ) : (
        <div className="placeholder-image">Imagen no disponible</div>
        )}        
        <h1 className='font-DMSans font-bold text-[#FFF] text-2xl'> Informacion sobre el curso: </h1>
        <p className='font-DMSans font-semibold text-[#FFF] text-2xl'>{selectedCourse.id}</p>
        <p className='font-DMSans font-semibold text-[#FFF] text-2xl'>{selectedCourse.title}</p>
        <p className='font-DMSans font-semibold text-[#FFF] text-2xl'>{selectedCourse.category}</p>
        <p className='font-DMSans font-semibold text-[#FFF] text-2xl'>{selectedCourse.price}€</p>
    </main>
  );
}
