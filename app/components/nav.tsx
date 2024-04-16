"use client"
import { useState } from 'react';
import Image from 'next/image';
import "../components/NavKeyFrame.css"
import LogOut from './logOut';
import Search from './search';

export default function Nav({ session }: { session: any }) {
    const [showButtons, setShowButtons] = useState(false);
    const [showCourses, setShowCoursers] = useState(false);


    return (
        <nav className="h-16 w-[90%] border-b border-Light-Orange flex flex-row justify-between items-center">
        {showButtons && (
            <>
                <div className="absolute bg-Dark  w-full h-full top-0 left-0 z-10 "></div>
                <div className="absolute w-[90%] bg-Dark flex flex-row justify-between items-start z-50">
                {!session ? 
                <>
                    <a href='/register' className="fixed h-14 w-[90%] flex flex-row justify-center items-center bottom-[4.5rem] ml-0 bg-Light-Orange cursor-pointer">
                        <p className="font-DMSans text-[#ffffff] text-lg font-normal">Únete de forma gratuita</p>
                    </a>
                    <a href='/login' className="fixed h-14 w-[90%] flex flex-row justify-center items-center bottom-2 border-2 border-Light-Orange bg-Dark cursor-pointer">
                        <p className="font-DMSans text-Light-Orange text-lg font-normal">Inicia Sesión</p>
                    </a>
                </> : null }
                    <div className="w-[100%] flex flex-col justify-start items-start mt-32 relative"> {/* Asegúrate de que este contenedor sea relativo */}
                        {session ? <LogOut /> : null}
                        <a href="/upload" className="block font-DMSans text-[#ffffff] text-lg font-normal">Subir Curso</a>
                        <a href="/blog" className="block font-DMSans text-[#ffffff] text-lg font-normal">Blog</a>
                        {session ? <a href="/blog" className="block font-DMSans text-[#ffffff] text-lg font-normal">Mis Cursos</a> : null}
                        <div className='w-full flex flex-row justify-between items-start'>
                            <p className='font-DMSans text-[#ffffff] text-lg font-normal'> Cursos </p>
                            <Image onClick={() => setShowCoursers(!showCourses)} className="cursor-pointer text-Light-Orange" src={"/arrow-down.svg"} alt="Icono de cierre" height={30} width={30} />
                        </div>
                        {showCourses && (
                            <div className="relative top-full left-5 w-full"> {/* Este contenedor se posiciona absolutamente para expandirse hacia abajo */}
                                <a href="/blog" className="font-DMSans text-[#ffffff] text-lg font-normal block">Marketing</a>
                                <a href="/blog" className="font-DMSans text-[#ffffff] text-lg font-normal block" >Data Base</a>
                                <a href="/blog" className="font-DMSans text-[#ffffff] text-lg font-normal block" >Back-end</a>
                                <a href="/curso/front-end" className="font-DMSans text-[#ffffff] text-lg font-normal block">Front-end</a>
                            </div>
                        )}
                    <Search/>
                    </div>
                    <Image onClick={() => setShowButtons(!showButtons)} className="cursor-pointer mt-[5.8rem] h-9 w-9" src={"/cross.svg"} alt="Icono de cierre" height={30} width={30} />
                </div>
            </>
        )}
        <p className="text-white text-xs">LOGOss</p> 
        <Image onClick={() => setShowButtons(!showButtons)} className="cursor-pointer h-9 w-9" src={"/menu.svg"} alt="Icono de menú" height={30} width={30} />
        </nav>
    );
}
