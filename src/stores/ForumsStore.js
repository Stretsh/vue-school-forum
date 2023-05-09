import { defineStore } from "pinia"
import sourceData from "@/data.json"
import {upsert} from "@/helpers";

export const useForumsStore = defineStore('ForumsStore', {
  state: () => {
    return {
      forums: sourceData.forums
    }
  },
  getters: {

  },
  actions: {
    setForum (forum) {
      upsert(this.forums, forum)
    }
  }

})