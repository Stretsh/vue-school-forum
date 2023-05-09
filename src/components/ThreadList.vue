<script setup>
import {reactive} from "vue"
import {storeToRefs} from "pinia"
import {usePostsStore} from "@/stores/PostsStore"
import {useUsersStore} from "@/stores/UsersStore"
import {findById} from "@/helpers"


const { posts } = storeToRefs(usePostsStore())
const { users } = storeToRefs(useUsersStore())

const props = defineProps({
    threads: {
        type: Array,
        required: true
    }
})

const postById = (postId) => {
  return posts.find(p => p.id === postId)
}

const userById = (userId) => findById(users.value, userId)
</script>

<template>
    <div class="col-full">
        <div class="thread-list">
            <h2 class="list-title">Threads</h2>

            <div v-for="thread in threads" :key="thread.id" class="thread">
                <div>
                    <p><RouterLink :to="{name: 'ThreadShow', params: {id: thread.id}}">{{ thread.title}}</RouterLink></p>
                    <p class="text-faded text-small">
                        By <a href="#">{{ userById(thread.userId).name }}</a>,
                        <AppDate :timestamp="thread.publishedAt" />
                    </p>
                </div>

                <div class="activity">
                    <p class="replies-count">
                        {{ thread.posts.length}} replies
                    </p>

                    <img :src="userById(thread.userId).avatar" alt="" class="avatar-medium">

                    <div>
                        <p class="text-xsmall"><a href="#">{{ userById(thread.userId).name }}</a></p>
                        <p class="text-xsmall text-faded"><AppDate :timestamp="thread.publishedAt" /></p>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>