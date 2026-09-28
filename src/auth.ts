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
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                const user = await prisma.user.findUnique({
                    where:{ email }
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                if(!isPasswordValid){
                    return null;
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

export const {handlers, signIn, signOut, auth} = NextAuth(authOptions);