"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export interface FormState{
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        general?: string;
    };
    values?:{
        name?: string;
        email?: string;
    }
}

export async function registerUser(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const errors: FormState["errors"] = {};

    if (!name || name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters long."];
    }

    if (!email || !email.includes("@")) {
        errors.email = ["Please enter a valid email address."];
    }

    if (!password || password.length < 6) {
        errors.password = ["Password must be at least 6 characters long."];
    }

    if (Object.keys(errors).length > 0) {
    return { errors, values: { name, email} };
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
        where: { email },
        });

        if (existingUser) {
        return {
            errors: {
            email: ["A user with this email already exists."],
            },
            values: { name, email},
        };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        });
    } catch (error) {
        console.error("Database registration error:", error);
        return {
        errors: {
            general: "Failed to create account. Please try again later."
        },
        values: {name, email},
        };
    }

    redirect("/");
}