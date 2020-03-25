import Vue from 'vue'
import Vuex from 'vuex'
import { generateStorage, getStorage, linearSearch } from '@/utils/index'

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
        return linearSearch(getters.storage[str[0]], str)
      } catch (e){
        console.log('error', e)
        return null
      }
    }
  }
})

export default store
