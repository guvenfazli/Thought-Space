"use client"
import Link from "next/link"
export default function PostCard() {
  return (
    <div className="bg-white bg-opacity-90 backdrop:blur-lg shadow-xl flex p-3 flex-col gap-y-5 overflow-hidden text-white justify-around rounded-xl w-full">
      <div className="flex flex-col">
        <p className="text-2xl mb-2 text-blue-800 font-semibold max-sm:text-lg">NEW PAGE</p>
        <p className="text-xs text-gray-500">25 / 04 / 2024</p>
      </div>

      <div className="flex text-ellipsis border-y-2 py-4">
        <p className="line-clamp-3 text-lg text-gray-600 font-medium max-md:text-base max-sm:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum omnis fugit temporibus voluptatum facere aliquam sint debitis esse nemo.</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base  text-gray-500 duration-150 ease-in-out font-semibold hover:cursor-pointer hover:underline hover:text-gray-800 max-sm:text-sm" >Güven</p>

        <Link className="px-3 py-2 shadow-lg bg-blue-800 text-white rounded-lg text-base duration-150 ease-in-out hover:bg-blue-600 max-md:px-2 max-md:py-1 max-md:text-sm max-sm:px-2 max-sm:py-1 max-sm:text-sm" href={`/available/Test`}>See more</Link>
      </div>

    </div>
  )
}