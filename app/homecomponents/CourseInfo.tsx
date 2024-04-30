import Image from "next/image";

interface Course {
    id: number;
    title: string;
    category: string;
    image: string | null; 
    price: number;
  }
  
export default function CourseInfo({ courses }: { courses: Course[] }) {

    const recentCourses = courses.slice(0, 3);
  
    return (
    <>
        {recentCourses.map(course => (
        <div key={course.id} className="bg-Light-Orange w-[30%] h-auto p-2 rounded-md">
            {course.image ? (
                <Image height={1200} width={1200} src={course.image} alt="Imagen del curso" className="w-full h-60 object-cover" />
            ) : (
                null)}
            <p className="text-[#ffffff] font-DMSans font-normal text-xl text-center mt-5">{course.title}</p>
            <div className="flex flex-row justify-between items-center w-full mt-3">
                <p className="text-[#ffffff] font-DMSans font-normal text-xl text-center ">{course.category}</p>
                <p className="text-[#ffffff] font-DMSans font-normal text-xl text-center ">{course.price}€</p>
            </div>
        </div>
        ))}
    </>
    );
  }
  