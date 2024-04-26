export default function UserNotFound() {
  return (
    <div className="flex flex-col p-3 gap-y-9 w-2/4 items-center bg-gray-100 shadow-xl text-black rounded-lg max-sm:w-full">
      <div className="w-full flex justify-center items-center h-full">
        <p className="text-2xl text-blue-800 font-semibold text-center">The user that you are looking for is not found.</p>
      </div>
    </div>
  )
}