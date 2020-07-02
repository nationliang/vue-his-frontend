import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/door"
  },
  {
    path: '/door',
    name: 'door',
    component: () => import("../pages/Door.vue")
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Login.vue')
  }, {
    path: '/news',
    component: () => import('../pages/News.vue')
  }, {
    path: '/system',
    component: () => import('../pages/System.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/news' && to.query.search !== 'article') {
    store.commit('changeNewsTopicId', 0)
    store.commit('changeNewsArticleId', 0)
  }
  if (to.path !== '/news') {
    store.commit('changeNewsTopicId', 0)
    store.commit('changeNewsArticleId', 0)
    store.commit('showArticle', false)
  }
  next()
})

export default router
