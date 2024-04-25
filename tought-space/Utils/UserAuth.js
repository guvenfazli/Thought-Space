import { auth } from "../app/firebaseConfig";
import { db } from "../app/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, setDoc, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

async function refreshToken(userRef, user) {
  const getUser = await getDoc(userRef).then((userData) => userData.data())
  await updateDoc(userRef, {
    ...getUser,
    token: user.accessToken
  })
  localStorage.setItem('token', user.accessToken)
  localStorage.setItem('user', JSON.stringify({ id: user.uid }))

}

export async function logInAccount(userInfo) {
  const userCredential = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  const user = userCredential.user
  const userRef = doc(db, "userList", `${user.uid}`)
  await refreshToken(userRef, user)
}

export async function createAccount(userInfo) {
  const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  const user = userCredential.user
  await setDoc(doc(db, "userList", `${user.uid}`), { ...userInfo, id: user.uid, token: user.accessToken })
  if (user) {
    localStorage.setItem('token', user.accessToken)
    localStorage.setItem('user', JSON.stringify({ id: user.uid }))
  }
}

export async function logOut() {
  await signOut(auth)
  localStorage.removeItem('token')
  localStorage.removeItem('user')

}