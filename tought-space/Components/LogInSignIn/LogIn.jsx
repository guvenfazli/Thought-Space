export default function LogIn() {

  return (
    <form className="flex flex-col p-1 gap-y-4">
      <label htmlFor="email" className="text-2xl">Email</label>
      <input type="email" name="email" className="text-black p-2 rounded-xl" placeholder="Email" />
      <label htmlFor="password" className="text-2xl">Password</label>
      <input type="password" name="password" className="text-black p-2 rounded-xl" placeholder="Password" />
      <div className="flex justify-center items-center">
        <button type="submit" className="py-2 px-8 border-2 rounded-2xl duration-150 ease-in-out bg-blue-800 hover:bg-blue-500 text-white font-bold">Log In</button>
      </div>

    </form>
  )
}