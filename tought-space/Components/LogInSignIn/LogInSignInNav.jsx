import Link from "next/link"
import { useSearchParams } from 'next/navigation'
export default function LogInSignInNav({mode}) {


  return (
    <>
      {mode === "logIn" ?
        <div className="flex p-1 items-center justify-between">
          <p>Don't have an account? Create one!</p>
          <Link href={"/LogInSignIn?mode=signIn"} className='p-3 bg-blue-500 whitespace-nowrap duration-150 ease-in-out hover:bg-blue-700 text-white font-bold py-2 px-4  mr-2 border-2 rounded-3xl'>Sign In</Link>
        </div> :
        <div className='flex p-1 items-center justify-between'>
          <p>Already have an account? Log in!</p>
          <Link href={"/LogInSignIn?mode=logIn"} className='p-3 bg-blue-700 whitespace-nowrap hover:bg-blue-500 text-white font-bold py-2 px-4  border-2 rounded-3xl'>Log In</Link>
        </div>
      }

    </>
  )
}