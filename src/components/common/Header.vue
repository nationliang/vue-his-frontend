<template>
  <div style="position: relative;">
    <his-name></his-name>
    <ul>
      <li><router-link to="/door">首页</router-link></li>
      <li><router-link :to="newsPath" :class="{'active': currentUrl === '/news'}">新闻中心</router-link></li>
      <li><router-link to='/patient' :class="{'active': currentUrl === '/patient'}">问诊</router-link></li>
      <li><router-link to='/doctor' :class="{'active': currentUrl === '/doctor'}">坐诊</router-link></li>
      <li><router-link to='/count' :class="{'active': currentUrl === '/count'}">统计</router-link></li>
      <li><router-link to='/medicine' :class="{'active': currentUrl === '/medicine'}">药库</router-link></li>
      <li><router-link to='/money' :class="{'active': currentUrl === '/money'}">收费</router-link></li>
      <li><router-link to='/system' :class="{'active': currentUrl === '/system'}">系统设置</router-link></li>
      <li class="user"><span @click="showPerson">{{loginName}}</span></li>
    </ul>
    <transition name="person-setting">
      <div class="person-setting" v-if="isShowPerson">
        <div @click="updateUser" class="person-setting-item">修改个人信息</div>
        <div @click="toLogin" class="person-setting-item">退出</div>
      </div>
    </transition>
    <change-user-mes-toast :showUserMes="showUserMes" @updateShowToast="updateShowToast"></change-user-mes-toast>
  </div>
</template>
<script>
import HisName from './HisName'
import { setCookie, getCookie } from '../../config/utils'
import ChangeUserMesToast from './ChangeUserMesToast'

export default {
  data () {
    return {
      isShowPerson: false,
      currentUrl: '',
      loginName: '',
      showUserMes: false
    }
  },
  computed: {
    newsPath () {
      const date = new Date()
      return {
        path: '/news',
        query: {
          time: date.getTime()
        }
      }
    }
  },
  methods: {
    updateShowToast (isShow) {
      this.showUserMes = isShow
    },
    updateUser () {
      this.showUserMes = true
      this.isShowPerson = !this.isShowPerson
    },
    toLogin () {
      let cookieValue = getCookie("his_user")
      if (cookieValue != null) {
        setCookie("his_user", '', -1)
      }
      this.$router.push("/login")
    },
    showPerson () {
      this.isShowPerson = !this.isShowPerson
    }
  },
  components: {
    HisName,
    ChangeUserMesToast
  },
  mounted () {
    const hisUser = getCookie('his_user')
    this.loginName = hisUser
    this.currentUrl = this.$route.path
    if (hisUser === null) {
      this.$router.replace('/login')
    }
  }
}
</script>
<style lang="stylus" scoped>
  ul
    overflow: hidden
    background-color: rgba(103,217,237,0.8)
    padding-left: 81px
    li
      float: left
      a
        display: inline-block
        box-sizing: border-box
        height: 100%
        padding: 18px 30px
        color: #ffffff
        font-weight: bold
        &:hover
          background: #3AF86A
        &.active
          background-color: #3AF86A
    .user
      float: right
      margin-right: 80px
      span
        display: inline-block
        box-sizing: border-box
        height: 100%
        padding: 18px 30px
        cursor: pointer
        color: #ffffff
        font-weight: bold
        &:hover
          color: #000
  .person-setting-enter, .person-setting-leave-to
    opacity: 0
    transform: translateY(20%)
  .person-setting-enter-active, .person-setting-leave-active
    transition: all 1s
  .person-setting
    background-color: #FFF
    z-index: 11
    position: absolute
    top: 140px
    right: 0
    box-shadow: 0px 0px 5px #CCC
    width: 160px
    line-height: 35px
    border-left: 3px solid #999
    .person-setting-item
      padding-left: 15px
      color: #999
      cursor: pointer
      &:hover
        color: #666
        background-color: #F7F7F7
</style>
