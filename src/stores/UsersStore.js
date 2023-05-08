import { defineStore } from "pinia"
import sourceData from "@/data.json"
import {computed} from "vue";
import {usePostsStore} from "@/stores/PostsStore"
import {useThreadsStore} from "@/stores/ThreadsStore"

export const useUsersStore = defineStore('UsersStore', {
  state: () => {
    return {
      users: sourceData.users,
      authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
    }
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find(user => user.id === state.authId)
      if (!user) return null
      return {
        ...user,
        get posts() {
          return usePostsStore().posts.filter(post => post.userId === user.id)
        },
        get postsCount() {
          return this.posts.length
        },
        get threads() {
          return useThreadsStore().threads.filter(thread => thread.userId === user.id)
        },
        get threadsCount() {
          return this.threads.length
        }
      }
    }
  },
  actions: {
    updateUser(newUser) {
      const userIndex = this.users.findIndex(user => user.id === newUser.id)
      this.users[userIndex] = newUser
    }
  }
})