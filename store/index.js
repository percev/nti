import Vue from 'vue'
import Vuex from 'vuex'
import {binarySearch, generateStorage, getStorage, linearSearch, timer } from '@/utils/index'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    storage: [],
    appLoading: false,
  },

  getters: {
    storage: state => state.storage,
    getAppState: state => state.appLoading
  },

  mutations: {
    setStorage: (state, storage) => state.storage = storage,
    setAppState: (state, appLoading) => state.appLoading = appLoading
  },

  actions: {
    async setStorage ({commit}) {
      commit('setAppState', true)
      await generateStorage()
      const storage = await getStorage()
      commit('setStorage', storage)
      commit('setAppState', false)
    },
    findResults ({getters}, str) {
      try {
        let timestamp1 = timer()
        const binarySearchResult = binarySearch(getters.storage[str[0]], str)
        timestamp1 = timestamp1()
        let timestamp2 = timer()
        const linearSearchResult = linearSearch(getters.storage[str[0]], str)
        timestamp2 = timestamp2()
        return {
          'bSearchRes': binarySearchResult,
          'bSearchTime': timestamp1,
          'lSearchRes': linearSearchResult,
          'lSearchTime': timestamp2
        }
      } catch (e){
        console.log('error', e)
        return null
      }
    }
  }
})

export default store
