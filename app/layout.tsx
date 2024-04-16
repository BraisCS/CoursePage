import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";
import Providers from './providers/providers';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Titulo',
    description: 'Aprende',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
            <title>Titulo</title>
        </head>
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>)
}