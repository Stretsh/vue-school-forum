import { defineStore } from "pinia"
import sourceData from "@/data.json"
import {upsert} from "@/helpers";

export const useCategoriesStore = defineStore('CategoriesStore', {
  state: () => {
    return {
      categories: sourceData.categories
    }
  },
  getters: {

  },
  actions: {
    setCategory (category) {
      upsert(this.categories, category)
    }
  }
})