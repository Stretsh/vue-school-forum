<script setup>

import {computed, onBeforeMount} from "vue"
import {useThreadStore} from "@/stores/ThreadStore";
import router from "@/router";
import ThreadForm from "@/components/ThreadForm.vue";
import {usePostStore} from "@/stores/PostStore";
import {findById} from "@/helpers";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const thread = computed(() => findById(useThreadStore().threads, props.id))
const text = computed(() => {
    let post = findById(usePostStore().posts, thread.value.posts[0])
    post = { ...post }.text
    return post || null
})

console.log(text)

const save = async (thread) => {
  const newThread = await useThreadStore().updateThread({ ...thread, id: props.id })

  router.push({ name: 'ThreadShow', params: { id: newThread.id } })
}

const cancel = () => {
  router.push({name: 'ThreadShow', params: {id: props.id}})
}
onBeforeMount( async () => {
    const threadData = await useThreadStore().fetchThread(props.id)
    const postData = usePostStore().fetchPost(threadData.posts[0])
})
</script>

<template>
    <div v-if="thread && text" class="col-full push-top">
        <h1>Editing <i>{{ thread.title }}</i></h1>

        <ThreadForm :title="thread.title" :text="text" @save="save" @cancel="cancel"/>
    </div>
</template>

<style scoped>

</style>