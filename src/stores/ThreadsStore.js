import {defineStore} from "pinia"
import sourceData from "@/data.json"
import {useUsersStore} from "@/stores/UsersStore"
import {usePostsStore} from "@/stores/PostsStore"
import {useForumsStore} from "@/stores/ForumsStore"
import {findById, upsert} from "@/helpers";

export const useThreadsStore = defineStore('ThreadsStore', {
  state: () => {
    return {
      threads: sourceData.threads
    }
  },
  getters: {

  },
  actions: {
    async createThread ({ text, title, forumId }) {
      const id = 'tttt' + Math.random()
      const userId = useUsersStore().authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = {forumId, title, text, publishedAt, userId, id}

      this.setThread(thread)
      usePostsStore().createPost({text: thread.text, threadId: thread.id})

      const forum = findById(useForumsStore().forums, thread.forumId)
      forum.threads = forum.threads || []
      forum.threads.push(thread.id)

      const user = findById(useUsersStore().users, thread.userId)
      user.threads = user.threads || []
      user.threads.push(thread.id)

      // return {id: thread.id}
      return findById(this.threads, thread.id)
    },
    async updateThread ({ title, text, id }) {
      const thread = findById(this.threads, id)
      const post = findById(usePostsStore().posts, thread.posts[0])

      this.setThread({ ...thread, title })
      usePostsStore().setPost({ ...post, text })
      return { ...thread, title }

    },
    setThread (thread) {
      upsert(this.threads, thread)
    }
  }
})