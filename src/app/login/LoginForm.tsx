// app/login/LoginForm.tsx
"use client";

import { useActionState } from "react";
import { LoginFormState, loginUser } from "./actions";
import Link from "next/link";
import Input from "@/components/ui/input";

const initialState: LoginFormState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, initialState);

  return (
    <form
      action={formAction}
      className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-800 bg-black p-8 text-white shadow-xl"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-zinc-400">
          Enter your credentials to access your account
        </p>
      </div>

      {state.errors?.general && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
          {state.errors.general}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="name@example.com"
          defaultValue={state.values?.email}
          error={state.errors?.email?.[0]}
          disabled={isPending}
        />

        <div className="space-y-1">
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            error={state.errors?.password?.[0]}
            disabled={isPending}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-400 hover:text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-blue-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}