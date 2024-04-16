import { getServerSession } from "next-auth";
import {redirect} from "next/navigation";
import Form from "./components/form";


export default async function Page() {

    const session = await getServerSession()
    if (session) {
        redirect('/')
    } 

    return (
    <article className="w-full h-100vh flex flex-row justify-center">
        <Form/>
    </article>
);
}