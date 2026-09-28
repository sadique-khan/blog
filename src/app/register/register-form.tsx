"use client";

import { useActionState } from "react";
import { FormState, registerUser } from "./actions";
import Link from "next/link";
import Input from "@/components/ui/input";







const initialState: FormState = {};

export function RegisterForm(){
    const [state, formAction, isPending] = useActionState(registerUser,initialState);
    return(
        <form
            action={formAction}
            className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-800 bg-black p-8 text-white shadow-xl"
        >
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
                <p className="text-sm text-zinc-400">
                Enter your details below to create your account
                </p>
            </div>

            {state.errors?.general && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
                {state.errors.general}
                </div>
            )}

            <div className="space-y-4">
                <Input
                label="Name"
                name="name"
                placeholder="Enter your name"
                defaultValue={state.values?.name}
                error={state.errors?.name?.[0]}
                />
                <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                defaultValue={state.values?.email}
                error={state.errors?.email?.[0]}
                />
                <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                error={state.errors?.password?.[0]}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
                {isPending ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-blue-400 hover:underline">
                Sign In
                </Link>
            </p>
         </form>
    );
}