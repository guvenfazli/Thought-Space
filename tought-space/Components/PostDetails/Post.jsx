export default function Post({ value, like, edit }) {

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
        <button className="bg-blue-800 px-3 py-2 rounded-lg text-white text-sm duration-150 ease-in-out font-bold hover:bg-blue-600 max-md:px-2 max-md:py-1"
          onClick={() => edit(true)}>Edit Post</button>
        <button className="bg-green-800 px-3 py-2 rounded-lg text-white text-sm duration-150 ease-in-out font-bold hover:bg-green-600 max-md:px-2 max-md:py-1" onClick={() => likeThePost(value)}>Like the Post!</button>
      </div>

      <div className="flex justify-center">
        <p className="text-2xl text-blue-700 font-semibold max-md:text-lg">Viewer Stats</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg max-md:text-base"><span className="text-lg text-gray-500 max-md:text-base">Idea Viewed:</span> {value.timesClicked}</p>
        <p className="text-lg max-md:text-base"><span className="text-lg text-gray-500 max-md:text-base">Agreed:</span> {value.likes.length}</p>
      </div>

      <p className="text-sm text-gray-500">{value.edited && "This post has edited before."}</p>
    </div>



  )
}