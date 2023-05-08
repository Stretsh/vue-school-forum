<script setup>
import ForumList from "@/components/ForumList.vue"
import {storeToRefs} from "pinia";
import {useForumsStore} from "@/stores/ForumsStore";

const { forums } = storeToRefs(useForumsStore())

const props = defineProps({
  categories: {
    required: true,
    type: Array
  }
})

const getForumsForCategories = (category) => {
  return forums.value.filter(forum => forum.categoryId === category.id)
}

</script>

<template>
    <ForumList
        :forums="getForumsForCategories(category)"
        v-for="category in props.categories"
        :key="category.id"
        :title="category.name"
        :category-id="category.id"
    />
</template>

<style scoped>

</style>