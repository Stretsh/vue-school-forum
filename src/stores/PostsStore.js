import {defineStore} from "pinia"
import sourceData from "@/data.json"
import {useThreadsStore} from "@/stores/ThreadsStore"
import {useUsersStore} from "@/stores/UsersStore";

export const usePostsStore = defineStore('PostsStore', {
  state: () => {
    return {
      posts: sourceData.posts
    }
  },
  getters: {

  },
  actions: {
    createPost (post) {
      post.id = 'dddd' + Math.random()
      post.userId = useUsersStore().authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      this.posts.push(post)

      const thread = useThreadsStore().threads.find(thread => thread.id === post.threadId)
      thread.posts.push(post.id)
    }
  }
})