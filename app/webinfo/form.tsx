"use client"
import axios from "axios"

export default function Form() {
    const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
    const formData = new FormData();
    formData.append('name', event.target.elements.name.value);
    const response = await axios.post('http://localhost:3000/api/sendwebinfo', formData ) 
    console.log(response.data);
    } catch (error) {
        console.error('Hubo un error al enviar el formulario:', error);
    }
}

return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-start items-center gap-10 mt-20 ">
        <fieldset className="w-[50%] flex flex-row justify-center items-center">
            <label htmlFor="name" className="text-white w-[35%] text-center">Nombre de tu Página web </label>
            <input type="text" name="name" className="text-#12171a w-[75%] h-8 bg-[#ecdce9]" />
        </fieldset>
        <button type="submit" className="px-5 py-2 bg-[#ecdce9]"> Aceptar </button>
    </form>
);
}
