<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheNavBar from "@/components/TheNavBar.vue";
</script>

<template>
  <TheNavBar />
  <div class="container">
      <RouterView />
  </div>
</template>

<style scoped>

</style>
