import NextAuth, { type Session, type User } from "next-auth";
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers : [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email: {label:"Email", type: "email"},
                password: {label:"Passwrod", type: "password"},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter email and password");
                }

                const user = await prisma.user.findUnique({
                    where:{ email: credentials.email}
                });

                if (!user) {
                    throw new Error("No user found with the given email");
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if(!isPasswordValid){
                    throw new Error("Invalid Password");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            }
        })
    ],
    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: "/login",
    },
    callbacks:{
        async jwt({token,user}: { token: JWT; user?: User }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}:{session: Session, token: JWT}) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};