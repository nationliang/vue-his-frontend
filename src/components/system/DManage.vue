<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="doctorSets" max-height="420">
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column align="center" label="性别" prop="sex">
          <template slot-scope="scope">
            {{scope.row.sex === 'm'? '男': '女'}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="科室" prop="dep"></el-table-column>
        <el-table-column align="center" label="职称" prop="rank">
          <template slot-scope="scope">
            {{showRank(scope.row.rank)}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteSystemDoc(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-wrapper">
      <el-button type="text" size="medium" @click="showDocDialog">添加医生</el-button>
    </div>
    <div class="dialog-wrapper" v-if="isShowDocDialog" @click="showDocDialog"></div>
    <div class="dialog-content" v-if="isShowDocDialog">
      <h1>添加医生</h1>
      <div class="item-wrapper">
        <span>医生姓名：</span><input type="text" v-model="docname">
      </div>
      <div class="item-wrapper">
        <span>医生性别：</span>
        <select v-model="docsex" class="dialog-input">
          <option value="2" label="男"></option>
          <option value="1" label="女"></option>
        </select>
      </div>
      <div class="item-wrapper">
        <span>医生科室：</span>
        <select v-model="docdep" class="dialog-input">
          <!-- <option value="牙科">牙科</option>
          <option value="五官科">五官科</option>
          <option value="儿科">儿科</option> -->
          <option :value="item.name" v-for="(item, index) in depList" :key="index">{{item.name}}</option>
        </select>
      </div>
      <div class="item-wrapper">
        <span>医生职称：</span>
        <select v-model="docrank" class="dialog-input">
          <option value="1">主治医师</option>
          <option value="2">副主任医生</option>
          <option value="3">主任医生</option>
        </select>
      </div>
      <div class="dialog-button-wrapper">
        <el-button type="primary" size="medium" @click="addDoc">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import { getDocList, deleteDoc, addDoc, getDep } from '../../api/index'
import { getDateStr } from '../../config/utils'

export default {
  data () {
    return {
      doctorSets: [],
      isShowDocDialog: false,
      docname: '',
      docsex: '1',
      docdep: '',
      docrank: '1',
      depList: []
    }
  },
  methods: {
    showRank (rank) {
      if (rank === 1) {
        return '主治医师'
      } else if (rank === 2) {
        return '副主任医生'
      } else {
        return '主任医生'
      }
    },
    showDoc () {
      getDocList().then(res => {
        const data = res.data
        this.doctorSets = data
      })
    },
    addDoc () {
      let message = ''
      if (this.docname === '') {
        message = '医生名不能为空'
      } else {

      }
      if (message !== '') {
        MessageBox({
          title: '警告',
          message,
          type: 'warning'
        })
      } else {
        const docMes = {
          name: this.docname,
          sex: this.docsex,
          dep: this.docdep,
          rank: this.docrank,
          date: getDateStr(),
          password: 'his2000'
        }
        // console.log(docMes)
        addDoc(docMes).then(res => {
          if (res.data.scode === 1) {
            MessageBox({
              title: '消息',
              message: '添加成功！',
              type: 'success'
            })
            this.showDoc()
            this.showDocDialog()
          } else {
            MessageBox({
              title: '消息',
              message: '待添加的医生名已存在！',
              type: 'warning'
            })
          }
        })
      }
    },
    showDocDialog () {
      this.isShowDocDialog = !this.isShowDocDialog 
    },
    deleteSystemDoc (row) {
      deleteDoc({ id: row.id, name: row.name }).then(res => {
        if (res.data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: 'success'
          })
          this.showDoc()
        }
      })
    }
  },
  mounted () {
    getDep().then(res => {
      this.docdep = res.data[0].name
      this.depList = res.data
    })
    this.showDoc()
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
    max-height: 320px
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
      .dialog-input
        width: 80%
        background-color: #F9F9F9
        border: 1px solid #CCC
        height: 30px
    .dialog-button-wrapper
      padding-top: 20px
      text-align: center
      >>> button
        width: 92%
</style>
