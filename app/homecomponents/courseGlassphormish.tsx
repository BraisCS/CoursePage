"use client";
import { useEffect, useRef } from 'react';
import Swiper from 'swiper/bundle';
import { Swiper as SwiperType } from "swiper/types"; 
import 'swiper/swiper-bundle.css';
import "./courseGlassphormish.css";
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
  updatedAt: Date;
}

export default function CourseGlassphormish({ courses }: { courses: Course[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    swiperRef.current = new Swiper('.swiper-container-first', {
      slidesPerView: 2.3,
      spaceBetween: 10,
      initialSlide: 0,
      speed: 1000,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'custom',
        renderCustom: function (swiper: SwiperType, current: number, total: number) {
          const currentFormatted = current < 10 ? '0' + current : current;
          const totalFormatted = total < 10 ? '0' + total : total;
          return `<span class="swiper-pagination-current">${currentFormatted}</span>
                  <span class="swiper-pagination-separator"> - </span>
                  <span class="swiper-pagination-total">${totalFormatted}</span>`;
        }
      },
      breakpoints: {
        320: { // For screens wider than 320px
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
        640: { // For screens wider than 640px
          slidesPerView: 2.3,
          spaceBetween: 10,
        },
      }
    });
  }, []);

  return (
    <div className='swiper-container-wrapper h-full relative overflow-hidden'>
      <div className='swiper-container-first flex flex-col'>
        <div className='swiper-wrapper flex flex-row'>
          {courses.map((course, index) => (
            <div key={index} className="swiper-slide flex flex-col justify-between items-start p-5 min-h-[28rem] min-w-[2rem] rounded-lg border border-Light-Orange ">
              <div className='w-full flex flex-col justify-start items-start gap-5'>
                <div className='flex flex-col justify-start items-start gap-2'>
                  <p className="text-[#fff] font-DMSans font-light text-2xl">{course.title}</p>
                  <p className="text-[#fff] font-DMSans font-extralight text-sm">10 semanas | 2 horas por semana</p>
                </div>
                <p className="text-[#fff] font-DMSans font-extralight text-base">{course.introduction}</p>
              </div>
              <div className='flex flex-col justify-start items-start gap-2 w-full'>
                <p className="text-[#fff] font-DMSans font-extralight text-4xl">{course.price} €</p>
                <div className='w-full flex flex-row justify-between items-center'>
                  <a href={`/courses/${course.id}`} className=" w-[80%] text-[#fff] font-DMSans font-normal text-start py-2 px-6 rounded-lg border border-Light-Orange cursor-pointer">Ver curso</a>
                  <Image height={40} width={40} alt='Icono Bookmark' src={"/bookmark.svg"} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-controls w-full absolute bottom-6 lg:flex lg:flex-row justify-between items-center p-4 hidden">
        <div className="flex flex-row justify-start items-center">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next mr-[85%]"></div>
        </div>
        <div className='flex justify-end w-full'>
          <div className="swiper-pagination ml-[40%]"></div>
        </div>
      </div>
    </div>
  );
}
