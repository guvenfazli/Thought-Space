import { auth } from "../app/firebaseConfig";
import { db } from "../app/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, setDoc, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { storage } from "../app/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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

export async function createAccount(userInfo, profilePic) {
  const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  const user = userCredential.user
  const imageRef = ref(storage, user.uid)
  uploadBytes(imageRef, profilePic).then(() => {
    getDownloadURL(imageRef).then((url) => {
      setDoc(doc(db, "userList", `${user.uid}`), { ...userInfo, id: user.uid, token: user.accessToken, ppURL: url })
    })
  })
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