"use client"
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore"
import { db } from "@/app/firebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebaseConfig"
import { collection, doc, deleteDoc } from "firebase/firestore"
import Link from "next/link"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { notFound, redirect } from "next/navigation"
import LoadingComponent from "@/Components/UserProfile/UserProfile"

export default function UserProfile({ userId }) {
  const [user, loading] = useAuthState(auth)
  const userRef = doc(db, "userList", userId)
  const usersPostsRef = collection(db, "userList", userId, "posts")
  const [value, userLoading, error] = useDocumentData(userRef)
  const [postValues, postsLoading, postsError] = useCollectionData(usersPostsRef)
  const [isSameUser, setIsSameUser] = useState(false)

  useEffect(() => {
    if (user?.uid === userId) {
      setIsSameUser(true)
    }

    if (!user) {
      redirect('/LogInSignIn?mode=logIn')
    }

    if (!userLoading) {
      if (!value) {
        notFound()
      }
    }
  }, [loading])

  async function removeThePost(postId) {
    const usersPost = doc(db, "userList", userId, "posts", postId)
    const postList = doc(db, "posts", postId)
    await deleteDoc(usersPost).then(() => deleteDoc(postList))
  }

  postValues?.sort((a, b) => b.createdAt - a.createdAt)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">

      {userLoading ? <p>Loading...</p> :
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40, transition: { duration: 0.5 } }} className="mb-14">
          <div className="flex justify-center">
            <p className="text-blue-800 font-semibold text-4xl max-md:text-3xl max-md:mb-4 max-sm:text-2xl">{value.name}</p>
          </div>

          <div className="flex justify-between mb-4 items-center">
            <p className="text-lg max-md:text-base max-sm:text-sm">{postValues?.length} Ideas shared</p>
            <p className="text-gray-500 text-sm max-md:text-xs">Joined at: {dayjs(value.accountCreatedAt).format('DD / MMM / YYYY')}</p>
          </div>
          <div className="flex flex-col gap-y-4 mb-4">
            <p className="text-xl mb-4 max-md:text-base max-sm:text-base">{value.name}'s ideas</p>
            <AnimatePresence>
              {postsLoading ? <p>Posts are loading...</p> : postValues.map((post) =>
                <motion.div initial={{ opacity: -40 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 40, transition: { duration: 0.5 } }} className="border-y-2 py-3 px-2 flex flex-col gap-y-2" key={post.id}>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl text-blue-800 font-semibold max-md:text-xl max-sm:text-lg">{post.title}</p>
                    <p className="text-gray-500 max-md:text-xs text-sm whitespace-nowrap">{dayjs(post.createdAt).format('DD / MMM / YYYY')}</p>
                  </div>
                  <p className="text-gray-800 text-lg max-md:text-sm max-sm:text-sm">{post.body}</p>
                  <div className="flex flex-row gap-x-1">
                    {post.hashtag.map((tag) => <p key={tag} className="text-gray-700 text-xs hover:underline hover:cursor-pointer">#{tag}</p>)}
                  </div>

                  <div className="flex justify-between items-center">
                    <Link className="px-3 py-2 shadow-lg bg-blue-800 text-white rounded-lg text-sm duration-150 ease-in-out hover:bg-blue-600 max-md:text-xs max-sm:px-2 max-sm:py-1 " href={`/${post.id}`}>See More</Link>
                    {isSameUser && <button className=" bg-red-800 px-3 py-2 ease-in-out duration-150 shadow-lg text-sm rounded-lg text-white hover:bg-red-600 max-sm:px-2 max-sm:py-1 max-md:text-xs" onClick={() => removeThePost(post.id)}>Remove</button>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      }


      <p className="text-xl mb-4 max-md:text-base max-sm:text-lg">The posts that {isSameUser ? "you" : value?.name} liked before</p>
      {
        value?.likedPosts?.map((post) =>
          <div key={post.id}>
            <div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: 1 } }} className="flex justify-between mb-3 items-center py-3 border-y-2" >
              <p className="text-2xl text-blue-800 font-semibold hover:underline max-md:text-xl max-sm:text-lg">{post.title}</p>
              <Link className="px-3 py-2 shadow-lg bg-blue-800 text-white rounded-lg text-sm duration-150 ease-in-out hover:bg-blue-600 max-md:text-xs max-sm:px-2 max-sm:py-1 max-sm:text-xs" href={`/${post.id}`}>See More</Link>
            </div>
          </div>
        )
      }

    </motion.div >
  )
}