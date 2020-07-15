<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="depSets" max-height="420">
        <el-table-column width="200" align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="名称" prop="name"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteDep(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-wrapper">
      <el-button type="text" size="medium" @click="showDepDialog">添加部门</el-button>
    </div>
    <div class="dialog-wrapper" v-if="isShowDepDialog" @click="showDepDialog"></div>
    <div class="dialog-content" v-if="isShowDepDialog">
      <h1>添加部门</h1>
      <div class="item-wrapper">
        <span>部门名称：</span><input type="text" v-model="depname">
      </div>
      <div class="dialog-button-wrapper">
        <el-button type="primary" size="medium" @click="addDepMes">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui'
export default {
  data () {
    return {
      depSets: [
        {
          name: '牙科'
        },
        {
          name: '牙科'
        },
        {
          name: '牙科'
        },
        {
          name: '牙科'
        },
        {
          name: '牙科'
        },
        {
          name: '牙科'
        },
        {
          name: '牙科'
        },
        {
          name: '牙科'
        },
        {
          name: '牙科'
        }
      ],
      depname: '',
      isShowDepDialog: false
    }
  },
  methods: {
    addDepMes () {
      let message = ''
      if (this.depname === '') {
        message = '科室名不能为空'
      } else {

      }
      if (message !== '') {
        MessageBox({
          title: '警告',
          message,
          type: 'warning'
        })
      } else {
        const depMes = {
          name: this.depname
        }
        console.log(depMes)
      }
    },
    showDepDialog () {
      this.isShowDepDialog = !this.isShowDepDialog
    },
    deleteDep (row) {}
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
    max-height: 170px
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
    .dialog-button-wrapper
      padding-top: 20px
      text-align: center
      >>> button
        width: 92%
</style>
