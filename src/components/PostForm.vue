<script setup>
import {computed, reactive, ref} from "vue"

const emit = defineEmits(["save"])

const text = ref('')

const save = () => {
  const post = {
    text: text.value
  }
  emit("save", { post })

  text.value = ''
}


</script>

<template>
    <div class="col-full">
        <form @submit.prevent="save">
            <div class="form-group">
                <textarea v-model="text" name="" id="" cols="30" rows="10" class="form-input"></textarea>
            </div>
            <div class="form-actions">
                <button class="btn-blue">Submit Post</button>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>