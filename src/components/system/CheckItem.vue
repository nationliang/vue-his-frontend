<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="checkSets" max-height="420">
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="名称" prop="name"></el-table-column>
        <el-table-column align="center" label="售价" prop="price"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteSystemCheck(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-wrapper">
      <el-button type='text' size="mini" @click="showCheckDialog">添加检查项</el-button>
    </div>
    <div class="dialog-wrapper" v-if="isShowCheckDialog" @click="showCheckDialog"></div>
    <div class="dialog-content" v-if="isShowCheckDialog">
      <h1>添加用户</h1>
      <div class="item-wrapper">
        <span>名称：</span><input type="text" v-model="checkname">
      </div>
      <div class="item-wrapper">
        <span>售价：</span><input type="text" v-model="checkprice">
      </div>
      <div class="dialog-button-wrapper">
        <el-button type="primary" size="medium" @click="addCheckMes">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import { getCheckList, deleteCheck, addCheck } from '../../api/index'

export default {
  data () {
    return {
      checkSets: [],
      checkprice: '',
      checkname: '',
      isShowCheckDialog: false
    }
  },
  methods: {
    showCheckList () {
      getCheckList().then(res => {
        this.checkSets = res.data
      })
    },
    addCheckMes () {
      let message = ''
      if (this.checkname === '') {
        message = '检查项名不能为空'
      } else if (this.checkprice === '') {
        message = '检查项价格不能为空'
      } else {

      }
      if (message !== '') {
        MessageBox({
          title: '警告',
          message,
          type: 'warning'
        })
      } else {
        const checkMes = {
          name: this.checkname,
          price: this.checkprice
        }
        // console.log(checkMes)
        addCheck(checkMes).then(res => {
          if (res.data.scode === 1) {
            MessageBox({
              title: '消息',
              message: '添加成功！',
              type: 'success'
            })
            this.showCheckList()
            this.showCheckDialog()
          } else {
            MessageBox({
              title: '消息',
              message: '待添加的检查项名已存在！',
              type: 'warning'
            })
          }
        })
      }
    },
    showCheckDialog () {
      this.isShowCheckDialog = !this.isShowCheckDialog
    },
    deleteSystemCheck (row) {
      deleteCheck({ id: row.id }).then(res => {
        if (res.data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: 'success'
          })
          this.showCheckList()
        }
      })
    }
  },
  mounted () {
    this.showCheckList()
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
    width: 500px
    max-height: 220px
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
      input[type=text]
        width: 80%
        background-color: #F9F9F9
        border: 1px solid #CCC
        height: 30px
    .el-item-wrapper
      display: flex
      align-items: center
      padding: 10px 0
      span
        width: 80px
        padding-left: 8px
      div
        width: 402px
        >>>input[type]
          background-color: #F9F9F9
          height: 32px
          border: 1px solid #CCC
          border-radius: 0
    .dialog-button-wrapper
      padding-top: 20px
      text-align: center
      >>> button
        width: 92%
</style>
