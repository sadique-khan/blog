"use server";

import {signIn} from "@/auth";

export interface LoginFormState {
    errors?: {
        email?: string[];
        password?: string[];
        general?: string;
    };
    values?: {
        email?: string
    };
}

export async function loginUser(
    prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    const errors: LoginFormState["errors"] = {};

    if (!email || !email.includes("@")) {
        errors.email = ["Please enter a valid email address."];
    }

    if (!password) {
        errors.password = ["Password is required"];
    }

    if (Object.keys(errors).length > 0) {
        return {errors, values: {email}};
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        });
    } catch (error) {
        if (typeof error === "object" && error !== null && "type" in error) {
    const errorType = (error as { type: string }).type;

    if (errorType === "CredentialsSignin") {
      return {
        errors: { general: "Invalid email or password." },
        values: { email },
      };
    }
    return {
        errors: { general: "An unexpected error occurred during sign in." },
        values: { email },
    };
    }
        throw error;
    
    }
    return {};
}