import {defineStore, storeToRefs} from 'pinia'
import {computed, reactive, ref} from 'vue'
import {usePostStore} from '@/stores/PostStore'
import {useThreadStore} from '@/stores/ThreadStore'
import {fetchItem, fetchItems, findById, upsert} from '@/helpers'

export const useUserStore = defineStore('UserStore', () => {
  /* ==================
   import other stores
  ================== */
  const {posts} = storeToRefs(usePostStore())
  const {threads} = storeToRefs(useThreadStore())

  /* ======
   'state'
  ====== */
  const users = ref([])
  const authId = ref('VXjpr2WHa8Ux4Bnggym8QFLdv5C3')

  /* =====================
   computed aka 'getters'
  ===================== */
  const authUser = computed(() => users.value.find(u => u.id === authId))

  // console.log('Auth user:', authUser)

  const user = (id => computed(() => {
    const foundUser = findById(users.value, id)
    if (!foundUser) return null
    return {
      ...foundUser,
      get posts() {
        return posts.value.filter(post => post.userId === foundUser.id)
      },
      get postsCount() {
        return this.posts.length
      },
      get threads() {
        return threads.value.filter(thread => thread.userId === foundUser.id)
      },
      get threadsCount() {
        return this.threads.length
      }
    }
  }))

  /* =====================
     functions aka 'actions'
     ==================== */
  function fetchUser(id) {
    let result = null
    return fetchItem({id, stateResource: users.value, resource: 'users'})
      // .then(res => {
      //   console.log('User from fetchUser', res)
      //   return res
      // })
    // return result
  }
  function fetchAuthUser() {
    return fetchItem({id: authId.value, stateResource: users.value, resource: 'users'})
  }
  function fetchUsers(ids) {
    return fetchItems(ids, 'users', users.value)
  }
  function setUser(user) {
    upsert(users.value, user)
  }

  return { users, user, authId, authUser, fetchUser, fetchUsers, fetchAuthUser, setUser}
})