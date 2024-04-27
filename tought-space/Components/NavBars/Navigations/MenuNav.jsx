"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebaseConfig"
import { motion } from "framer-motion"
import ButtonNav from "./ButtonNav"
export default function MenuNav() {
  const [user, loading] = useAuthState(auth)

  if (user) {
    return (
      <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-3 w-full rounded-xl bg-blue-100 shadow-2xl backdrop:blur-3xl bg-opacity-50">
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-8 text-blue-800 font-semibold max-lg:text-sm max-sm:text-center">Tought <span className="font-normal">Space</span></p>
        </div>
        <ButtonNav user={user}/>
      </motion.div>
    )

  }
}