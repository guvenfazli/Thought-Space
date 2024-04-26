"use client"
import PostCard from "@/Components/HomePagePosts/PostCard"
import { auth, db } from "@/app/firebaseConfig";
import { collection } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LoadingComponent from "@/Components/LoadingComp/LoadingComponent"
export default function PostSection() {
  const [user, userLoading] = useAuthState(auth)
  const postsDataRef = collection(db, "posts")
  const [values, loading, error, snapshot] = useCollectionData(postsDataRef)
  values?.sort((a,b) => b.createdAt - a.createdAt)

  if(!user){
    redirect('/LogInSignIn?mode=logIn')
  }
  return (
    <>
      {loading ? <LoadingComponent /> : values.map((post) => <PostCard key={post.id} post={post} />)}
    </>

  )
}