<script setup>
import {useUsersStore} from "@/stores/UsersStore"
import {computed} from "vue";

const authUser = computed(() => useUsersStore().authUser)

</script>

<template>
  <header class="header" id="header">
      <RouterLink :to="{name: 'Home'}" class="logo">
          <img src="@/assets/img/svg/vueschool-logo.svg" />
      </RouterLink>

      <div class="btn-hamburger">
          <div class="top bar"></div>
          <div class="middle bar"></div>
          <div class="bottom bar"></div>
      </div>

      <nav class="navbar">
          <ul>
              <li class="navbar-user">
                  <RouterLink :to="{name: 'Profile'}">
                      <img class="avatar-small"
                           :src="authUser.avatar" :alt="`${authUser.name} profile picture`">
                      <span>
                          {{ authUser.name }}
                          <img class="icon-profile"
                               src="@/assets/img/svg/arrow-profile.svg" alt="">
                      </span>
                  </RouterLink>
                  <div id="user-dropdown">
                      <div class="triangle-drop"></div>
                      <ul class="dropdown-menu">
                          <li class="dropdown-menu-item"><a href="">View profile</a></li>
                          <li class="dropdown-menu-item"><a href="">Logout</a></li>
                      </ul>
                  </div>
              </li>
          </ul>
      </nav>
  </header>
</template>

<style scoped>

</style>