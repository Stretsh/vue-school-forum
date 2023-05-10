<script setup>
import ThreadList from "@/components/ThreadList.vue";

import {computed} from "vue";
import {storeToRefs} from "pinia";
import {useForumsStore} from "@/stores/ForumsStore";
import {useThreadsStore} from "@/stores/ThreadsStore";
import {findById} from "@/helpers";

const { forums } = storeToRefs(useForumsStore())
const { threads } = storeToRefs(useThreadsStore())

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const forum = computed(() => findById(forums.value, props.id))
const forumThreads = computed(() => forum.value.threads ? forum.value.threads.map(threadId => getThread(threadId)) : [])

const getThread = (id) => useThreadsStore().thread(id)

</script>

<template>
    <div class="col-full push-top">
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
    <div class="col-full push-top">
        <ThreadList :threads="forumThreads" />
    </div>
</template>

<style scoped>

</style>