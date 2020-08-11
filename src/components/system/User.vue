<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="userList" max-height="420">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别">
          <template slot-scope="scope">
            {{scope.row.sex === 'm'? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="kind" label="类型">
          <template slot-scope="scope">
            {{showKind(scope.row.kind)}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date" label="创建时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteMember(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-wrapper">
      <el-button type='text' size="mini" @click="showUserDialog">添加用户</el-button>
    </div>
    <div class="dialog-wrapper" v-if="isShowUserDialog" @click="showUserDialog"></div>
    <div class="dialog-content" v-if="isShowUserDialog">
      <h1>添加用户</h1>
      <div class="item-wrapper">
        <span>用户姓名：</span><input type="text" v-model="username">
      </div>
      <div class="el-item-wrapper">
        <span>用户密码：</span>
        <div class="el-input-wrapper">
          <el-input type="password" show-password v-model="userpass"></el-input>  
        </div>
      </div>
      <div class="el-item-wrapper">
        <span>确认密码：</span>
        <div class="el-input-wrapper">
          <el-input type="password" show-password v-model="usercpass"></el-input>  
        </div>
      </div>
      <div class="item-wrapper" style="text-align: left;padding-left: 8px;">
        <span>用户性别：</span>
        男：<input type="radio" value="2" v-model="usersex" name="sex" style="margin-right: 20px;">
        女：<input type="radio" value="1" v-model="usersex" name="sex">
      </div>
      <div class="item-wrapper" style="text-align: left;padding-left: 8px;">
        <span>用户类型：</span>
        管理员：<input type="radio" value="3" name="userkind" v-model="userkind" style="margin-right:20px;">
        收银员：<input type="radio" value="5" name="userkind" v-model="userkind" style="margin-right:20px;">
        药物管理员：<input value="4" type="radio" name="userkind" v-model="userkind">
      </div>
      <div class="dialog-button-wrapper">
        <el-button type="primary" size="medium" @click="addUserMes">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import { getUserList, deleteUser, addSystemUser } from '../../api/index'
import { getDateStr } from '../../config/utils'

export default {
  data () {
    return {
      userList: [],
      username: '',
      userpass: '',
      usercpass: '',
      usersex: '2',
      userkind: '3',
      isShowUserDialog: false
    }
  },
  methods: {
    showKind (kind) {
      if (kind === 'pat') {
        return '患者'
      } else if (kind === 'doc') {
        return '医生'
      } else if (kind === 'adm') {
        return '管理员'
      } else if (kind === 'med') {
        return '药物管理员'
      } else {
        return '收银员'
      }
    },
    showUserDialog () {
      this.isShowUserDialog = !this.isShowUserDialog
    },
    addUserMes () {
      let message = ''
      if (this.username === '') {
        message = '用户名不能为空'
      } else if (this.userpass === '') {
        message = '密码不能为空'
      } else if (this.userpass.length < 6) {
        message = '密码至少为6位'
      } else if (this.usercpass === '') {
        message = '确认密码不能为空'
      } else if (this.userpass !== this.usercpass) {
        message = '确认密码与密码不一致'
      } else {

      }
      if (message !== '') {
        MessageBox({
          title: '警告',
          message,
          type: 'warning'
        })
      } else {

        const userMes = {
          name: this.username,
          kind: this.userkind,
          sex: this.usersex,
          password: this.userpass,
          date: getDateStr()
        }
        // console.log(userMes)
        addSystemUser(userMes).then(res => {
          const data = res.data
          if (data.scode === 1) {
            MessageBox({
              title: '消息',
              message: '添加成功！',
              type: 'success'
            })
            this.showUserList()
          } else {
            MessageBox({
              title: '消息',
              message: '待添加的用户名已存在！',
              type: 'warning'
            })
          }
        })
        this.showUserDialog()
      }
    },
    deleteMember (row) {
      deleteUser({ id: row.id, name: row.name }).then(res => {
        const data = res.data
        if (data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: 'success'
          })
          this.showUserList()
        }
      })
    },
    showUserList () {
      getUserList().then(res => {
        const data = res.data
        this.userList = data
      })
    }
  },
  mounted () {
    this.showUserList()
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
    max-height: 350px
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
