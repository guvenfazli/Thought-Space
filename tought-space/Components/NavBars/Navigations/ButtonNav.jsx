import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebaseConfig"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
import Buttons from "./Buttons"

export default function ButtonNav({user}) {


  return (
    <nav className="flex flex-col items-center p-2">
      <Buttons type={"nav"} redirectLink={'/'}>Home</Buttons>
      <Buttons type={"nav"} redirectLink={`/users/${user?.uid}`}>Profile</Buttons>
      <Buttons type={"newPost"} redirectLink={'/newPost'}>+</Buttons>
      <Buttons type={"auth"} redirectLink={'/LogInSignIn?mode=logIn'}>Log Out</Buttons>
    </nav>
  )
}