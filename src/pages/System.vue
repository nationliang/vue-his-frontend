<template>
  <div>
    <page-header></page-header>
    <page-side :defaultTopicId="defaultTopicId" :sideContent="sideContent" @changeTopic="changeTopic"></page-side>
    <section class="main-wrapper">
      <div class="main">
        <component :is="myComponent"></component>
      </div>
    </section>
    <page-tail></page-tail>
  </div>
</template>
<script>
import PageHeader from '../components/common/Header'
import PageSide from '../components/common/PageSide'
import User from '../components/system/User'
import CheckItem from '../components/system/CheckItem'
import DArrange from '../components/system/DArrange'
import Department from '../components/system/Department' 
import History from '../components/system/History'
import NewsManage from '../components/system/NewsManage'
import DManage from '../components/system/DManage'
import PageTail from '../components/common/Footer'

export default {
  data () {
    return {
      defaultTopicId: 0,
      sideContent: {
        title: '系统管理',
        contentArr: [
          {
            topic: '用户管理'
          },
          {
            topic: '科室管理'
          },
          {
            topic: '医生管理'
          },
          {
            topic: '医生排班'
          },
          {
            topic: '检查项管理'
          },
          {
            topic: '新闻管理'
          },
          {
            topic: '接诊记录管理'
          }
        ]
      },
      myComponent: 'User'
    }
  },
  components:{
    PageHeader,
    PageSide,
    User,
    CheckItem,
    DArrange,
    Department,
    History,
    NewsManage,
    DManage,
    PageTail
  },
  methods: {
    changeTopic (id) {
      if (id === 0) {
        this.myComponent = 'User'
      } else if (id === 1) {
        this.myComponent = 'Department'
      } else if (id === 2) {
        this.myComponent = 'DManage'
      } else if (id === 3) {
        this.myComponent = 'DArrange'
      } else if (id === 4) {
        this.myComponent = 'CheckItem'
      } else if (id === 5) {
        this.myComponent = 'NewsManage'
      } else {
        this.myComponent = 'History'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .main-wrapper
    display: inline-block
    width: 1060px
    min-height: 420px
    margin: 30px 0
    background-color: #ffffff
    box-shadow: 0px 0px 5px #B2B2B2
    vertical-align: top
    .main
      min-height: 420px
      padding: 10px 10px 0 10px
</style>