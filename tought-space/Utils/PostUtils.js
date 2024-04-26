import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
import { getDoc, updateDoc } from "firebase/firestore"
import dayjs from "dayjs"

export async function likeThePost(post, userId, postRef) {
  const getUserRef = doc(db, "userList", userId)
  const currentUser = await getDoc(getUserRef).then((data) => data.data())
  const alreadyLiked = currentUser.likedPosts.some((postId) => postId.id === post.id)
  let likedPostsList = [...currentUser.likedPosts]

  if (!alreadyLiked) {
    likedPostsList.push(post)
    await updateDoc(getUserRef, {
      ...currentUser,
      likedPosts: likedPostsList
    })
  } else {
    let alreadyIndex = currentUser.likedPosts.findIndex((post) => post.id === post.id)
    likedPostsList.splice(alreadyIndex, 1)
    await updateDoc(getUserRef, {
      ...currentUser,
      likedPosts: likedPostsList
    })
  }

  const getChosenDoc = await getDoc(postRef).then((data) => data.data())
  const userAlreadyLiked = getChosenDoc.likes.some((user) => user === userId)
  let likedUsersList = [...getChosenDoc.likes]
  if (!userAlreadyLiked) {
    likedUsersList.unshift(userId)
    await updateDoc(postRef, {
      ...getChosenDoc,
      likes: likedUsersList
    })
  } else {
    let alreadyIndex = getChosenDoc.likes.findIndex((user) => user === userId)
    likedUsersList.splice(alreadyIndex, 1)
    await updateDoc(postRef, {
      ...getChosenDoc,
      likes: likedUsersList
    })
  }
}

export async function createNewPost(post, userId) {
  const postListRef = collection(db, "posts")
  const createrOfPostRef = doc(db, "userList", userId)
  const creator = await getDoc(createrOfPostRef).then((data) => data.data())
  const time = new Date;
  const postCreatedAt = time.getTime();
  let uniquePostId;
  await addDoc(postListRef, {...post, postOwner: userId, ownerName: creator.name, postId: postListRef.id, createdAt: postCreatedAt}).then((createdPost) => {
    uniquePostId = createdPost.id
    return setDoc(doc(db, "posts", createdPost.id), {...post, id:createdPost.id, postOwner: userId, ownerName: creator.name, createdAt: postCreatedAt})
  }).then(() => setDoc(doc(db,"userList", userId, "posts", uniquePostId),{...post, id: uniquePostId, postOwner: userId, ownerName: creator.name, createdAt: postCreatedAt}))

}