import { defineStore } from "pinia"
import sourceData from "@/data.json"

export const useForumsStore = defineStore('ForumsStore', {
  state: () => {
    return {
      forums: sourceData.forums
    }
  },
  getters: {

  },
  actions: {

  }
})