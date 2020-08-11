import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newsTopicId: 0,
    newsArticleId: 0,
    isShowArticle: false,
    power: null
  },
  mutations: {
    changeNewsTopicId (state, id) {
      state.newsTopicId = id
    },
    changeNewsArticleId (state, id) {
      state.newsArticleId = id
    },
    showArticle (state, flag) {
      state.isShowArticle = flag
    },
    setPower (state, val) {
      state.power = val
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getPower (state) {
      return state.power
    }
  }
})
