<script setup>

import {computed} from "vue"
import {useThreadsStore} from "@/stores/ThreadsStore";
import router from "@/router";
import ThreadForm from "@/components/ThreadForm.vue";
import {usePostsStore} from "@/stores/PostsStore";
import {findById} from "@/helpers";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const thread = computed(() => findById(useThreadsStore().threads, props.id))
const text = computed(() => findById(usePostsStore().posts, thread.value.posts[0]).text).value

console.log(text)

const save = async (thread) => {
  const newThread = await useThreadsStore().updateThread({ ...thread, id: props.id })

  router.push({ name: 'ThreadShow', params: { id: newThread.id } })
}

const cancel = () => {
  router.push({name: 'ThreadShow', params: {id: props.id}})
}

</script>

<template>
    <div class="col-full push-top">
        <h1>Editing <i>{{ thread.title }}</i></h1>

        <ThreadForm :title="thread.title" :text="text" @save="save" @cancel="cancel"/>
    </div>
</template>

<style scoped>

</style>