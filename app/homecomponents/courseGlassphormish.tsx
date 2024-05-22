"use client";
import { useEffect, useRef } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

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

export default function CourseGlassphormish({ courses }: { courses: Course[] }) {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    swiperRef.current = new Swiper('.swiper-container-first', {
      slidesPerView: 2.3,
      spaceBetween: 10,
      initialSlide: 0,
      speed: 1000,
    });
  }, []);

  return (
    <div className='swiper-container-first overflow-hidden'>
      <div className='swiper-wrapper flex flex-row'>
        {courses.map((course, index) => (
          <div key={index} className="swiper-slide flex flex-col justify-between items-start p-5 min-h-[28rem] min-w-[2rem] rounded-lg border border-Light-Orange bg-[#ffffff30]">
            <div className='w-full flex flex-col justify-start items-start gap-5'>
              <div className='flex flex-col justify-start items-start gap-2'>
                <p className="text-[#fff] font-DMSans font-light text-2xl">{course.title}</p>
                <p className="text-[#fff] font-DMSans font-extralight text-sm">10 semanas | 2 horas por semana</p>
              </div>
              <p className="text-[#fff] font-DMSans font-extralight text-base">{course.introduction}</p>
            </div>
            <div className='flex flex-col justify-start items-start gap-2'>
              <p className="text-[#fff] font-DMSans font-extralight text-4xl">{course.price} €</p>
              <div className='w-full flex flex-row justify-start items-center'>
                <a href={`courses/${course.id}`} className="text-[#fff] font-DMSans font-normal text-start py-2 px-6 rounded-lg border border-Light-Orange cursor-pointer">Ver curso</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
