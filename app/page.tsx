import { getServerSession } from "next-auth";
import Nav from "./components/nav";
import "./globals.css"

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
      <article className="w-full flex flex-col items-center">
        <Nav session={session} /> 
        <main className="w-full flex flex-col justify-start items-center mt-10">
          <div className="w-[95%] bg-Light-Orange px-3 py-2 rounded-md">
            <p className="text-[#ffffff]">Descubre el mundo de la programación con nuestra aplicación. Ofrecemos una amplia gama de cursos de programación que te permitirán adquirir nuevas habilidades o perfeccionar las que ya tienes. Desde principiantes hasta expertos, hay algo para todos. ¡Empieza tu viaje de aprendizaje con nosotros hoy mismo!</p>
          </div>
          <div className="w-[80%] flex flex-row justify-evenly items-center mt-40">
            <div className=" flex flex-col items-start gap-5 bg-Light-Green hover:bg-Light-Purple cursor-pointer rounded-lg px-3 py-2  w-[95%] lg:w-auto">
              <h2 className=" text-2xl font-DMSans font-bold text-[#000] text-center w-full">Paquete gratuito</h2>
              <p className=" text-base font-DMSans font-normal text-[#000]">Válido por 30 días </p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Solo permite un curso por semana</p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> No obtendras un certificado</p>
            </div>
            <div className=" flex flex-col items-start gap-5 bg-Light-Green backdrop-blur-md shadow-md rounded-lg px-3 py-2 text-center w-[95%] lg:w-auto">
              <h2 className=" text-2xl font-DMSans font-bold text-[#000] text-center w-full">Paquete mensual</h2>
              <p className=" text-base font-DMSans font-normal text-[#000]"> 35€ </p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Podras realizar todos los cursos que necesites</p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Obtendras un certificado</p>
            </div>
            <div className=" flex flex-col items-start gap-5 bg-Light-Green backdrop-blur-md shadow-md rounded-lg px-3 py-2 text-center w-[95%] lg:w-auto">
              <h2 className=" text-2xl font-DMSans font-bold text-[#000] text-center w-full">Paquete anual</h2>
              <p className=" text-base font-DMSans font-normal text-[#000]"> 100€ </p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Podras realizar todos los cursos que necesites</p>
              <p className=" text-base font-DMSans font-normal text-[#000]"> Obtendras un certificado</p>
            </div>
        </div>
      </main>
      </article>
    </>
  );
}
