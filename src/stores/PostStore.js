import {defineStore, storeToRefs} from 'pinia'
import {collection, addDoc, updateDoc, arrayUnion, doc, writeBatch, serverTimestamp, getDoc, increment} from 'firebase/firestore'
import { useThreadStore } from '@/stores/ThreadStore'
import { useUserStore } from '@/stores/UserStore'
import { addChildToParent, fetchItem, fetchItems, setItem } from '@/helpers'
import { ref } from 'vue'
import {db} from '@/firebase'

export const usePostStore = defineStore('PostStore', () => {
  /* ==================
   import other stores
  ================== */
  const {threads} = storeToRefs(useThreadStore())

  /* ======
   'state'
  ====== */
  const posts = ref([])

  /* =====================
   functions aka 'actions'
   ==================== */
  async function createPost (post) {
    const {authId} = storeToRefs(useUserStore())
    post.userId = authId.value
    post.publishedAt = serverTimestamp()
    console.log(post)

    const batch = writeBatch(db)
    const postRef = doc(collection(db, 'posts'))
    batch.set(postRef, post)

    const threadRef = doc(db, 'threads', post.threadId)
    const userRef = doc(db, 'users', post.userId)
    batch.update(threadRef, {
      posts: arrayUnion(postRef.id),
      contributors: arrayUnion(post.userId)
    })
    batch.update(userRef, {
      postsCount: increment(1)
    })

    await batch.commit()

    const newPost = await getDoc(postRef)
    useUserStore().fetchAuthUser()
    setItem(posts.value, {...newPost.data(), id: newPost.id})

    addPostToThread(post.threadId, newPost.id)
    addContributorToThread(post.threadId, post.userId)
  }
  async function updatePost ({ text, id }) {
    console.log('Post id in updatePost', id)
    const updateData = {
      text,
      edited: {
        at: serverTimestamp(),
        by: useUserStore().authId,
        moderated: false
      }
    }
    const postRef = doc(db, 'posts', id)
    await updateDoc(postRef, updateData)

    await fetchPost(id)
  }

  function fetchPost (id) {
    return fetchItem({id, stateResource: posts.value, resource: 'posts'})
  }
  function fetchPosts (ids) {
    return fetchItems(ids, 'posts', posts.value)
  }
  function addPostToThread (threadId, postId) {
    return addChildToParent(threads.value, 'posts', threadId, postId)
  }
  function addContributorToThread(threadId, userId) {
    return addChildToParent(threads.value, 'contributors', threadId, userId)
  }

  return {posts, createPost, updatePost, fetchPost, fetchPosts, addPostToThread, addContributorToThread}
})