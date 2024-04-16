import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "bperez@mail.com" },
                password: { label: "Password", type: "password" }
            },
            // @ts-ignore
            async authorize(credentials) {
                
                if (credentials == undefined) {
                    return null
                }

                const prisma = new PrismaClient()

                const userDb = await prisma.user.findFirst({
                    where: {
                        OR: [
                            {
                                email: credentials.email
                            },
                        ]
                    }
                })

                if (!userDb) {
                    return null
                }

                const match = await bcrypt.compare(credentials.password, userDb.password)

                let user;
                if (!match) {
                    console.log("asdasd");
                    return null
                } else {
                    user = {
                        id: userDb.id,
                        email: userDb.email
                    }
                }

                if (user) {
                    return user
                }
                return null; // Add this line to handle the case when user is undefined
            },
        })
    ],
    pages: {
        signIn: '/login',
    }
})

export { handler as GET, handler as POST }