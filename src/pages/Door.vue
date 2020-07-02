<template>
  <div class="wrapper">
    <his-name></his-name>
    <div class="play-wrapper">
      <div id="play">
        <ul>
          <li><router-link to="/door">首页</router-link></li>
          <li><router-link to="/news">新闻中心</router-link></li>
          <li><router-link to="/patient">问诊</router-link></li>
          <li><router-link to="/doctor">坐诊</router-link></li>
          <li><router-link to="/count">统计</router-link></li>
          <li><router-link to="/medicine">药库</router-link></li>
          <li><router-link to="/money">收费</router-link></li>
          <li><router-link to="/system">系统设置</router-link></li>
          <li class="user"><span @click="showPerson">{{loginName}}</span></li>
        </ul>
        <transition name="person-setting">
          <div class="person-setting" v-if="isShowPerson">
            <div @click="updateUser" class="person-setting-item">修改个人信息</div>
            <div @click="toLogin" class="person-setting-item">退出</div>
          </div>
        </transition>

        <slider :slides="imgArr" :inv="5000"></slider>
        <div>
        </div>
      </div>
    </div>
    <div class="messege-wrapper">
      <div class="messege">
        <div class="title-wrapper">
          <div v-for="(news, index) in representNews" :key="index" class="title" @mouseenter="toggleTopic(index)" :class="{'active': newsTopicId === index }">{{news.topic}}</div>
        </div>
        <section class="news-item-container">
          <p v-for="(news, index) in currentTopicNews" :key="index">
            <span class="news-title" @click="showNewsDetail(index)">{{news.title}}</span>
            <span class="news-date">{{news.date}}</span>
          </p>
        </section>
      </div>
    </div>
    <change-user-mes-toast :showUserMes="showUserMes" @updateShowToast="updateShowToast"></change-user-mes-toast>
    <tail></tail>
  </div>
</template>
<script>
// @ is an alias to /src
import HisName from "../components/common/HisName"
import Tail from "../components/common/Footer"
import Slider from "../components/common/Slider"
import { getCookie, setCookie } from '../config/utils'
import ChangeUserMesToast from '../components/common/ChangeUserMesToast'
import { mapMutations, mapState } from 'vuex'
import { getRepresentNews } from '../api/index'

export default {
  data () {
    return {
      imgArr: [
        {
          id: 1,
          src: require("../assets/images/play/tp1.jpg")
        }, {
          id: 2,
          src: require("../assets/images/play/tp2.jpg")
        }, {
          id: 3,
          src: require("../assets/images/play/tp3.jpg")
        }, {
          id: 4,
          src: require("../assets/images/play/tp4.jpg")
        }
      ],
      isShowPerson: false,
      showUserMes: false,
      loginName: '',
      currentTopicNews: {},
      representNews: []
    }
  },
  components: {
    HisName,
    Slider,
    Tail,
    ChangeUserMesToast
  },
  computed: {
    ...mapState(['newsTopicId', 'newsArticleId','isShowArticle'])
  },
  methods: {
    ...mapMutations(['changeNewsTopicId', 'changeNewsArticleId', 'showArticle']),
    showNewsDetail (index) {
      this.changeNewsArticleId(index)
      this.showArticle(true)
      this.$router.push({
        path: '/news',
        query: {
          search: 'article'
        }
      })
    },
    toggleTopic (flag) {
      this.changeNewsTopicId(flag)
      this.currentTopicNews = this.representNews[this.newsTopicId].articleTitleArr
    },
    updateShowToast (isShow) {
      this.showUserMes = isShow
    },
    updateUser () {
      this.showUserMes = true
      this.isShowPerson = !this.isShowPerson
    },
    toLogin() {
      let cookieValue = getCookie("his_user")
      if (cookieValue != null) {
        setCookie("his_user", '', -1)
      }
      this.$router.push("/login")
    },
    showPerson() {
      this.isShowPerson = !this.isShowPerson
    }
  },
  mounted() {
    const hisUser = getCookie('his_user')
    this.loginName = hisUser
    if (hisUser === null) {
      this.$router.replace('/login')
    }
    getRepresentNews().then(res => {
      const data = res.data
      this.representNews = data
      this.currentTopicNews = this.representNews[this.newsTopicId].articleTitleArr
    })
  }
}
</script>
<style lang="stylus" scoped>
  .wrapper
    position: relative
    height: 100%
    .play-wrapper
      #play
        position: relative
        box-shadow: 0px 0px 5px #999
        margin: 0 auto
        width: 88%
        height: 450px
        ul
          position: absolute
          z-index: 10
          overflow: hidden
          background-color: rgba(103,217,237,0.8)
          width: 100%
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
            &:first-child
              a
                background-color: #3AF86A
          .user
            float: right
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
          top: 50px
          right: -60px
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
          a
            display: block
            text-decoration: none
            padding-left: 15px
            color: #999
            &:hover
              color: #666
              background-color: #F7F7F7
    .messege-wrapper
      .messege
        margin: 30px auto 
        width: 88%
        height: 176px
        background-color: #ffffff
        box-shadow: 0 0 5px #999
        .title-wrapper
          overflow: hidden
          border-bottom: 1px solid #42B0E6
          .title
            float: left
            padding: 10px 20px
            color: #58ADF3
            font-weight: bold
            cursor: pointer
            &:hover
              color: #ffffff
              background-color: #58ADF3
            &.active
              color: #ffffff
              background-color: #58ADF3
        .news-item-container
          width: 98%
          margin: 0 10px
          p
            border-bottom: 2px dashed #AFAFAF
            padding: 10px 0
            .news-title
              display: inline-block
              width: 60%
              text-align: left
              cursor: pointer
              color: #333
              &:hover
                color: blue
            .news-date
              display: inline-block
              width: 40%
              text-align: center
</style>
