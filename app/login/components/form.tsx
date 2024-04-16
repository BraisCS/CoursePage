"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Form() {

    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ loading, setLoading] = useState(false);
    const [ error, setError ] = useState("")

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if (error) {
            setLoading(false)
            setError("El usuario o la contraseña son incorrectos")
        }
    }, []);


    // Función modificada para iniciar sesión utilizando NextAuth
    const handleLogin = async (e:any) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        const email = e.target.email.value;
        const password = e.target.password.value;
        setLoading(true); // Inicia el indicador de carga
        setError(""); // Resetea cualquier error anterior
    
        // Intenta iniciar sesión con las credenciales proporcionadas
        const result = await signIn('credentials', {
            redirect: false, // Deshabilita la redirección automática
            email: email,
            password: password,
        });
    
        // Verifica si hay un error en el resultado
        if (result?.error) {
            // Si hay un error (por ejemplo, credenciales incorrectas), muestra el mensaje de error
            setError(result.error);
            setLoading(false); // Detiene el indicador de carga
        } else {
            // Si no hay error, asume que el inicio de sesión fue exitoso y redirige al usuario
            window.location.href = '/'; // Ajusta esta ruta según sea necesario
        }
    };
    
    

return ( 
    <>
    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-5 h-[100vh] w-full">
    <fieldset className="flex flex-col justify-start items-center w-full">
            <input 
            autoComplete="off"
                className=" bg-[#ffffff19] h-10 w-[80%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                onChange={(e) =>(e.target.value)} 
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
                onChange={(e) =>(e.target.value)} 
            />
            <div className=" absolute right-[15%] top-[50%] translate-y-[-50%]" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Image src={isPasswordVisible ? 'eye-open.svg' : 'eye-close.svg'} alt="Ojo" height={20} width={20}/>
            </div>
        </fieldset>
        <p className="font-DMSans text-Light-Orange"> { error }</p>
        <button className="w-[80%] h-10 bg-Light-Orange text-[#ffffff] font-normal "> Accede a [nombre] </button>
    </form> 
    </>
);
}