<script setup>
import {computed, onMounted} from 'vue'
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import {storeToRefs} from 'pinia'
import {useThreadStore} from '@/stores/ThreadStore'
import {usePostStore} from '@/stores/PostStore'
import {useUserStore} from '@/stores/UserStore'
import AppDate from '@/components/AppDate.vue'

const { threads } = storeToRefs(useThreadStore())
const { posts } = storeToRefs(usePostStore())
const createPost = usePostStore().createPost

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

const getThread = (id) => useThreadStore().thread(id)

onMounted( async () => {
    // Fetch the thread
    const fetchedThread = await useThreadStore().fetchThread(props.id)
    //Fetch the user
    await useUserStore().fetchUser(fetchedThread.userId)
    //fetch the posts
    const posts = await usePostStore().fetchPosts(fetchedThread.posts)
    const postUsers = posts.map(post => post.userId)
    await useUserStore().fetchUsers(postUsers)
})

</script>

<template>
    <div v-if="thread" class="col-large push-top">
        <h1>
            {{ thread.value.title }}
            <RouterLink :to="{name: 'ThreadEdit', id: props.id}">
                <button class="btn-green btn-small">Edit Thread</button>
            </RouterLink>
        </h1>
        <p>
            By <a href="" class="link-unstyled">{{ thread.value.author?.name }}</a>,
            on <AppDate :timestamp="thread.value.publishedAt || 0" />.
            <span style="float: right; margin-top: 2px" class="hide-mobile text-faded text-small">
                {{ thread.value.repliesCount }} replies by
                {{ thread.value.contributorsCount}}
                contributor{{ thread.value.contributorsCount !== 1 ? "s" : ""}}
            </span>
        </p>

        <PostList :posts="threadPosts" />

        <PostForm @save="addPost"/>
    </div>
</template>

<style scoped>

</style>