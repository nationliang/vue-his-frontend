<template>
  <div>
    <page-header></page-header>
    <page-side :sideContent="sideContent" :defaultTopicId="newsTopicId" @changeTopic="changeTopic"></page-side>
    <div class="main-wrapper">
      <div class="main">
        <table>
          <tr>
            <td colspan="2" style="font-size: larger;"><span style="display: inline-block;padding-bottom: 3px;border-bottom: 3px solid #3396DF;">{{topic}}</span></td>
          </tr>
          <tr>
            <td colspan="2"></td>
          </tr>
        </table> 
        <section class="news-item-container" v-if="!isShowArticle && sideContent.contentArr && sideContent.contentArr[newsTopicId].itemCollect != []">
          <p v-for="(item, index) in currentShowNewsItems" :key="index">
          <!-- <p v-for="(item, index) in sideContent.contentArr[newsTopicId].itemCollect" :key="index"> -->
            <span class="news-title" @click="setShowArticle(index)">{{item.title}}</span>
            <span class="news-date">{{item.date}}</span>
          </p>
        </section>
        <article v-if="isShowArticle && article !== {}">
          <h1>{{article.title}}</h1>
          <section>
            <span calss="source">来源：{{article.source}}</span>
            <span class="time">时间：{{article.date}}</span>
            <span class="author">作者：{{article.author}}</span>
            <span class="editor">编辑：{{article.editor}}</span>
          </section>
          <section>
            <p>{{article.content}}</p>
          </section>
        </article>
      </div>
      <div class="page-code-wrapper" v-if="!isShowArticle">
        <!-- <span>首页</span>&nbsp; | &nbsp;
        <span>上一页</span>&nbsp; | &nbsp;
        <span>下一页</span>&nbsp; | &nbsp;
        <span>尾页</span> -->
        <el-pagination
          :total="pageTotal"
          :page-size="10"
          :current-page="currentPage"
          @current-change="refreshPage"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
    <page-tail></page-tail>
  </div>
</template>
<script>
import PageHeader from '../components/common/Header'
import PageSide from '../components/common/PageSide'
import { getNews } from '../api/index'
import { mapState, mapMutations } from 'vuex'
import PageTail from '../components/common/Footer'

export default {
  data () {
    return {
      topic: '',
      article: {},
      sideContent: {},
      pageTotal: 0,
      currentPage: 1
    }
  },
  components: {
    PageHeader,
    PageSide,
    PageTail
  },
  watch: {
    newsTopicId (newValue, oldValue) {
      this.article = this.sideContent.contentArr[this.newsTopicId].itemCollect[this.newsArticleId]
      this.topic = this.sideContent.contentArr[this.newsTopicId].topic
    },
    newsArticleId (newValue, oldValue) {
      this.article = this.sideContent.contentArr[this.newsTopicId].itemCollect[this.newsArticleId]
      this.topic = this.sideContent.contentArr[this.newsTopicId].topic
    }
  },
  computed: {
    ...mapState(['newsTopicId', 'newsArticleId', 'isShowArticle']),
    currentShowNewsItems () {
      if (this.sideContent.contentArr && this.sideContent.contentArr[this.newsTopicId].itemCollect && this.sideContent.contentArr[this.newsTopicId].itemCollect.length > 10) {
        const newsItems = this.sideContent.contentArr[this.newsTopicId].itemCollect.slice()
        const num = this.currentPage - 1
        const newsShow = []
        for (let i = 0; i < 10; i++) {
          if (newsItems.length < num * 10 + i + 1) {
            break
          } else {
            newsShow.push(newsItems[num * 10 + i])
          }
        }
        return newsShow
      } else {
        return this.sideContent.contentArr[this.newsTopicId].itemCollect
      }
    }
  },
  methods: {
    ...mapMutations(['changeNewsTopicId', 'changeNewsArticleId', 'showArticle']),
    refreshPage (num) {
      this.currentPage = num
    },
    changeTopic (index) {
      this.topic = this.sideContent.contentArr[index].topic
      this.changeNewsTopicId(index)
      this.showArticle(false)
      this.currentPage = 1
      this.pageTotal = this.sideContent.contentArr[index].itemCollect.length
    },
    setShowArticle (index) {
      this.showArticle(true)
      this.changeNewsArticleId(index)
      this.article = this.sideContent.contentArr[this.newsTopicId].itemCollect[this.newsArticleId]
    }
  },
  mounted () {
    getNews().then(res => {
      const data = res.data
      if (data !== {}) {
        this.sideContent = data
        this.article = this.sideContent.contentArr[this.newsTopicId].itemCollect[this.newsArticleId]
        this.topic = this.sideContent.contentArr[this.newsTopicId].topic
        this.pageTotal = this.sideContent.contentArr[this.newsTopicId].itemCollect.length
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.path === '/news' && to.query.search !== 'article') {
      this.changeNewsTopicId(0)
      this.changeNewsArticleId(0)
      this.showArticle(false)
    }
    next()
  }
}
</script>
<style lang="stylus" scoped>
  .main-wrapper
    display: inline-block
    width: 77%
    min-height: 450px
    padding: 10px 10px 20px 10px
    margin: 30px 0px 30px 0
    background-color: #fff
    vertical-align: top  
    box-shadow: 0px 0px 5px #B2B2B2
    .main
      min-height: 416px
      table
        width: 98%
        margin: 0 10px
        border-collapse: collapse
        tr
          &:nth-child(2)
            td
              border-top: 1px solid #858585
          td
            text-align: left
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
      article
        h1
          font-size: 18px
          text-align: center
          margin-top: 20px
          font-weight: bold
        section
          margin-top: 10px
          color: #555
          text-align: center
          span
            margin: 0 20px
            font-size: 13px
          &:last-child
            margin-top: 15px
            color: #000
            line-height: 28px
            font-family: "宋体"
            font-size: 14px
            p
              text-indent: 2em
              text-align: justify
              line-height: 2.2
    .page-code-wrapper
      text-align: center
      padding: 10px
      span
        display: inline-block
        padding: 2px 5px
        color: #1575EA
        background-color: #FFF
        border-radius: 5px
        box-shadow: 0px 0px 2px #707070
        &:hover
          background-color: #4996D3
          color: #ffffff
          cursor: pointer
</style>
