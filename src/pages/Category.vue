<script setup>
import ForumList from '@/components/ForumList.vue'
import {computed, onBeforeMount} from 'vue'
import {useCategoryStore} from '@/stores/CategoryStore'
import {useForumStore} from '@/stores/ForumStore'
import {findById} from '@/helpers'

const categoryStore = useCategoryStore()
const forumStore = useForumStore()

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const category = computed(() => findById(categoryStore.categories, props.id)) || {}

const getForumsForCategories = (category) => forumStore.forums.filter(forum => forum.categoryId === category.id)

onBeforeMount( async () => {
  const cat = await categoryStore.fetchCategory(props.id)
  forumStore.fetchForums(cat.forums)
})

</script>

<template>
    <div v-if="category" class="col-full push-top">
        <h1>{{ category.name }}</h1>
        <ForumList :forums="getForumsForCategories(category)"
                   :title="category.name"
        />
    </div>

</template>

<style scoped>

</style>