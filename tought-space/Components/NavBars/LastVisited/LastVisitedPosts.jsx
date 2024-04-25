import { db } from "@/app/firebaseConfig"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth } from "@/app/firebaseConfig"
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

function LastPostRef() {
  const userId = JSON.parse(localStorage.getItem('user'))
  let userRef;
  if (userId) {
    userRef = collection(db, "userList", userId?.id, "lastPosts")
  }

  const [snapshot, dataLoading] = useCollectionData(userRef, { snapshotListenOptions: { includeMetadataChanges: true } })

  return (
    <div className="max-h-60 min-h-40 overflow-scroll overflow-x-hidden ">
      {snapshot?.map((post) =>
        <Link href={`/available/${post.id}`} className="p-3 flex justify-between items-center duration-150 ease-in-out bg-blue-800 mb-3 hover:bg-blue-500 hover:cursor-pointer" key={post.id}>
          <p className="text-sm text-white font-semibold max-lg:text-xs max-lg:text-center">{post.title}</p>
          <p className="text-black font-bold px-1.5 rounded-full bg-white max-lg:hidden" href={`/available/${post.id}`}>&gt;</p>
        </Link>
      )}
    </div>
  )
}



export default function LastVisitedPosts() {
  const [isUser, isLoading] = useAuthState(auth)

  if (isUser) {
    return (
      <LastPostRef />
    )
  }
}
