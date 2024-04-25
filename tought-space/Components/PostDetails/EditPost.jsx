import { useEffect, useRef, useState } from "react"
import { db } from "@/app/firebaseConfig"
import { doc, updateDoc } from "firebase/firestore"
import dayjs from "dayjs"

export default function EditPost({ value, postRef, userId, edit }) {
  const docRefForUser = doc(db, "userList", userId, "posts", value.id)
  const docRef = doc(db, "posts", value.id)

  const [oldLog, setOldLog] = useState()

  const [editInfo, setEditInfo] = useState({
    title: "",
    body: ""
  })

  const titleRef = useRef()
  const bodyRef = useRef()

  function getEditInfo(inputType, ref) {
    setEditInfo((prev) => {
      let updatedInfo = { ...prev, [inputType]: ref.current.value }
      return updatedInfo
    })
  }


  useEffect(() => {
    const getDate = new Date
    const editDate = getDate.getTime()
    if (!value.edited) {
      setOldLog([{
        title: value.title,
        body: value.body,
        editDate: editDate
      }])
    } else {
      setOldLog(() => {
        let olderLogs = [...value.edited]
        olderLogs.push({ title: value.title, body: value.body })
        return olderLogs
      })
    }

  }, [])


  async function editPost() {
    await updateDoc(docRef, {
      title: editInfo.title,
      body: editInfo.body,
      edited: oldLog
    }).then(async () => {
      await updateDoc(docRefForUser, {
        title: editInfo.title,
        body: editInfo.body,
        edited: oldLog
      })
    })

    edit(false)
  }

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex justify-center">
        <p className="text-3xl mb-2 text-blue-800 font-semibold max-md:text-xl">{value.title}</p>
      </div>
      <div className="flex justify-between flex-row">
        <p className="text-gray-500 duration-150 ease-in-out font-semibold hover:cursor-pointer hover:underline hover:text-gray-800">{value.ownerName}</p>
        <p className="text-sm text-gray-500 whitespace-nowrap">{dayjs(value.createdAt).format('DD / MMM / YYYY')}</p>
      </div>
      <div className="border-y-4 py-3 flex flex-col px-2">
        <input ref={titleRef} className="mb-3" onChange={() => getEditInfo("title", titleRef)} type="text" placeholder={value.title} />
        <textarea ref={bodyRef} onChange={() => getEditInfo("body", bodyRef)} type="text" placeholder={value.body} />
      </div>
      <div className="flex justify-around">
        <button className="bg-blue-800 px-3 py-2 rounded-lg text-white text-sm duration-150 ease-in-out font-bold hover:bg-blue-600" onClick={() => editPost()}>Done Editing</button>
        <button className="bg-green-800 px-3 py-2 rounded-lg text-white text-sm duration-150 ease-in-out font-bold hover:bg-green-600 max-md:px-2 max-md:py-1" onClick={() => likeThePost(value)}>Like the Post!</button>
      </div>

      <div className="flex justify-center">
        <p className="text-2xl text-blue-700 font-semibold max-md:text-lg">Viewer Stats</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg max-md:text-base"><span className="text-lg text-gray-500 max-md:text-base">Idea Viewed:</span> {value.timesClicked}</p>
        <p className="text-lg max-md:text-base"><span className="text-lg text-gray-500 max-md:text-base">Agreed:</span> {value.likes.length}</p>
      </div>
    </div>
  )
}