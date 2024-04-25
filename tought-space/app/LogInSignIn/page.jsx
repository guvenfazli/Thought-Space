"use client"
import LogIn from "@/Components/LogInSignIn/LogIn"
import SignIn from "@/Components/LogInSignIn/SignIn"
import LogInSignInNav from "@/Components/LogInSignIn/LogInSignInNav"
import { useSearchParams } from "next/navigation"
export default function LogInSignInPage() {
  const searchParams = useSearchParams()
  let mode = searchParams.get('mode')
  return (
    <div className="flex w-full h-screen justify-center items-center p-3 text-white ">
      <div className="flex flex-col bg-gray-900 bg-opacity-50 gap-y-7 justify-center w-1/2 border-2 p-4 rounded-xl max-sm:w-full">
        <div className="flex justify-center">
          <p className="text-2xl mb-8 text-white font-semibold">Tought <span className="font-normal">Space</span></p>
        </div>
        {mode === "logIn" ? <LogIn /> : <SignIn />}
        <LogInSignInNav mode={mode} />

      </div>


    </div>
  )
}