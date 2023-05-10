<script setup>
import {computed, reactive, ref} from "vue"
import PostList from "@/components/PostList.vue"
import PostForm from "@/components/PostForm.vue"
import {storeToRefs} from "pinia"
import {useThreadsStore} from "@/stores/ThreadsStore"
import {usePostsStore} from "@/stores/PostsStore"
import {findById} from "@/helpers"
import AppDate from "@/components/AppDate.vue";

const { threads } = storeToRefs(useThreadsStore())
const { posts } = storeToRefs(usePostsStore())
const { createPost } = usePostsStore()

const props = defineProps({
    id: {
        required: true,
        type: String
    }
})

const thread = computed(() => getThread(props.id))
const threadPosts = computed(() => posts.value.filter(post => post.threadId === props.id))

const addPost = (eventData) => {
    const post = {
        ...eventData.post,
        threadId: props.id
    }
    createPost(post)
}

const getThread = (id) => useThreadsStore().thread(id)

</script>

<template>
    <div class="col-large push-top">
        <h1>
            {{ thread.title }}
            <RouterLink :to="{name: 'ThreadEdit', id: props.id}">
                <button class="btn-green btn-small">Edit Thread</button>
            </RouterLink>
        </h1>

        <p>
            By <a href="" class="link-unstyled">{{ thread.author.name}}</a>,
            on <AppDate :timestamp="thread.publishedAt" />.
            <span style="float: right; margin-top: 2px" class="hide-mobile text-faded text-small">
                {{ thread.repliesCount }} replies by
                {{ thread.contributorsCount}}
                contributor{{ thread.contributorsCount !== 1 ? "s" : ""}}
            </span>
        </p>

        <PostList :posts="threadPosts" />

        <PostForm @save="addPost"/>
    </div>
</template>

<style scoped>

</style>