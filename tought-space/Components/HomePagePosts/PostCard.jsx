import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "@/app/firebaseConfig"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import { addViewData } from "@/Utils/PostUtils"
import dayjs from "dayjs"
import Image from "next/image"
export default function PostCard({ post, setFilter }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (!user) {
      redirect('/LogInSignIn?mode=logIn')
    }
  }, [user])


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white bg-opacity-90 backdrop:blur-lg shadow-xl flex p-3 flex-col gap-y-5 overflow-hidden text-white justify-around rounded-xl w-full">
      <div className="flex flex-col">
        <p className="text-2xl mb-2 text-blue-800 font-semibold max-sm:text-lg">{post.title}</p>
        <p className="text-xs text-gray-500">{dayjs(post.createdAt).format('DD / MM / YYYY')}</p>
      </div>

      <div className="flex text-ellipsis border-y-2 py-4">
        <p className="line-clamp-3 text-lg text-gray-600 font-medium max-md:text-base max-sm:text-sm">{post.body}</p>
      </div>

      <div className="flex flex-row gap-x-1 flex-wrap">
        {post.hashtag.map((tag) => <p key={tag} onClick={() => setFilter(tag)} className="text-gray-700 text-xs hover:underline hover:cursor-pointer">#{tag}</p>)}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex h-full items-center">
          <div className="flex h-full mr-4 w-10 rounded-3xl relative max-md:w-7">
            <Image src={post.creator.ppURL} alt="profilePic" sizes="(max-width: 768px)" fill className="rounded-3xl" style={{ objectFit: 'cover' }} loading="lazy" />
          </div>
          <Link href={`/users/${post.postOwner}`} className="text-base  text-gray-500 duration-150 ease-in-out font-semibold hover:cursor-pointer hover:underline hover:text-gray-800 max-sm:text-sm">{post.ownerName}</Link>
        </div>

        <Link className="px-3 py-2 shadow-lg bg-blue-800 text-white rounded-lg text-base duration-150 ease-in-out hover:bg-blue-600 max-md:px-2 max-md:py-1 max-md:text-sm max-sm:px-2 max-sm:py-1 max-sm:text-sm" onClick={() => addViewData(post.id, post, user.uid)} href={`/${post.id}`}>See more</Link>
      </div>

    </motion.div>
  )
}