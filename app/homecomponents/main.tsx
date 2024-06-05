import CourseGlassphormish from "./courseGlassphormish";

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
      <main className={`w-[97%] lg:w-[95%] ml-[3%] lg:ml-[5%] flex flex-col gap-5 lg:gap-0 lg:flex-row justify-start py-[5%] items-start`}>
        <div className="w-full lg:w-[45%] flex flex-col justify-start items-start gap-3">
          <h1 className=" text-[#f6f6f6] font-DMSans font-normal text-4xl lg:text-5xl"> Todos los cursos de <br /> Desarrollo Web</h1>
          <p className=" text-[#f6f6f6] font-DMSans font-normal text-xl lg:text-2xl">  Lorem ipsum dolor sit amet consectetur</p>
          <p className=" text-[#f6f6f6] font-DMSans font-extralight text-xl lg:text-2xl">Lorem ipsum dolor sit amet consectetur adipiscing elit maecenas congue felis, aenean montes per proin sollicitudin rhoncus vel condimentum iaculis eget, erat platea sociis sed porttitor litora quisque orci tortor.</p>
          <p className=" text-[#eeb462] font-DMSans font-extralight text-base lg:text-lg">  Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <div className="flex flex-row justify-start items-start gap-10 h-[34rem] w-[95%] lg:w-[55%] p-2">
          <CourseGlassphormish courses={coursesWithImages} />
        </div>
      </main>
    </>
  );
}
