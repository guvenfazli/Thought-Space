import PostDetailCard from "@/Components/PostDetails/PostDetailCard"

export default function PostDetails({ params }) {

  const postId = params.postId

  return (
    <PostDetailCard postId={postId} />
  )
}