<script setup>
import {computed, reactive, ref} from "vue"
import PostList from "@/components/PostList.vue"
import PostForm from "@/components/PostForm.vue"
import {storeToRefs} from "pinia"
import {useThreadsStore} from "@/stores/ThreadsStore"
import {usePostsStore} from "@/stores/PostsStore";

const { threads } = storeToRefs(useThreadsStore())
const { posts } = storeToRefs(usePostsStore())
const { createPost } = usePostsStore()

const props = defineProps({
    id: {
        required: true,
        type: String
    }
})

const thread = computed(() => threads.value.find(t => t.id === props.id))
const threadPosts = computed(() => posts.value.filter(post => post.threadId === props.id))

const addPost = (eventData) => {
    const post = {
        ...eventData.post,
        threadId: props.id
    }
    createPost(post)
    // postsStore.posts.value.push(post)
    // thread.value.posts.push(post.id)
}

</script>

<template>
    <div class="col-large push-top">
        <h1>{{ thread.title }}</h1>
        <PostList :posts="threadPosts" />

        <PostForm @save="addPost"/>
    </div>
</template>

<style scoped>

</style>