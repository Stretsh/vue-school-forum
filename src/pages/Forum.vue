<script setup>
import ThreadList from '@/components/ThreadList.vue'
import {computed, onBeforeMount} from 'vue'
import {useForumStore} from '@/stores/ForumStore'
import {useThreadStore} from '@/stores/ThreadStore'
import {useUserStore} from '@/stores/UserStore'
import {findById} from '@/helpers'
import {storeToRefs} from "pinia";

const {forums} = storeToRefs(useForumStore())
const {threads} = storeToRefs(useThreadStore())
const {users} = storeToRefs(useUserStore())

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const forum = computed(() => findById(forums.value, props.id))
const forumThreads = computed(() => forum.value.threads ?
  forum.value.threads.map(threadId => getThread(threadId)) :
  [])

const getThread = (id) => useThreadStore().thread(id)

onBeforeMount(async () => {
  const forumData = await useForumStore().fetchForum(props.id)
  const threadsData = await useThreadStore().fetchThreads(forumData.threads)
  await useUserStore().fetchUsers(threadsData.map(thread => thread.userId))
})

</script>

<template>
    <div v-if="forum" class="col-full push-top">
        <div class="forum-header">
            <div class="forum-details">
                <h1>{{ forum.name }}</h1>
                <p class="text-lead">{{ forum.description }}</p>
            </div>
            <RouterLink :to="{name: 'ThreadCreate', params: {forumId: forum.id}}" class="btn-green btn-small">
                Start a thread
            </RouterLink>
        </div>
    </div>
    <div v-if="forum" class="col-full push-top">
<!--        {{ forumThreads }}-->
        <ThreadList :threads="forumThreads" />
    </div>
</template>

<style scoped>

</style>