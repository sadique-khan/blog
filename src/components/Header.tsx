import { auth } from "@/auth";
import Link from "next/link";
import LogoutButton from "./ui/logoutButton";
import searchBlogs from "@/app/blogs/actions";

export default async function Header() {
  const session = await auth();

  return (
    <header className="fixed w-full border-b border-zinc-700 bg-zinc-900/80 py-4 backdrop-blur-md z-2">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6">
        
        {/* Brand */}
        <Link 
          href="/" 
          className="text-lg font-semibold tracking-tight text-zinc-100"
        >
          MyBlog
        </Link>

         {/* Search Bar */}
        <form action={searchBlogs} className="flex flex-1 justify-center px-4">
          <input
            type="text"
            name="query"
            placeholder="Search blogs..."
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl
                       rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-100
                       placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Search
          </button>
        </form>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm text-zinc-400">
          {session ? (
            <>
              
              <Link 
                href="/" 
                className="transition hover:text-zinc-200"
              >
                Home
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link 
              href="/login" 
              className="rounded-md bg-blue-600 px-3 py-2 font-medium text-white transition hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}
