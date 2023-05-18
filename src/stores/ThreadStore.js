import {defineStore, storeToRefs} from 'pinia'
import {useUserStore} from '@/stores/UserStore'
import {usePostStore} from '@/stores/PostStore'
import {useForumStore} from '@/stores/ForumStore'
import {addChildToParent, fetchItem, fetchItems, findById, setItem} from '@/helpers'
import {computed, ref} from 'vue'
import {arrayUnion, collection, doc, writeBatch, serverTimestamp, getDoc} from 'firebase/firestore'
import {db} from '@/firebase'


export const useThreadStore = defineStore('ThreadStore', () => {
  /* ==================
   import other stores
  ================== */
  const {forums} = storeToRefs(useForumStore())

  /* ======
   'state'
  ====== */
  const threads = ref([])

  /* =====================
   computed aka 'getters'
  ===================== */
  const thread = (id) => computed(() => {
    const thread = findById(threads.value, id)
    if (!thread) return {}
    return {
      ...thread,
      get author () {
        const authors = ref(useUserStore().users)
        return authors.value.find(r => r.id === thread.userId)
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
    const userId = ref(useUserStore().authId).value

    const userRef = doc(db, 'users', userId)
    const publishedAt = serverTimestamp()
    const threadRef = doc(collection(db, 'threads'))
    const thread = {forumId, title, publishedAt, userId, id: threadRef.id}
    const forumRef = doc(db, 'forums', forumId)

    const batch = writeBatch(db)
    batch.set(threadRef, thread)
    batch.update(userRef, { threads: arrayUnion(threadRef.id)} )
    batch.update(forumRef, { threads: arrayUnion(threadRef.id)} )
    await batch.commit()

    const newThread = await getDoc(threadRef)
    setItem(threads.value, newThread)
    addThreadToForum(forumId, newThread.id)
    addThreadToUser(userId, newThread.id)
    await usePostStore().createPost({text, threadId: newThread.id})

    return findById(threads.value, newThread.id)
  }
  async function updateThread ({ title, text, id }) {
    const thread = findById(threads.value, id)

    const threadRef = doc(db, 'threads', id)
    const postRef = doc(db, 'posts', thread.posts[0])
    const batch = writeBatch(db)
    batch.update(threadRef, { title })
    batch.update(postRef, { text })
    await batch.commit()

    const newThread = await fetchThread(id)
    await usePostStore().fetchPost(thread.posts[0])

    return newThread
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
    console.log('Users for thread-to-user', useUserStore().users)
    return addChildToParent(useUserStore().users, 'threads', userId, threadId)
  }

  return {threads, thread, createThread, updateThread, fetchThread, fetchThreads}
})