'use client'
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button 
    onClick={() => signOut({callbackUrl:'/login'})}
    className="px-3 py-1 text-sm font-medium bg-red-500 hover:bg-red-700 text-white rounded-md transition"
    >
        Logout
    </button>
  )
}

