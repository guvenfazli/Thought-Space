"use client"
import PostCard from "@/Components/HomePagePosts/PostCard"
import { db } from "@/app/firebaseConfig";
import { collection } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function PostSection() {

  const postsDataRef = collection(db, "posts")
  const [values, loading, error, snapshot] = useCollectionData(postsDataRef)
  values?.sort((a,b) => b.createdAt - a.createdAt)
  
  return (
    <>
      {loading ? <p>Loading...</p> : values.map((post) => <PostCard key={post.id} post={post} />)}
    </>

  )
}