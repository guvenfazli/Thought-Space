"use client"
import LogIn from "@/Components/LogInSignIn/LogIn"
import SignIn from "@/Components/LogInSignIn/SignIn"
import LogInSignInNav from "@/Components/LogInSignIn/LogInSignInNav"
import { useSearchParams } from "next/navigation"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "@/app/firebaseConfig";
import { redirect } from "next/navigation"
import { useEffect } from "react"
export default function LogInSignInPage() {
  const searchParams = useSearchParams()
  let mode = searchParams.get('mode')
  const [user, loading] = useAuthState(auth)


  useEffect(() => {
    if (user) {
      redirect('/')
    }
  }, [user])



  if (!user) {
    return (
      <div className="flex w-full h-screen justify-center items-center p-3 text-white ">
        <div className="flex flex-col bg-gray-900 bg-opacity-50 gap-y-7 justify-center w-2/3 border-2 p-4 rounded-xl max-lg:w-full">
          <div className="flex justify-center">
            <p className="text-2xl mb-8 text-white font-semibold">Tought <span className="font-normal">Space</span></p>
          </div>
          {mode === "logIn" ? <LogIn /> : <SignIn />}
          <LogInSignInNav mode={mode} />
        </div>
      </div>
    )

  } else if (user) {
    return (
      <div className="flex w-full h-screen justify-center items-center p-3 text-white ">
        <div className="flex flex-col bg-gray-900 bg-opacity-50 gap-y-7 justify-center w-1/2 border-2 p-4 rounded-xl max-sm:w-full">
          <p className="text-2xl">Successfully logged in! Redirecting...</p>
        </div>
      </div>
    )
  }
}
