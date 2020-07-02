import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/reset.css'
import './assets/styles/iconfont.css'
import './mock/index.js'
import { Pagination } from 'element-ui'

Vue.use(Pagination)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
