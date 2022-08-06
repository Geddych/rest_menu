import { defineStore } from 'pinia'
import axios from 'axios'

export const useCategoryStore = defineStore('category',{
    getters:{
      getAllCatsandPos:(state) => {
        axios.get('http://192.168.0.100:3000').then((res) => {
          state.categories = res.data
        })
      }
    }
  })
  