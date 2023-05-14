<script setup>

import {computed, onBeforeMount} from "vue"
import {useForumStore} from "@/stores/ForumStore"
import {useThreadStore} from "@/stores/ThreadStore"
import router from "@/router"
import ThreadForm from "@/components/ThreadForm.vue"
import {findById} from "@/helpers"

const props = defineProps({
  forumId: {
    type: String,
    required: true
  }
})

const forum = computed(() => {
    return findById(useForumStore().forums, props.forumId) || {}
})

const save = async (thread) => {
  const newThread = await useThreadStore().createThread({ ...thread, forumId: props.forumId })

  router.push({ name: 'ThreadShow', params: { id: newThread.id } })
}

const cancel = () => {
  router.push({name: 'Forum', params: {id: props.forumId}})
}
onBeforeMount(() => {
    const forumData = useForumStore().fetchForum(props.forumId)
})

</script>

<template>
    <div v-if="forum" class="col-full push-top">
        <h1>Create a new thread in <i>{{ forum.name }}</i></h1>

        <ThreadForm @save="save" @cancel="cancel"/>
    </div>
</template>

<style scoped>

</style>