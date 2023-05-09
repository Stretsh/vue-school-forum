import {defineStore} from "pinia"
import sourceData from "@/data.json"
import {useThreadsStore} from "@/stores/ThreadsStore"
import {useUsersStore} from "@/stores/UsersStore";
import {findById, upsert} from "@/helpers";

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
      this.setPost(post)

      const thread = findById(useThreadsStore().threads, post.threadId)
      thread.posts = thread.posts || []
      thread.posts.push(post.id)
    },
    setPost (post) {
      upsert(this.posts, post)
    }
  }
})