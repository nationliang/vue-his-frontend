<template>
  <div>
    <transition name="toast-wrapper">
      <div class='toast-wrapper' @click="isShowToast" v-if="showToast"></div>
    </transition>
    <transition name="toast-content">
      <div class="toast-content" v-if="showToast">
        <div class="toast-title">修改个人信息</div>
        <table>
          <tr>
            <td><span style="vertical-align: middle;">用户名称：</span><span class="input">{{loginName}}</span>
            </td>
          </tr>
          <tr>
            <td><div>用户密码：<input placeholder="确认密码(悬停提示)" title="从英文字母、数字和下划线中选择6位及其以上构成密码" v-if="!showPwd" type="password" v-model="pwd" :class="{'inputwarning': pwarning !=''}"><span v-if="!showPwd" @click="isShowPwd(1)" class="iconfont icon-yanjing eye"></span>
                <input placeholder="确认密码(悬停提示)" title="从英文字母、数字和下划线中选择6位及其以上构成密码" v-if="showPwd" type="text" v-model="pwd" :class="{'inputwarning': pwarning !=''}"><span v-if="showPwd" @click="isShowPwd(1)" class="iconfont icon-icon-eye-open eye"></span>
              </div>
              <div class="warning">{{pwarning}}</div>
            </td>
          </tr>
          <tr>
            <td><div>确认密码：<input title="从英文字母、数字和下划线中选择6位及其以上构成密码" placeholder="确认密码(悬停提示)" v-if="!showRpwd" v-model="rpwd" type="password" :class="{'inputwarning': rpwarning !=''}"><span v-if="!showRpwd" @click="isShowPwd(2)" class="iconfont icon-yanjing eye"></span>
                  <input title="从英文字母、数字和下划线中选择6位及其以上构成密码" placeholder="确认密码(悬停提示)" v-if="showRpwd" v-model="rpwd" type="text" :class="{'inputwarning': rpwarning !=''}"><span v-if="showRpwd" @click="isShowPwd(2)" class="iconfont icon-icon-eye-open eye"></span>
                </div>
                <div class="warning">{{rpwarning}}</div>
            </td>
          </tr>
          <tr>
            <td>
              用户性别：<select v-model="sex">
                <option :value="2">男性</option>
                <option :value="1">女性</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><button @click="checkMes">保存</button></td>
          </tr>
        </table>
      </div>
    </transition>
  </div>
</template>
<script>
import { getCookie } from '../../config/utils'
import { getSex, changeUserMes } from '../../api/index'

export default {
  props: {
    showUserMes: Boolean
  },
  data () {
    return {
      loginName: '',
      sex: 2,
      pwd: '',
      rpwd: '',
      showPwd: false,
      showRpwd: false,
      pwarning: '',
      rpwarning: '',
      showToast: false
    }
  },
  watch: {
    showUserMes (newValue, oldValue) {
      this.showToast = newValue
    }
  },
  methods: {
    isShowToast () {
      this.showToast = !this.showToast
      this.$emit('updateShowToast', this.showToast)
    },
    checkMes () {
      const exp = /\w{6}/
      if (this.pwd === '') {
        this.pwarning = '密码不能为空'
      } else if (!exp.test(this.pwd)) {
        this.pwarning = '密码不符合格式'
      } else if (this.rpwd === '') {
        this.rpwarning = '确认密码不能为空'
        this.pwarning = ''
      } else if (!exp.test(this.rpwd)) {
        this.rpwarning = '确认密码不符合格式'
        this.pwarning = ''
      } else if (this.pwd !== this.rpwd) {
        this.rpwarning = '确认密码与密码不一致'
        this.pwarning = ''
      } else {
        this.pwarning = ''
        this.rpwarning = ''
        changeUserMes({
          name: this.loginName,
          password: this.pwd,
          sex: this.sex
        }).then(res => {
          const data = res.data
          if (data.status === 1) {
            alert('修改成功！')
          }
        })
      }
    },
    isShowPwd (flag) {
      if (flag === 1) {
        this.showPwd = !this.showPwd
      } else {
        this.showRpwd = !this.showRpwd
      }
    }
  },
  mounted () {
    const name = getCookie('his_user')
    this.loginName = name
    getSex({ name }).then(res => {
      if (res.data.sex === 3) {
        this.sex = 1
      } else {
        this.sex = res.data.sex
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
  .toast-wrapper-enter, .toast-wrapper-leave-to
    opacity: 0
  .toast-wrapper-enter-active, .toast-wrapper-leave-active
    transition: all 1s
  .toast-content-enter, .toast-content-leave-to
    opacity: 0
    transform: translateY(10%)
  .toast-content-enter-active, .toast-content-leave-active
    transition: all .5s
  .toast-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 12
    background-color: rgba(0, 0, 0, .5)
  .toast-content
    position: fixed
    top: 5%
    left: 30%
    z-index: 13
    background-color: #FFF
    width: 500px
    height: 300px
    .toast-title
      background-color: #F3F3F3
      height: 39px
      text-align: center
      line-height: 40px
    table
      width: 100%
      margin: 10px 0px
      td
        height: 50px
        text-align: center
        .input
          display: inline-block
          box-sizing: border-box
          padding-top: 5px
          width: 80%
          background-color: #f9f9f9
          border: 1px solid #ccc
          height: 30px
          vertical-align: middle
          text-align: left
          color: #949494
          cursor: no-drop
        div
          position: relative
          input
            box-sizing: border-box
            padding-right: 35px
        .warning
          text-align: left
          color: red
          font-size: 10px
          padding-left: 90px
        .eye
          position: absolute
          top: 8px
          right: 20px
          cursor: pointer
        input
          outline: none
          width: 80%
          background-color: #F9F9F9
          border: 1px solid #CCC
          height: 30px
          &:focus
            border: 1px solid #fdbac5
        .inputwarning
          border: 1px solid #dbb1b1
          background-color: #fff0f0
        select
          outline: none
          width: 80%
          background-color: #F9F9F9
          border: 1px solid #CCC
          height: 30px
        button
          width: 99%
          background-color: #316CDB
          color: #FFF
          border: 1px solid #00F
          border-radius: 2px
          outline: none
          height: 30px
          cursor: pointer
</style>
