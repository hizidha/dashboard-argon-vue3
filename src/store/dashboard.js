import { defineStore } from 'pinia'

import * as s$todo from '@/service/dashboard'

export const d$todo = defineStore({
  actions: {
    async a$add(body) {
      try {
        const respone = await s$todo.add(body);
        return respone.data
      } catch ({ message, error }) {
        throw message ?? error
      }
    },
    removeIndex(index) {
      this.list = this.list.filter((val, idx) => index !== idx)
    },
    editIndex(index, data) {
      this.list[index] = data
    }
  },
  getters: {
    getList: ({ list }) => list,
    getDetail: ({ list }) => {
      return (index) => list[index]
    }
  }
})
