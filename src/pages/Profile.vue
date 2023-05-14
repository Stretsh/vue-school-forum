<script setup>
import PostList from "@/components/PostList.vue"

import {useUserStore} from "@/stores/UserStore"
import UserProfileCard from "@/components/UserProfileCard.vue"
import UserProfileForm from "@/components/UserProfileForm.vue"
import {computed} from "vue";

const props = defineProps({
    edit: {
        type: Boolean,
        default: false
    }
})

const user = computed(() => useUserStore().authUser)

</script>

<template>
    <div class="container">
        <div class="flex-grid">
            <div class="col-3 push-top">
                <UserProfileCard v-if="!edit" :user="user" />
                <UserProfileForm v-else :user="user" />
            </div>
            <div class="col-7 push-top">
                <div class="profile-header">
                    <span class="text-lead">{{ user.username }} Recent activity</span>
                    <a href=""></a>
                </div>
                <hr />

                <PostList :posts="user.posts" />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>