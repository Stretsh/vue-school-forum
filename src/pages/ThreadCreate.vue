<script setup>

import {computed} from "vue"
import {useForumsStore} from "@/stores/ForumsStore"
import {useThreadsStore} from "@/stores/ThreadsStore";
import router from "@/router";
import ThreadForm from "@/components/ThreadForm.vue";
import {findById} from "@/helpers";

const props = defineProps({
  forumId: {
    type: String,
    required: true
  }
})

const forum = computed(() => findById(useForumsStore().forums, props.forumId))

const save = async (thread) => {
  const newThread = await useThreadsStore().createThread({ ...thread, forumId: props.forumId })

  router.push({ name: 'ThreadShow', params: { id: newThread.id } })
}

const cancel = () => {
  router.push({name: 'Forum', params: {id: props.forumId}})
}

</script>

<template>
    <div class="col-full push-top">
        <h1>Create a new thread in <i>{{ forum.name }}</i></h1>

        <ThreadForm @save="save" @cancel="cancel"/>
    </div>
</template>

<style scoped>

</style>