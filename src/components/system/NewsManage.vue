<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="newsSets" max-height="420">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="title" label="标题">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.title"><div class="text-flow">{{scope.row.title}}</div></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="kind" label="类型"></el-table-column>
        <el-table-column align="center" prop="author" label="作者"></el-table-column>
        <el-table-column align="center" prop="date" label="日期"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteSystemNews(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-wrapper">
      <el-button type="text" size="mini" @click="showNewsDialog">添加新闻</el-button>
    </div>
    <div class="dialog-wrapper" v-if="isShowNewsDialog" @click="showNewsDialog"></div>
    <div class="dialog-content" v-if="isShowNewsDialog">
      <h1>添加新闻</h1>
      <div class="item-wrapper">
        <span>新闻标题：</span><input type="text" v-model="newstitle">
      </div>
      <div class="item-wrapper">
        <span>新闻类型：</span><select v-model="newskind"><option v-for="(item, index) in newsKindList" :key="index" :value="item">{{item}}</option></select>
      </div>
      <div class="item-wrapper">
        <span>新闻来源：</span><input type="text" v-model="newssource">
      </div>
      <div class="item-wrapper">
        <span>新闻编辑：</span><input type="text" v-model="newseditor">
      </div>
      <div class="item-wrapper">
        <span>新闻作者：</span><input type="text" v-model="newsauthor">
      </div>
      <div class="item-wrapper">
        <span style="vertical-align: top;">新闻内容：</span><textarea v-model="newscontent"></textarea>
      </div>
      <div class="dialog-button-wrapper">
        <el-button type="primary" size="medium" @click="addNewsMes">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import { getNewsList, deleteNews, addNews } from '../../api/index'
import { getDateStr } from '../../config/utils'

export default {
  data () {
    return {
      newsSets: [],
      isShowNewsDialog: false,
      newstitle: '',
      newssource: '',
      newseditor: '',
      newsauthor: '',
      newscontent: '',
      newskind: '医院要闻',
      newsKindList: [
        '医院要闻',
        '综合新闻',
        '病友飞鸿',
        '杏林人物',
        '员工文苑',
        '领导论坛',
      ],
    }
  },
  methods: {
    showNewsList () {
      getNewsList().then(res => {
        this.newsSets = res.data
      })
    },
    deleteSystemNews (row) {
      deleteNews({ id: row.id }).then(res => {
        if (res.data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: 'success'
          })
          this.showNewsList()
        }
      })
    },
    addNewsMes () {
      let message = ''
      if (this.newstitle === '') {
        message = '新闻标题不能为空'
      } else if (this.newssource === '') {
        message = '新闻来源不能为空'
      } else if (this.newseditor === '') {
        message = '新闻编辑不能为空'
      } else if (this.newsauthor === '') {
        message = '新闻作者不能为空'
      } else if (this.newscontent === '') {
        message = '新闻内容不能为空'
      } else {

      }
      if (message !== '') {
        MessageBox({
          title: '警告',
          message,
          type: 'warning'
        })
      } else {
        const newsMes = {
          title: this.newstitle,
          source: this.newssource,
          editor: this.newseditor,
          author: this.newsauthor,
          content: this.newscontent,
          kind: this.newskind,
          date: getDateStr()
        }
        addNews(newsMes).then(res => {
          if (res.data.scode === 1) {
            MessageBox({
              title: '消息',
              message: '添加成功！',
              type: 'success'
            })
            this.showNewsList()
            this.showNewsDialog()
          } else {
            MessageBox({
              title: '消息',
              message: '待添加的新闻名已存在！',
              type: 'warning'
            })
          }
        })
        // console.log(newsMes)
      }
    },
    showNewsDialog () {
      this.isShowNewsDialog = !this.isShowNewsDialog
    }
  },
  mounted () {
    this.showNewsList()
  }
}
</script>
<style lang="stylus" scoped>
  .table-wrapper
    height: 420px
  .button-wrapper
    text-align: right
    padding-right: 10px
  .dialog-wrapper
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    background-color: rgba(0, 0, 0, .5)
  .dialog-content
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 11
    width: 1000px
    max-height: 630px
    margin: auto
    background-color: #ffffff
    h1
      height: 40px
      line-height: 40px
      background-color: #F3F3F3
      margin-bottom: 10px
      text-align: center
    .item-wrapper
      padding: 10px 0
      text-align: center
      select
        width: 88%
        background-color: #f9f9f9
        border: 1px solid #ccc
        height: 30px
      input[type=text]
        width: 88%
        background-color: #F9F9F9
        border: 1px solid #CCC
        height: 30px
      textarea
        height: 245px
        width: 88%
        background-color: #f9f9f9
        border: 1px solid #cccccc
        resize: none
    .dialog-button-wrapper
      padding-top: 5px
      text-align: center
      >>> button
        width: 98%
</style>
