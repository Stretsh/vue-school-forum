import {defineStore} from 'pinia'
import {fetchItem, fetchItems, upsert} from '@/helpers'
import {ref} from 'vue'

export const useForumStore = defineStore('ForumStore', () => {
  /* ======
   'state'
  ====== */
  const forums = ref([])

  /* =====================
   functions aka 'actions'
   ==================== */
  function fetchForum(id) {
    return fetchItem({id, stateResource: forums.value, resource: 'forums'})
  }
  function fetchForums(ids) {
    return fetchItems(ids, 'forums', forums.value)
  }
  function setForum(forum) {
    upsert(forums.value, forum)
  }

  return {forums, fetchForum, fetchForums, setForum}
})