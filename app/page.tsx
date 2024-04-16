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
        </main>
      </article>
    </>
  );
}
