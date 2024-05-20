"use client";
import Link from 'next/link';
import Image from 'next/image';
import CourseGlassphormish from './courseGlassphormish';

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
export default function CourseInfo({ courses }: { courses: Course[] }) {
  const recentCourses = courses.slice(1, 4);

  return (
    <div className="flex flex-col justify-start items-center gap-4 relative group w-full">
      {recentCourses.map(course => (
        <a href={`/courses/${course.id}`} key={course.id} className="w-full lg:w-[90%] h-44 rounded-md bg-[#a4f1658f] hover:bg-Light-Green border border-[#fff] flex flex-row justify-evenly items-center shadow-lg hover:shadow-xl transition-all transition-transform-[500ms]  hover:scale-x-105   " >
          {course.image && (
            <div  className='w-[20%] h-44 flex flex-row items-center'>
              <Image height={1200} width={1200} src={course.image} alt={`Imagen del curso ${course.title}`} className="w-full h-[85%] object-cover rounded-md" />
            </div>
          )}
          <CourseGlassphormish course={course} />
        </a>
      ))}
    </div>
  );
}
