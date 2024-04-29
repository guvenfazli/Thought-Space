"use client"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebaseConfig"
import { logOut } from "@/Utils/UserAuth"
import Link from "next/link"
import { home, profile, login } from "@/Components/NavBars/MobileNav/MobileNavIcons"
export default function MobileNav() {
  const [openNav, setOpenNav] = useState(false)
  const [user, loading] = useAuthState(auth)

  if (user) {
    return (
      <div className={`${openNav ? "h-72" : "h-11"} duration-500 ease-in-out overflow-hidden hidden max-sm:flex`}>
        <nav className={`flex flex-col transition-all ${openNav && "justify-between"}  relative ${openNav && "h-full"} items-center duration-150 ease-in-out overflow-hidden`}>
          <button onClick={logOut} className={`text-lg flex items-center justify-center ${!openNav && "absolute bottom-1 invisible"} font-bold h-10 w-10 duration-150 bg-gray-900 px-3 py-1 rounded-full hover:bg-gray-500`}>{login}</button>
          <Link href={'/newPost'} className={`text-lg flex items-center justify-center ${!openNav && "absolute bottom-1 invisible"} opacity-100 font-bold h-10 w-10 duration-150 bg-gray-900 px-3 py-1 rounded-full hover:bg-gray-500`}>+</Link>
          <Link href={`/users/${user?.uid}`} className={`text-lg flex items-center justify-center ${!openNav && "absolute bottom-1 invisible"} opacity-100 font-bold h-10 w-10 duration-150  bg-gray-900 px-3 py-1 rounded-full hover:bg-gray-500`}>{profile}</Link>
          <Link href={'/'} className={`text-lg flex items-center justify-center ${!openNav && "absolute bottom-1 invisible"} opacity-100 font-bold h-10 w-10 duration-150 bg-gray-900 px-3 py-1 rounded-full hover:bg-gray-500`}>{home}</Link>
          <button onClick={() => setOpenNav(prev => !prev)} className={`text-lg 
          font-bold 
          duration-150
          ease-in-out 
          bg-gray-900 
          h-10
          w-10
          rounded-full
          hover:bg-gray-500 
          hover:rotate-45
          z-10
          ${openNav && "rotate-45"}
          `}>+</button>
        </nav>
      </div>
    )

  }
}