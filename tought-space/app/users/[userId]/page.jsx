import UserProfile from "@/Components/UserProfile/UserProfile"
export default function UserDetailPage({ params }) {

  const userId = params.userId

  return (
    <div className="flex flex-col p-3 gap-y-9 w-2/4 items-center bg-gray-100 shadow-xl text-black rounded-lg max-sm:w-full">
      <UserProfile userId={userId}/>
    </div>
  )
}