<script setup>
import {useUserStore} from "@/stores/UserStore"
import router from "@/router"

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const activeUser = { ...props.user }

const save = () => {
    useUserStore().setUser(activeUser)
    router.push({name: "Profile"})
}

const cancel = () => {
    router.push({name: 'Profile'})
}

</script>

<template>
    <div class="profile-card">
        <form @submit.prevent="save">
            <p class="text-center">
                <img :src="activeUser.avatar"
                     :alt="`${activeUser.name} profile picture`"
                     class="avatar-large img-update" />
            </p>
            <div class="form-group">
                <input type="text"
                       v-model="activeUser.username"
                       placeholder="Username"
                       class="form-input text-lead text-bold" />
            </div>
            <div class="form-group">
                <input type="text"
                       v-model="activeUser.name"
                       placeholder="Full name"
                       class="form-input text-lead text-bold" />
            </div>
            <div class="form-group">
                <label class="form-label" for="user_bio">Bio</label>
                <textarea id="user_bio"
                          v-model="activeUser.bio"
                          placeholder="Full name"
                          class="form-input"></textarea>
            </div>
            <div class="stats">
                <span>{{ activeUser.postsCount }} posts</span>
                <span>{{ activeUser.threadsCount }} threads</span>
            </div>

            <hr />

            <div class="form-group">
                <label class="form-label" for="user_website">Website</label>
                <input autocomplete="off"
                       id="user_website"
                       v-model="activeUser.website"
                       placeholder="Website"
                       class="form-input" />
            </div>
            <div class="form-group">
                <label class="form-label" for="user_email">Email</label>
                <input autocomplete="off"
                       id="user_email"
                       v-model="activeUser.email"
                       placeholder="Email"
                       class="form-input" />
            </div>
            <div class="form-group">
                <label class="form-label" for="user_location">Location</label>
                <input autocomplete="off"
                       id="user_location"
                       v-model="activeUser.location"
                       placeholder="Location"
                       class="form-input" />
            </div>

            <div class="btn-group space-between">
                <button @click="cancel" class="btn-ghost">Cancel</button>
                <button type="submit" class="btn-blue">Save</button>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>