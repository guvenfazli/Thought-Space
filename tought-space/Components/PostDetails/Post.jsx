import dayjs from "dayjs"

import { doc } from "firebase/firestore"
import { auth, db } from "@/app/firebaseConfig"
import { getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Post({ value, edit, postRef, userId }) {
  const [sameUser, setSameUser] = useState(false)
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (value.postOwner === user.uid) {
      setSameUser(true)
    }
  }, [loading])
  console.log(value)

  const latestEdits = value.edited?.sort((a, b) => b.editDate - a.editDate)

  async function likeThePost(post, userId, postRef) {
    const getUserRef = doc(db, "userList", userId)
    const currentUser = await getDoc(getUserRef).then((data) => data.data())
    const alreadyLiked = currentUser.likedPosts.some((postId) => postId.id === post.id)
    let likedPostsList = [...currentUser.likedPosts]

    if (!alreadyLiked) {
      likedPostsList.push(post)
      await updateDoc(getUserRef, {
        ...currentUser,
        likedPosts: likedPostsList
      })
    } else {
      let alreadyIndex = currentUser.likedPosts.findIndex((post) => post.id === post.id)
      likedPostsList.splice(alreadyIndex, 1)
      await updateDoc(getUserRef, {
        ...currentUser,
        likedPosts: likedPostsList
      })
    }

    const getChosenDoc = await getDoc(postRef).then((data) => data.data())
    const userAlreadyLiked = getChosenDoc.likes.some((user) => user === userId)
    let likedUsersList = [...getChosenDoc.likes]
    if (!userAlreadyLiked) {
      likedUsersList.unshift(userId)
      await updateDoc(postRef, {
        ...getChosenDoc,
        likes: likedUsersList
      })
    } else {
      let alreadyIndex = getChosenDoc.likes.findIndex((user) => user === userId)
      likedUsersList.splice(alreadyIndex, 1)
      await updateDoc(postRef, {
        ...getChosenDoc,
        likes: likedUsersList
      })
    }
  }

  return (

    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex justify-center">
        <p className="text-3xl mb-2 text-blue-800 font-semibold max-md:text-xl">{value.title}</p>
      </div>
      <div className="flex justify-between flex-row">
        <p className="text-gray-500 duration-150 ease-in-out font-semibold hover:cursor-pointer hover:underline hover:text-gray-800">{value.ownerName}</p>
        <p className="text-sm text-gray-500 whitespace-nowrap">26 / 04 / 2024</p>
      </div>
      <div className="border-y-4 py-3 flex flex-col px-2">
        <p className="mb-3 text-xl text-blue-800 font-medium max-md:text-lg">{value.title}</p>
        <p className="text-lg text-gray-600 font-medium max-md:text-base">{value.body}</p>
      </div>
      <div className="flex justify-around">
        {sameUser && <button className="bg-blue-800 px-3 py-2 rounded-lg text-white text-sm duration-150 ease-in-out font-bold hover:bg-blue-600 max-md:px-2 max-md:py-1"
          onClick={() => edit(true)}>Edit Post</button>
        }
        <button className="bg-green-800 px-3 py-2 rounded-lg text-white text-sm duration-150 ease-in-out font-bold hover:bg-green-600 max-md:px-2 max-md:py-1"
          onClick={() => likeThePost(value, userId, postRef)}>Like the Post!</button>
      </div>

      <div className="flex justify-center">
        <p className="text-2xl text-blue-700 font-semibold max-md:text-lg">Viewer Stats</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg max-md:text-base"><span className="text-lg text-gray-500 max-md:text-base">Idea Viewed:</span> {value.timesClicked}</p>
        <p className="text-lg max-md:text-base"><span className="text-lg text-gray-500 max-md:text-base">Agreed:</span> {value.likes.length}</p>
      </div>

      <p className="text-sm text-gray-500">{value.edited && "This post has edited before."}</p>

      {
        latestEdits?.map((editHistory) =>
          <div key={value.id} className="flex flex-col border-2 text-lg items-start p-3">
            <div className="mb-3">
              <p className="text-sm text-gray-500 max-md:text-xs">Edit Date: {dayjs(editHistory.editDate).format('DD / MM / YYYY')}</p>
            </div>

            <div>
              <p className="mb-3 max-md:text-base">Old Title: {editHistory.title}</p>
              <p className="max-md:text-base">Old Text: {editHistory.body}</p>
            </div>
          </div>
        )}
    </div>



  )
}