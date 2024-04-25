import Link from "next/link"
import { logOut } from "@/Utils/UserAuth";
export default function Buttons({ type, redirectLink, children }) {
  if (type === "nav") {
    return (
      <Link className="bg-blue-800 min-w-32 text-center mb-8 text-white font-bold px-4 py-2 rounded-md shadow-md duration-150 ease-in-out hover:bg-blue-900 focus:outline-none focus:ring-2 focus:white focus:ring-offset-2 max-lg:text-xs max-lg:min-w-min" href={redirectLink}>{children}</Link>
    )
  } else if (type === "auth") {
    return (
      <button className="bg-blue-800 min-w-32 text-center mb-8 text-white px-4 py-2 rounded-md shadow-md font-bold duration-150 ease-in-out hover:bg-blue-900 focus:outline-none focus:ring-2 focus:white focus:ring-offset-2 max-lg:text-xs max-lg:min-w-min" onClick={logOut}>Log Out</button>
    )
  } else if (type === "newPost") {
    return (
      <Link className="bg-blue-800 mb-8 text-white px-4 py-2 rounded-3xl font-bold shadow-md duration-150 ease-in-out hover:bg-blue-900 hover:rounded-sm focus:outline-none focus:ring-2 focus:white focus:ring-offset-2 max-lg:text-xs max-lg:min-w-min" href={redirectLink}>{children}</Link>
    )
  } 
}