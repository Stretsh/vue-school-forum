<script setup>
import { ref } from 'vue'

const emit = defineEmits(["save"])

const props = defineProps({
    post: { type: Object, default: () => ({ text: '' }) }
})

const postCopy = ref({ ...props.post})

const save = () => {
  emit("save", { ...postCopy.value })
  postCopy.value.text = ''
}

</script>

<template>
    <div class="col-full">
        <form @submit.prevent="save">
            <div class="form-group">
                <textarea v-model="postCopy.text" name="" id="" cols="30" rows="10" class="form-input"></textarea>
            </div>
            <div class="form-actions">
                <button class="btn-blue">{{ post.id ? 'Update' : 'Submit' }} post</button>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>