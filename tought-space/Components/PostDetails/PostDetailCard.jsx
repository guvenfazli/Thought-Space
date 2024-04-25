"use client"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { db } from "@/app/firebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebaseConfig"
import { doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { notFound } from "next/navigation"

import Post from "@/Components/PostDetails/Post"
import EditPost from "@/Components/PostDetails/EditPost"
export default function PostDetailCard({ postId }) {
  const [user] = useAuthState(auth)
  const [editMode, setEditMode] = useState(false)

  const postRef = doc(db, "posts", postId)
  const [value, loading, error, snapshot] = useDocumentData(postRef)


  useEffect(() => {
    if (error) {
      notFound()
    }
  }, [loading])

  return (
    <div className="flex flex-col p-3 gap-y-9 w-2/4 shadow-2xl items-center  bg-gray-100  text-black rounded-lg max-sm:w-full">
      {loading ? <p>Post is loading...</p> :
        <>
          {!editMode ? <Post edit={setEditMode} value={value} postRef={postRef} userId={user.uid} /> : <EditPost value={value} postRef={postRef} userId={user.uid} edit={setEditMode} />}
        </>
      }

    </div>
  )
}