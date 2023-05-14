<script setup>
const props = defineProps({
  forums: {
    required: true,
    type: Array
  },
  title: {
    type: String,
    default: 'Forums'
  },
  categoryId: {
    required: false,
    type: String
  }
})
</script>

<template>
    <div class="col-full">
        <div class="forum-list">
            <h2 class="list-title">
                <RouterLink v-if="categoryId" :to="{name: 'Category', params: {id: categoryId}}">
                    {{  title }}
                </RouterLink>
                <span v-else>{{ title}}</span>
            </h2>
            <div class="forum-listing" v-for="forum in forums" :key="forum.id">
                <div class="forum-details">
                    <RouterLink :to="{ name: 'Forum', params: {id: forum.id}}" class="text-xlarge">
                        {{ forum.name }}
                    </RouterLink>
                    <p>{{ forum.description }}</p>
                </div>
                <div class="threads-count">
                    <p>
                        <span class="count">{{ forum.threads?.length || "0" }}</span>
                        {{ forum.threads?.length === 1 ? 'thread' : 'threads' }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>