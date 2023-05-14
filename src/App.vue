<script setup>
import { RouterView } from 'vue-router'
import TheNavBar from '@/components/TheNavBar.vue'
import {onBeforeMount} from 'vue'
import {useUserStore} from '@/stores/UserStore'
import {storeToRefs} from "pinia";

const { users } = storeToRefs(useUserStore())

onBeforeMount( async () => {
  const user = await useUserStore().fetchAuthUser()
})
</script>

<template>
  <TheNavBar />
  <div class="container">
      <RouterView />
  </div>
</template>

<style scoped>

</style>
