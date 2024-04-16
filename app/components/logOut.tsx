"use client"
import {signOut} from "next-auth/react";

export default function LogOut() {
    return <button
        className="text-[#A0A0A0] font-normal text-[14px] font-Montserrat text-md hover:text-FF"
        onClick={() => signOut()}>
        Cerrar sesión
    </button>
}