<script setup>
import ForumList from '@/components/ForumList.vue'
import {useForumStore} from '@/stores/ForumStore'

const forums = useForumStore().forums

const props = defineProps({
  categories: {
    required: true,
    type: Array
  }
})

const getForumsForCategories = (category) => {
    console.log(category)
  return forums.filter(forum => forum.categoryId === category.id)
}

</script>

<template>
    <ForumList
        v-for="category in categories"
        :forums="getForumsForCategories(category)"
        :key="category.id"
        :title="category.name"
        :category-id="category.id"
    />
</template>

<style scoped>

</style>