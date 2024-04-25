export default function SignIn() {

  return (
    <form className="flex flex-col p-1 gap-y-4">
      <label htmlFor="name" className="text-2xl">Name</label>
      <input type="text" name="name" className="text-black p-2 rounded-xl" placeholder="Name" />
      <label htmlFor="age" className="text-2xl">Age</label>
      <input type="text" name="age" className="text-black p-2 rounded-xl" placeholder="Age" />
      <label htmlFor="email" className="text-2xl">Email</label>
      <input type="email" name="email" className="text-black p-2 rounded-xl" placeholder="Email" />
      <label htmlFor="password" className="text-2xl">Password</label>
      <input type="password" name="password" className="text-black p-2 rounded-xl" placeholder="Password" />
      <div className="flex justify-center items-center">
        <button type="submit" className="py-2 px-8 border-2 rounded-2xl bg-blue-600 duration-150 ease-in-out hover:bg-blue-700 text-white font-bold">Sign In</button>
      </div>
    </form>
  )
}