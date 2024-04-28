"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "@/app/firebaseConfig"
import { motion } from "framer-motion"
import ButtonNav from "./ButtonNav"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { doc } from "firebase/firestore"
export default function MenuNav() {
  const [user, loading] = useAuthState(auth)
  let userRef;
  if (user) {
    userRef = doc(db, "userList", user.uid)
  }
  const [userData, userDataLoading] = useDocumentData(userRef)

  console.log(userData)

  if (user) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-3 w-full rounded-xl bg-blue-100 shadow-2xl backdrop:blur-3xl bg-opacity-50">
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-8 text-blue-800 font-semibold max-lg:text-sm max-sm:text-center">Tought <span className="font-normal">Space</span></p>
        </div>
        <ButtonNav user={user} />
        <div className="flex text-center justify-center items-center">
          <p className="text-sm text-blue-800">Welcome back <span className="font-semibold">{userData?.name}</span>!</p>
        </div>
      </motion.div>
    )

  }
}