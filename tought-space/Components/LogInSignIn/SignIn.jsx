import { useState, useRef, useEffect } from "react"
import { createAccount } from "@/Utils/UserAuth"
import { AnimatePresence, motion } from "framer-motion"

export default function SignIn() {
  const [userSignInInfo, setUserSignInInfo] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    likedPosts: []
  })
  const [profilePic, setProfilePic] = useState()
  const [userError, setUserError] = useState(false)
  const [userSuccess, setUserSuccess] = useState(false)
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
    try {
      await createAccount(userInfo, profilePic)
      setUserSuccess(true)
    } catch {
      setUserError(true)
    }
  }

  useEffect(() => {

    if (userSuccess) {
      const timeOut = setTimeout(() => {
        setUserSuccess(false)
      }, 3000)

      return (() => {
        clearTimeout(timeOut)
        redirect('/')
      })
    }


    if (userError) {
      const timeOut = setTimeout(() => {
        setUserError(false)
      }, 3000)

      return (() => {
        clearTimeout(timeOut)
      })
    }
  }, [userError, userSuccess])


  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={(e) => signIn(userSignInInfo, e)} className="flex flex-col p-1 gap-y-4">
      <label htmlFor="name" className="text-2xl">Name*</label>
      <input ref={nameRef} onChange={() => getUserInfo("name", nameRef)} type="text" name="name" className="text-black p-2 rounded-xl" placeholder="Name" />
      <label htmlFor="age" className="text-2xl">Age*</label>
      <input ref={ageRef} onChange={() => getUserInfo("age", ageRef)} type="text" name="age" className="text-black p-2 rounded-xl" placeholder="Age" />
      <label htmlFor="email" className="text-2xl">Email*</label>
      <input ref={emailRef} onChange={() => getUserInfo("email", emailRef)} type="email" name="email" className="text-black p-2 rounded-xl" placeholder="Email" />
      <label htmlFor="password" className="text-2xl">Password*</label>
      <input ref={passwordRef} onChange={() => getUserInfo("password", passwordRef)} type="password" name="password" className="text-black p-2 rounded-xl" placeholder="Password" />
      <label htmlFor="profilePic" className="text-2xl">Profile Picture*</label>
      <input type="file" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0])} className="
      file:bg-blue-600 file:text-sm file:text-white file:border-none file:rounded-lg file:p-2 file:shadow-2xl file:hover:cursor-pointer"/>
      <div className="flex justify-center items-center">
        <button type="submit" className="py-2 px-8 border-2 rounded-2xl bg-blue-600 duration-150 ease-in-out hover:bg-blue-700 text-white font-bold">Sign In</button>
      </div>
      <div className="flex w-full justify-center items-center">
        <AnimatePresence>
          {userError && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-red-800 text-white font-bold p-3 rounded-lg shadow-md">Please fill out all required fields.</motion.p>}
          {userSuccess && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-green-800 text-white font-bold p-3 rounded-lg shadow-md max-sm:text-center max-sm:text-sm">Post Created Succesfully! Redirecting...</motion.p>}
        </AnimatePresence>
      </div>
    </motion.form>
  )
}