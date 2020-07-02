import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newsTopicId: 0,
    newsArticleId: 0,
    isShowArticle: false
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
    }
  },
  actions: {
  },
  modules: {
  }
})
