import {defineStore, storeToRefs} from 'pinia'
import { useThreadStore } from '@/stores/ThreadStore'
import { useUserStore } from '@/stores/UserStore'
import { addChildToParent, fetchItem, fetchItems, setItem } from '@/helpers'
import { ref } from 'vue'

export const usePostStore = defineStore('PostStore', () => {
  /* ==================
   import other stores
  ================== */
  const {threads} = storeToRefs(useThreadStore())
  const {authId} = storeToRefs(useUserStore())

  /* ======
   'state'
  ====== */
  const posts = ref([])

  /* =====================
   functions aka 'actions'
   ==================== */
  function createPost (post) {
    post.id = 'dddd' + Math.random()
    post.userId = authId
    post.publishedAt = Math.floor(Date.now() / 1000)
    setItem(posts.value, post)

    addPostToThread(post.threadId, post.id)
    addContributorToThread(post.threadId, post.contributors)
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

  return {posts, createPost, fetchPost, fetchPosts, addPostToThread, addContributorToThread}
})