<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="doctorSets" max-height="420">
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column align="center" label="性别" prop="sex"></el-table-column>
        <el-table-column align="center" label="科室" prop="dep"></el-table-column>
        <el-table-column align="center" label="职称" prop="rank"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delete(scope.row)">删除</el-button>
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
          <option value="m" label="男"></option>
          <option value="w" label="女"></option>
        </select>
      </div>
      <div class="item-wrapper">
        <span>医生科室：</span>
        <select v-model="docdep" class="dialog-input">
          <option value="1" label="牙科"></option>
          <option value="2" label="五官科"></option>
        </select>
      </div>
      <div class="item-wrapper">
        <span>医生职称：</span>
        <select v-model="docrank" class="dialog-input">
          <option value="1" label="主治医师"></option>
          <option value="2" label="副主任医生"></option>
          <option value="3" label="主任医生"></option>
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
export default {
  data () {
    return {
      doctorSets: [
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        },
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        },
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        },
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        },
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        },
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        },
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        },
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        },
        {
          name: '李明凯',
          sex: '男',
          dep: '牙科',
          rank: '主治医师'
        }
      ],
      isShowDocDialog: false,
      docname: '',
      docsex: 'm',
      docdep: '1',
      docrank: '1'
    }
  },
  methods: {
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
          rank: this.docrank
        }
        console.log(docMes)
        this.showDocDialog()
      }
    },
    showDocDialog () {
      this.isShowDocDialog = !this.isShowDocDialog 
    },
    delete (row) {}
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
