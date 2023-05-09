<script setup>
import ForumList from "@/components/ForumList.vue"
import {computed} from "vue";
import {storeToRefs} from "pinia";
import {useCategoriesStore} from "@/stores/CategoriesStore";
import {useForumsStore} from "@/stores/ForumsStore";
import {findById} from "@/helpers";

const { categories } = storeToRefs(useCategoriesStore())
const { forums } = storeToRefs(useForumsStore())

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const category = computed(() => findById(categories.value, props.id))

const getForumsForCategories = (category) => {
  return forums.value.filter(forum => forum.categoryId === category.id)
}

</script>

<template>
    <h1>{{ category.name }}</h1>
  <ForumList :forums="getForumsForCategories(category)"
             :title="category.name"
  />
</template>

<style scoped>

</style>