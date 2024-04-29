"use client"
import PostCard from "@/Components/HomePagePosts/PostCard"
import { auth, db } from "@/app/firebaseConfig";
import { collection } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LoadingComponent from "@/Components/LoadingComp/LoadingComponent"
import { useState } from "react";
import { motion } from "framer-motion";

export default function PostSection() {
  const [user, userLoading] = useAuthState(auth)
  const postsDataRef = collection(db, "posts")
  const [values, loading, error, snapshot] = useCollectionData(postsDataRef)
  const [filterHastTag, setFilterHashTag] = useState()

  values?.sort((a, b) => b.createdAt - a.createdAt)

  function filterPosts(postTag) {
    const filtered = values.filter((post) => post.hashtag.includes(postTag))
    setFilterHashTag({ title: postTag, posts: filtered })
  }

  if (!user) {
    redirect('/LogInSignIn?mode=logIn')
  }

  return (
    <>
      {loading && <LoadingComponent />}
      {values && !filterHastTag && values.map((post) => <PostCard key={post.id} post={post} setFilter={filterPosts} />)}
      {!loading && filterHastTag &&
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full justify-between shadow-sm rounded-3xl bg-gray-800 bg-opacity-90 items-center border-2 border-gray-800 py-4 px-4">
            <p className="text-lg text-white font-bold">Ideas that filtered by '{filterHastTag.title}'</p>
            <button onClick={() => setFilterHashTag(undefined)} className="px-2 rounded-2xl text-black duration-150 ease-in-out bg-white hover:bg-black hover:text-white font-bold">x</button>
          </motion.div>
          {filterHastTag.posts.map((post) => <PostCard key={post.id} post={post} setFilter={filterPosts} />)}
        </>
      }
    </>

  )
}