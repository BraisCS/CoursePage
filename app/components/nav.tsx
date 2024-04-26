"use client"
import { useState } from 'react';
import Image from 'next/image';
import LogOut from './logOut';
import Search from './search';
import "../components/navKeyFrame.css"

export default function Nav({ session }: { session: any }) {
    const [showButtons, setShowButtons] = useState(false);
    const [showCourses, setShowCoursers] = useState(false);


    return (
        <>
        {/* Pantallas grandes */}
        <nav className="h-16 w-[90%] border-b border-Light-Orange lg:flex flex-row justify-between items-center hidden">
            <div className='flex flex-row justify-between items-center h-full w-full'>
            <p className="text-white text-xs">LOGOss</p>
            <div className='flex flex-row justify-end items-center h-full w-full gap-5'>
                {session ? <LogOut /> : null}
                {session ? <a href="/upload" className="block font-DMSans text-[#ffffff] text-lg font-normal">Subir Curso</a> : null}
                <a href="/blog" className="block font-DMSans text-[#ffffff] text-lg font-normal">Blog</a>
                {session ? <a href="/blog" className="block font-DMSans text-[#ffffff] text-lg font-normal">Mis Cursos</a> : null}
                {!session ? 
                <>
                    <a href='/register' className="font-DMSans text-[#ffffff] text-lg font-normal">
                    Regístrate
                    </a>
                    <a href='/login' className="font-DMSans text-[#ffffff] text-lg font-normal">
                    Inicia Sesión
                    </a>
                    </>
                : null }
            </div>
            
            </div> 
        </nav>

        {/* Pantallas pequeñas */}
        <nav className="h-16 w-[90%] border-b border-Light-Orange flex flex-row justify-between items-center lg:hidden">
            {showButtons && (
            <>
                <div className="fixed bg-Dark w-full h-full top-0 left-0 z-10 "></div>
                <div className="fixed w-[90%] top-3 bg-Dark flex flex-col gap-10 z-50 ">
                    <div className='w-full flex flex-row justify-end '>
                        <Image onClick={() => setShowButtons(!showButtons)} className="cursor-pointer h-9 w-9" src={"/cross.svg"} alt="Icono de cierre" height={30} width={30} />
                    </div>
                    <div className="relative w-full flex flex-col justify-start items-start gap-5 "> {/* Asegúrate de que este contenedor sea relativo */}
                        <Search/>
                        {session ? <a href="/blog" className="block font-DMSans text-[#ffffff] text-lg font-normal">Mis Cursos</a> : null}
                        <a href="/blog" className="block font-DMSans text-[#ffffff] text-lg font-normal">Blog</a>
                        {session ? <a href="/upload" className="block font-DMSans text-[#ffffff] text-lg font-normal">Subir Curso</a> : null}
                        {session ? <LogOut /> : null}
                        {!session ? 
                        <>
                            <a href='/register' className="fixed h-14 w-[90%] flex flex-row justify-center items-center bottom-[4.5rem] ml-0 bg-Light-Orange cursor-pointer">
                                <p className="font-DMSans text-[#ffffff] text-lg font-normal">Únete de forma gratuita</p>
                            </a>
                            <a href='/login' className="fixed h-14 w-[90%] flex flex-row justify-center items-center bottom-2 border-2 border-Light-Orange bg-Dark cursor-pointer">
                                <p className="font-DMSans text-Light-Orange text-lg font-normal">Inicia Sesión</p>
                            </a>
                        </> : null }
                    </div>
                </div>
            </>
        )}
        <p className="text-white text-xs">LOGOss</p> 
        <Image onClick={() => setShowButtons(!showButtons)} className="cursor-pointer h-9 w-9" src={"/menu.svg"} alt="Icono de menú" height={30} width={30} />
        </nav>
    </>
    );
}
