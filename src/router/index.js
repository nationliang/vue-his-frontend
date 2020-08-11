import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import { MessageBox } from 'element-ui'
import { getCookie } from '../config/utils'

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
    path: '/patient',
    component: () => import('../pages/Patient.vue')
  }, {
    path: '/doctor',
    component: () => import('../pages/Doctor.vue')
  }, {
    path: '/medicine',
    component: () => import('../pages/Medicine.vue')
  }, {
    path: '/statistics',
    component: () => import('../pages/Statistics.vue')
  }, {
    path: '/money',
    component: () => import('../pages/Money.vue')
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
  // if (to.path === '/hospital' || to.path === '/department' || to.path === '/announcement' || to.path === '/party' || to.path === '/communicate' ) {
  //   MessageBox({
  //     title: '消息提醒',
  //     message: '<h1 style=\'color: red; font-size: 20px;\'>该页面开发中......<h1>',
  //     dangerouslyUseHTMLString: true
  //   })
  //   next(false)
  // } else {
  //   next()
  // }
  const power = getCookie('his_kind')
  // const power = store.getters.getPower
  // console.log(power)
  if (to.path === '/patient' && (power !== 'pat' && power !== 'adm')) {
    MessageBox({
      title: '消息提醒',
      // message: '<h1 style=\'color: red; font-size: 20px;\'>权限不足！<h1>',
      // dangerouslyUseHTMLString: true
      message: '权限不足！',
      type: 'warning'
    })
    next({ path: '/' })
  } else if (to.path === '/doctor' && (power !== 'doc' && power !== 'adm')) {
    MessageBox({
      title: '消息提醒',
      // message: '<h1 style=\'color: red; font-size: 20px;\'>权限不足！<h1>',
      // dangerouslyUseHTMLString: true
      message: '权限不足！',
      type: 'warning'
    })
    next({ path: '/' })
  } else if ((to.path === '/statistics' && power !== 'adm') || (to.path === '/system' && power !== 'adm')) {
    MessageBox({
      title: '消息提醒',
      // message: '<h1 style=\'color: red; font-size: 20px;\'>权限不足！<h1>',
      // dangerouslyUseHTMLString: true
      message: '权限不足！',
      type: 'warning'
    })
    next({ path: '/' })
  } else if (to.path === '/medicine' && (power !== 'med' && power !== 'adm')) {
    MessageBox({
      title: '消息提醒',
      // message: '<h1 style=\'color: red; font-size: 20px;\'>权限不足！<h1>',
      // dangerouslyUseHTMLString: true
      message: '权限不足！',
      type: 'warning'
    })
    next({ path: '/' })
  } else if (to.path === '/money' && (power !== 'cou' && power !== 'adm')) {
    MessageBox({
      title: '消息提醒',
      // message: '<h1 style=\'color: red; font-size: 20px;\'>权限不足！<h1>',
      // dangerouslyUseHTMLString: true
      message: '权限不足！',
      type: 'warning'
    })
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
