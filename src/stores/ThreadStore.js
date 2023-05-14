import {defineStore, storeToRefs} from 'pinia'
import {useUserStore} from '@/stores/UserStore'
import {usePostStore} from '@/stores/PostStore'
import {useForumStore} from '@/stores/ForumStore'
import {addChildToParent, fetchItem, fetchItems, findById, setItem} from '@/helpers'
import {computed, reactive, ref} from 'vue'


export const useThreadStore = defineStore('ThreadStore', () => {
  /* ==================
   import other stores
  ================== */
  const {users, authId} = storeToRefs(useUserStore())
  const {posts} = storeToRefs(usePostStore())
  const createPost = usePostStore().createPost
  const {forums} = storeToRefs(useForumStore())

  /* ======
   'state'
  ====== */
  const threads = ref([])

  /* =====================
   computed aka 'getters'
  ===================== */
  const thread = (id) => computed(() => {
    const {users} = storeToRefs(useUserStore())
    const thread = findById(threads.value, id)
    if (!thread) return {}
    return {
      ...thread,
      get author () {

        return findById(users.value, thread.userId)
      },
      get repliesCount () {
        return thread.posts.length - 1
      },
      get contributorsCount () {
        return thread.contributors?.length || 0
      }
    }
  })

  /* =====================
   functions aka 'actions'
   ==================== */
  async function createThread ({ text, title, forumId }) {
    const id = 'tttt' + Math.random()
    const userId = authId
    const publishedAt = Math.floor(Date.now() / 1000)
    const thread = {forumId, title, text, publishedAt, userId, id}

    setItem(threads.value, thread)
    createPost({text: thread.text, threadId: thread.id})

    addThreadToForum(thread.forumId, thread.id)
    addThreadToUser(thread.userId, thread.id)

    return findById(threads.value, thread.id)
  }
  async function updateThread ({ title, text, id }) {
    const thread = findById(threads.value, id)
    const post = findById(posts, thread.posts[0])

    setItem(threads.value, { ...thread, title })
    setItem(posts.value, { ...post, text })
    return { ...thread, title }

  }
  function fetchThread (id) {
    return fetchItem({id, stateResource: threads.value, resource: 'threads'})
  }
  function fetchThreads (ids) {
    return fetchItems(ids, 'threads', threads.value)
  }
  function addThreadToForum (forumId, threadId) {
    return addChildToParent(forums.value, 'threads', forumId, threadId)
  }
  function addThreadToUser (userId, threadId) {
    return addChildToParent(users.value, 'threads', userId, threadId)
  }

  return {threads, thread, createThread, updateThread, fetchThread, fetchThreads}
})