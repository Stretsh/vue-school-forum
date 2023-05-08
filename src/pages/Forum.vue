<script setup>
import ThreadList from "@/components/ThreadList.vue";

import {computed} from "vue";
import {storeToRefs} from "pinia";
import {useForumsStore} from "@/stores/ForumsStore";
import {useThreadsStore} from "@/stores/ThreadsStore";

const { forums } = storeToRefs(useForumsStore())
const { threads } = storeToRefs(useThreadsStore())

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const forum = computed(() => forums.value.find(forum => forum.id === props.id))
const forumThreads = computed(() => threads.value.filter(thread => thread.forumId === props.id))
</script>

<template>
    <div class="col-full push-top">
        <div class="forum-header">
            <div class="forum-details">
                <h1>{{ forum.name }}</h1>
                <p class="text-lead">{{ forum.description }}</p>
            </div>
            <a href="#" class="btn-green btn-small">Start a thread</a>
        </div>
    </div>
    <div class="col-full push-top">
        <ThreadList :threads="forumThreads" />
    </div>
</template>

<style scoped>

</style>