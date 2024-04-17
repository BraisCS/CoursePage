"use client"
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

export default function Form() {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ password2, setPassword2 ] = useState("");
    const [ loading, setLoading] = useState(false);
    const [ error, setError ] = useState("");
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ isPasswordVisible2, setIsPasswordVisible2 ] = useState(false);

    const handleRegister = async (event:any) => {
        event.preventDefault();
        setLoading(true);
        setError(""); // Limpiar errores previos
    
        if (password !== password2) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }
    
        const body = {
            name: name,
            email: email,
            password: password,
        };
    
        try {
            const res = await axios.post('/api/register', body);
            if (res.status === 200) {
                setLoading(false)
                window.location.href = '/login';
            }
        } catch (error) {
            if (axios.isAxiosError(error)) { // Verifica si es un error de Axios
                if (error.response && error.response.status === 400) {
                    setError("Ya existe un usuario con este mismo email.");
                } else {
                    setError("Ocurrió un error al registrar el usuario.");
                }
            } else {
                // Manejar otros tipos de errores o error no manejado por Axios
                setError("Ocurrió un error inesperado.");
            }
            setLoading(false);
        }
        
    };
    

return ( 
    <>
    <form onSubmit={handleRegister} className="flex flex-col justify-center items-center gap-5 h-[100vh] w-full">
        <fieldset className="flex flex-col justify-start items-center w-full">
            <input 
                autoComplete="off"
                className=" bg-[#ffffff19] h-10 w-[80%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none"                
                type="text"
                id="name"
                name="name"
                required
                placeholder="Nombre y apellido"
                onChange={(e) => setName(e.target.value)} 
            />
        </fieldset>
        <fieldset className="flex flex-col justify-start items-center w-full">
            <input 
                autoComplete="off"
                className=" bg-[#ffffff19] h-10 w-[80%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} 
            />
        </fieldset>
        <fieldset className=" relative flex flex-col justify-start items-center w-full">
            <input 
                autoComplete="off"
                className=" bg-[#ffffff19] h-10 w-[80%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none"                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)} 
            />
            <div className=" absolute right-[15%] top-[50%] translate-y-[-50%]" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Image src={isPasswordVisible ? 'eye-open.svg' : 'eye-close.svg'} alt="Ojo" height={20} width={20}/>
            </div>
        </fieldset>
        <fieldset className=" relative flex flex-col justify-start items-center w-full">
            <input 
                autoComplete="off"
                className=" bg-[#ffffff19] h-10 w-[80%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none"
                type={isPasswordVisible2 ? "text" : "password"}
                id="password2"
                name="password2"
                placeholder="Repite la ontraseña"
                required
                onChange={(e) => setPassword2(e.target.value)} 
            />
            <div className=" absolute right-[15%] top-[50%] translate-y-[-50%]" onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}>
                <Image src={isPasswordVisible2 ? 'eye-open.svg' : 'eye-close.svg'} alt="Ojo" height={20} width={20}/>
            </div>
        </fieldset>
        <p className="font-DMSans text-Light-Orange"> { error }</p>
        <div className="w-[80%] flex flex-row justify-center items-center gap-2">
            <input type="checkbox" id="terms" name="terms" className="h-6 w-6"/>
            <p className="font-DMSans text-sm text-[#ffffff]">Acepto la <a href="#" className="font-DMSans">Política y Privacidad</a> y los <a href="#" className=" font-DMSans">Términos y condiciones</a> de [Nombre]</p>
        </div>        
        <button className="w-[80%] h-10 bg-Light-Orange text-[#ffffff] font-normal font-DMSans"> Únete a [nombre] </button>
        <div className="flex flex-row justify-start items-start gap-1">
            <p className="text-[#ffffff] font-DMSans">¿Ya tienes cuenta?</p>
            <a href="/login" className="text-Light-Orange font-DMSans">Inicia Sesión</a>
        </div>
    </form> 
    </>
);
}