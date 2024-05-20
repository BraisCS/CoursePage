"use client";
import { useEffect, useState } from 'react';

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

export default function CourseGlassphormish({ course }: { course: Course }) {
    const [formattedDate, setFormattedDate] = useState('');

useEffect(() => {
    if (course.updatedAt) {
        const date = new Date(course.updatedAt);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
    setFormattedDate(date.toLocaleDateString('es-ES', options));
    }
}, [course.updatedAt]);

return (
    <div className="flex flex-col justify-between items-start gap-1 py-2 w-[75%] glass-effect">
        <div className="w-full flex flex-row justify-between items-center">
            <p className="text-Dark font-DMSans font-semibold text-2xl">{course.title}</p>
            <p className="text-Dark font-DMSans font-semibold text-2xl">{formattedDate}</p>
        </div>
        <p className="text-Dark font-DMSans font-normal text-xl">{course.introduction}</p>
        <div className='w-full flex flex-row justify-between items-center'>
            <p className="text-Dark font-DMSans font-normal text-xl">{course.category}</p>
        </div>
    </div>
);
}
