import { useState, useRef } from "react"
import { createAccount } from "@/Utils/UserAuth"

export default function SignIn() {
  const [userSignInInfo, setUserSignInInfo] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    likedPosts: []
  })
  const nameRef = useRef()
  const ageRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  function getUserInfo(field, ref) {
    setUserSignInInfo((prev) => {
      let info = { ...prev, [field]: ref.current.value }
      return info
    })
  }

  async function signIn(userInfo, e) {
    e.preventDefault()
    await createAccount(userInfo)
  }



  return (
    <form onSubmit={(e) => signIn(userSignInInfo, e)} className="flex flex-col p-1 gap-y-4">
      <label htmlFor="name" className="text-2xl">Name</label>
      <input ref={nameRef} onChange={() => getUserInfo("name", nameRef)} type="text" name="name" className="text-black p-2 rounded-xl" placeholder="Name" />
      <label htmlFor="age" className="text-2xl">Age</label>
      <input ref={ageRef} onChange={() => getUserInfo("age", ageRef)} type="text" name="age" className="text-black p-2 rounded-xl" placeholder="Age" />
      <label htmlFor="email" className="text-2xl">Email</label>
      <input ref={emailRef} onChange={() => getUserInfo("email", emailRef)} type="email" name="email" className="text-black p-2 rounded-xl" placeholder="Email" />
      <label htmlFor="password" className="text-2xl">Password</label>
      <input ref={passwordRef} onChange={() => getUserInfo("password", passwordRef)} type="password" name="password" className="text-black p-2 rounded-xl" placeholder="Password" />
      <div className="flex justify-center items-center">
        <button type="submit" className="py-2 px-8 border-2 rounded-2xl bg-blue-600 duration-150 ease-in-out hover:bg-blue-700 text-white font-bold">Sign In</button>
      </div>
    </form>
  )
}