"use client"

import { auth } from "@/app/firebaseConfig"
import { redirect } from "next/navigation"
import { useRef, useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { createNewPost } from "@/Utils/PostUtils"
import { AnimatePresence, motion } from "framer-motion"


export default function NewPost() {

  const [user, userLoading] = useAuthState(auth)

  if (!user) {
    redirect('/LogInSignIn?mode=logIn')
  }

  const [postInfo, setPostInfo] = useState({
    title: undefined,
    body: undefined,
    hashtag: undefined,
    timesClicked: 0,
    likes: []
  })
  const [hashTagInfo, setHashTagInfo] = useState()

  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)
  const [postError, setPostError] = useState(false)
  const titleRef = useRef()
  const bodyRef = useRef()
  const hashtagRef = useRef()

  function addHashTag(e) {
    if (e.key === ',') {
      hashtagRef.current.value = ''
      let hashtagList = []
      hashtagList.push(hashTagInfo.replace(',', ''))
      setPostInfo((prev) => {
        if(prev.hashtag){
          hashtagList.push(...prev.hashtag)
        }
        let post = { ...prev, hashtag: hashtagList }
        return post
      })
      setHashTagInfo('')
    }
  }

  function creatingNewPost(inputType, ref) {
    setPostInfo((prev) => {
      let creatingPost = { ...prev, [inputType]: ref.current.value }
      return creatingPost
    })
  }

  async function createPost(post, userId, e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (postInfo.title.length <= 0 || postInfo.body.length <= 0) {
        setPostError(true)
        setLoading(false)

      } else {
        await createNewPost(post, userId)
        setLoading(false)
        setCreated(true)

      }
    } catch {
      setPostError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (created) {
      const timeOut = setTimeout(() => {
        setCreated(false)
      }, 3000)

      return (() => {
        clearTimeout(timeOut)
        redirect('/')
      })
    }

    if (postError) {
      const timeOut = setTimeout(() => {
        setPostError(false)
      }, 3000)

      return (() => {
        clearTimeout(timeOut)
      })
    }
  }, [created, postError])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-sm:w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 max-sm:text-xl">Post Your Ideas!</h2>

      <form onSubmit={(e) => createPost(postInfo, user.uid, e)} className="mb-6">

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>

          <input ref={titleRef} onChange={() => creatingNewPost("title", titleRef)} className={`shadow duration-150 ease-in-out appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${postError && "border-red-600"}`} id="title" type="text" placeholder="Title" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Share Your Ideas!
          </label>

          <textarea ref={bodyRef} onChange={() => creatingNewPost("body", bodyRef)} className={`shadow duration-150 ease-in-out appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${postError && "border-red-600"}`} id="description" rows={6} placeholder="We are listening..."></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hashtag">
            Hashtags
          </label>

          <input ref={hashtagRef} onChange={(e) => setHashTagInfo(e.target.value)} onKeyUp={addHashTag} className={`shadow duration-150 ease-in-out appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${postError && "border-red-600"}`} id="title" type="text" placeholder="Separate with ','" />
          {postInfo.hashtag?.map((hast) => <p className=" text-gray-800 text-sm hover:underline hover:cursor-pointer" key={hast}>#{hast}</p>)}
        </div>

        <div className="flex items-center justify-between">
          <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 duration-150 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300 max-sm:px-2 max-sm:py-1 max-sm:text-base" type="submit">
            {loading ? "Posting..." : "Create Post!"}
          </button>
        </div>

      </form>

      <div className="flex justify-center">
        <AnimatePresence>
          {created && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-green-500 text-white font-bold p-3 rounded-lg shadow-md max-sm:text-center max-sm:text-sm">Post Created Succesfully! Redirecting...</motion.p>}
          {postError && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-red-800 text-white font-bold p-3 rounded-lg shadow-md">Title or idea is missing!</motion.p>}
        </AnimatePresence>
      </div>
    </motion.div>

  )
}