import { registerUser } from "./actions";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div>
            <form action={registerUser}>
                <h1>Create an Account</h1>
                <div>
                    <label>Name</label>
                    <input name="name" type="text" required />
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" type="email" required />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" required />
                </div>
                <button type="submit">
                    Sign Up
                </button>
                <p>
                    Already have an Account?
                    <Link href="/login">Sign In</Link>
                </p>
            </form>
        </div>
    );
}