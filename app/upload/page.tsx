import Nav from "../components/nav";
import UploadCourseForm from "./components/form";
import { getServerSession } from "next-auth";


export default async function Page() {
  const session = await getServerSession();
  return (
    <article className="w-full flex flex-col items-center">
      <Nav session={session} /> 
      <UploadCourseForm/>
    </article>
  );
}