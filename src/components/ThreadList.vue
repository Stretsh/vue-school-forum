<script setup>
import {reactive} from "vue"
import {storeToRefs} from "pinia"
import {usePostStore} from "@/stores/PostStore"
import {useUserStore} from "@/stores/UserStore"
import {findById} from "@/helpers"
import AppDate from "@/components/AppDate.vue";


const { posts } = storeToRefs(usePostStore())
const { users } = storeToRefs(useUserStore())

const props = defineProps({
    threads: {
        type: Array,
        required: true
    }
})

const postById = (postId) => {
  return posts.value.find(p => p.id === postId)
}

const userById = (userId) => findById(users.value, userId) || {}
// const userById = (userId) => {
//     const test = findById(users.value, userId)
//     // console.log({...test}.name)
//     return {...test}
// }
</script>

<template>
    <div v-if="threads" class="col-full">
        <div class="thread-list">
            <h2 class="list-title">Threads</h2>

            <div v-for="thread in threads" :key="thread.id" class="thread">
                <div>
                    <p v-if="thread.value.id"><RouterLink :to="{name: 'ThreadShow', params: {id: thread.value.id}}">
                        {{ thread.value.title }}
                    </RouterLink></p>
                    <p v-else>{{ thread.value.title }}</p>
                    <p class="text-faded text-small">
                        By <a href="#">{{ userById(thread.value.userId).name }}</a>,
                        <AppDate :timestamp="thread.value.publishedAt || 0" />
                    </p>
                </div>

                <div class="activity">
                    <p class="replies-count">
                        {{ thread.value.repliesCount}} replies
                    </p>

                    <img :src="userById(thread.value.userId).avatar" alt="" class="avatar-medium">

                    <div>
                        <p class="text-xsmall"><a href="#">{{ userById(thread.value.userId).name }}</a></p>
                        <p class="text-xsmall text-faded"><AppDate :timestamp="thread.value.publishedAt || 0" /></p>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>