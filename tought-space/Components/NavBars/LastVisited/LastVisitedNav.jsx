"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebaseConfig"
import LastVisitedPosts from "@/Components/NavBars/LastVisited/LastVisitedPosts"
export default function LastVisitedNav() {

  const [user, loading] = useAuthState(auth)

  if (user) {
    return (
      <div className="py-3 w-full rounded-xl bg-blue-100 shadow-2xl backdrop:blur-3xl bg-opacity-50">
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-8 font-semibold text-blue-800 max-lg:text-sm max-sm:text-center">Last Visited</p>
        </div>
        <LastVisitedPosts />
      </div>
    )

  }

}