<script setup>
import {computed, reactive} from 'vue'

const props = defineProps({
    title: {type: String, default: ''},
    text: {type: String, default: ''}
})

const emit = defineEmits(["save", "cancel"])

const thread = reactive({
  title: props.title,
  text: props.text
})

const existing = computed(() => !!props.title)

const save = () => {
  emit("save", { ...thread })
}

const cancel = () => {
    emit("cancel")
}
</script>

<template>
    <form @submit.prevent="save">
        <div class="form-group">
            <label for="thread_title">Title: </label>
            <input v-model="thread.title" type="text" id="thread_title" class="form-input" name="title" />
        </div>
        <div class="form-group">
            <label for="thread_content">Content: </label>
            <textarea v-model="thread.text"
                      id="thread_content"
                      class="form-input"
                      name="content"
                      rows="8"
                      cols="140"></textarea>
        </div>

        <div class="btn-group">
            <button @click.prevent="emit('cancel')" class="btn-ghost">Cancel</button>
            <button type="submit" class="btn-blue" name="Publish">
                {{ existing ? "Update" : "Publish"}}
            </button>
        </div>
    </form>
</template>

<style scoped>

</style>