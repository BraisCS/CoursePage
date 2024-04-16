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
  lessons: Lesson[]; // Asegúrate de que esta propiedad coincida con la estructura de datos.
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
  Requirements: Requirement[];
  modules: Module[]; // Cambiado a minúsculas para coincidir con los datos.
  imageUrl: string | null;
  price: number;
}

export default function ShowCourses({ courses }: { courses: Course[] }) {
  const coursesState = courses; 

  const deleteCourse = async (id: number): Promise<void> => {
    // Lógica de eliminación (No implementada aquí).
  };

  return (
    <>
      {coursesState.map((course) => (
        <div key={course.id} className="w-[90%] bg-Light-Orange px-3 py-2 rounded-md">
          {course.imageUrl && (
            <Image
              src={course.imageUrl}
              alt={course.title}
              width={1200}
              height={1200}
              layout="responsive"
            />
          )}
          <p className="text-[#ffffff] text-center">{course.title}</p>
          <p className="text-[#ffffff] text-center">{course.category}</p>
          <p className="text-[#ffffff] text-center">{course.price}</p>

          {course.Requirements && course.Requirements.length > 0 && (
            <div className="text-[#ffffff]">
              <p>Requisitos mínimos: </p>
              <ul>
                {course.Requirements.map((requirement, reqIndex) => (
                  <li key={requirement.id}>{requirement.title}</li>
                ))}
              </ul>
            </div>
          )}

          {course.modules && course.modules.length > 0 && (
            <div className="text-[#ffffff]">
              <p>Módulos del curso:</p>
              {course.modules.map((module) => (
                <div key={module.id}>
                  <p className=' text-[#fff]'>{module.title}</p>
                  {module.lessons && module.lessons.length > 0 && (
                    <ul>
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li className=' text-[#fff]' key={lesson.id}>{lesson.title}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          <button onClick={() => deleteCourse(course.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Eliminar
          </button>
        </div>
      ))}
    </>
  );
}
