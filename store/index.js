import Vue from 'vue'
import Vuex from 'vuex'
import { generateStorage, getStorage } from '@/utils/index'

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
      let result = 0
      result = getters.storage.filter(el => el.indexOf(str) === 0).length
      return result
    }
  }
})

export default store
