"use client"
import PostCard from "@/Components/HomePagePosts/PostCard"
import { auth, db } from "@/app/firebaseConfig";
import { collection } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LoadingComponent from "@/Components/LoadingComp/LoadingComponent"
import { useState } from "react";
export default function PostSection() {
  const [user, userLoading] = useAuthState(auth)
  const postsDataRef = collection(db, "posts")
  const [values, loading, error, snapshot] = useCollectionData(postsDataRef)
  const [filterHastTag, setFilterHashTag] = useState()
  values?.sort((a, b) => b.createdAt - a.createdAt)
  function filterPosts(postTag) {
    const filtered = values.filter((post) => post.hashtag.includes(postTag))
    setFilterHashTag(filtered)
  }

  console.log(filterHastTag)
  if (!user) {
    redirect('/LogInSignIn?mode=logIn')
  }
  return (
    <>
      {loading && <LoadingComponent />}
      {values && !filterHastTag && values.map((post) => <PostCard key={post.id} post={post} setFilter={filterPosts} />)}
      {!loading && filterHastTag && filterHastTag.map((post) => <PostCard key={post.id} post={post} setFilter={filterPosts} />)}
    </>

  )
}