"use client"
import Image from 'next/image';


interface Lesson {
  id: number;
  title: string;
  moduleId?: number;
}

interface Module {
  id: number;
  title: string;
  courseId?: number;
  lessons: Lesson[];
}

interface Requirement {
  id: number;
  title: string;
  courseId?: number;
}

interface Course {
  id: number;
  title: string;
  category: string;
  requirements: Requirement[];
  modules: Module[];
  image: string | null;  // Asumiendo que siempre se envía una URL en Base64 o null
  price: number;
}

export default function ShowCourses({ courses } : { courses: Course[] }) {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id} className="w-[90%] bg-Light-Orange px-3 py-2 rounded-md">
          {course.image && (
            <Image
              src={course.image}
              alt={course.title}
              width={1200}
              height={1200}
              layout="responsive"
            />
          )}
          <p className="text-[#ffffff] text-center">{course.title}</p>
          <p className="text-[#ffffff] text-center">{course.category}</p>
          <p className="text-[#ffffff] text-center">${course.price}</p>
        </div>
      ))}
    </>
  );
}
