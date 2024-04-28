import { useState, useRef, useEffect } from "react"
import { logInAccount } from "@/Utils/UserAuth"
import { AnimatePresence, motion } from "framer-motion"

export default function LogIn() {
  const [userLogInInfo, setUserLogInInfo] = useState({
    email: "",
    password: ""
  })
  const [logInError, setLogInError] = useState(false)
  const [logInSuccess, setLogInSuccess] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()

  function getUserInfo(field, ref) {
    setUserLogInInfo((prev) => {
      let info = { ...prev, [field]: ref.current.value }
      return info
    })
  }

  async function logIn(userInfo, e) {
    e.preventDefault()
    try {
      await logInAccount(userInfo)
    } catch {
      setLogInError(true)
    }
  }

  useEffect(() => {

    if (logInSuccess) {
      const timeOut = setTimeout(() => {
        setLogInSuccess(false)
      }, 3000)

      return (() => {
        clearTimeout(timeOut)
        redirect('/')
      })
    }


    if (logInError) {
      const timeOut = setTimeout(() => {
        setLogInError(false)
      }, 3000)

      return (() => {
        clearTimeout(timeOut)
      })
    }
  }, [logInError, logInSuccess])

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={(e) => logIn(userLogInInfo, e)} className="flex flex-col p-1 gap-y-4">
      <label htmlFor="email" className="text-2xl">Email</label>
      <input ref={emailRef} onChange={() => getUserInfo("email", emailRef)} type="email" name="email" className="text-black p-2 rounded-xl" placeholder="Email" />
      <label htmlFor="password" className="text-2xl">Password</label>
      <input ref={passwordRef} onChange={() => getUserInfo("password", passwordRef)} type="password" name="password" className="text-black p-2 rounded-xl" placeholder="Password" />
      <div className="flex justify-center items-center">
        <button type="submit" className="py-2 px-8 border-2 rounded-2xl duration-150 ease-in-out bg-blue-800 hover:bg-blue-500 text-white font-bold">Log In</button>
      </div>
      <AnimatePresence>
        <div className="flex justify-center items-center">
          {logInError && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-red-800 text-white font-bold p-3 rounded-lg shadow-md">Invalid email or password!</motion.p>}
          {logInSuccess && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-green-800 text-white font-bold p-3 rounded-lg shadow-md max-sm:text-center max-sm:text-sm">Successfully logged in!</motion.p>}
        </div>
      </AnimatePresence>

    </motion.form>
  )
}