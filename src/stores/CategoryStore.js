import {defineStore} from 'pinia'
import {fetchItem, fetchItems, upsert} from '@/helpers'
import {ref} from "vue";

export const useCategoryStore = defineStore('CategoryStore', () => {
  /* ======
   'state'
  ====== */
  const categories = ref([])

  /* =====================
   functions aka 'actions'
   ==================== */
  function fetchCategory(id) {
    return fetchItem({id, stateResource: categories.value, resource: 'categories'})
  }
  function fetchCategories(ids) {
    return fetchItems(ids, 'categories', categories.value)
  }
  function fetchAllCategories() {
    return fetchItems([], 'categories', categories.value)
  }
  function setCategory(category) {
    upsert(categories.value, category)
  }

  return {categories, fetchCategory, fetchCategories, fetchAllCategories, setCategory}
})