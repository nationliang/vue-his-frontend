<template>
  <div id="login">
    <div style="margin: 50px auto;width:350px;">
      <img :src="require('../assets/images/redten.png')" style="width: 80px;height: 70px;vertical-align: middle;"><span style="color: #06F;font-size: 30px;vertical-align: middle;">还治不了你了医院</span>
    </div>
    <div class="login-wrapper">
      <div v-if="!resetPwd" class="login-title-wrapper">
        <span class="title-item" :class="{ 'title-item-active1': login }"><span :class="{ 'title-item-active2': login }" @click="toggleWay(1)">用户登录</span></span>
        <span class="title-item" :class="{ 'title-item-active1': !login }"><span :class="{ 'title-item-active2': !login }" @click="toggleWay(2)">用户注册</span></span>
      </div>
      <div v-if="resetPwd" class="login-title-wrapper">
        <span class="reset-title-item">用户密码重置</span>
      </div>
      <div v-if="login && !resetPwd" class="login">
        <div>
          <input maxlength="10" title="最大字符数为10" placeholder="用户名" type="text" id="login-name" v-model="loginUser" ref="loginUser" :class="{'warningStyle': luwarning || fbmes11}">
        </div>
        <div class="warningWord" v-if="luwarning">用户名为必填项</div>
        <div class="warningWord">{{fbmes11}}</div>
        <!-- <div class="fbmes"><input value="用户不存在"></div> -->
        <div class="item-container">
          <input v-if="!showPw" placeholder="密码(悬停提示)" title="从英文字母、数字和下划线中选择6位及其以上构成密码" type="password" id="login-password" v-model="loginPwd" ref="loginPwd" :class="{'warningStyle':lpwarning || pwns || fbmes12}">
          <span v-if="!showPw" class="iconfont icon-yanjing eye" @click="isShowPw(1)"></span>
          <input v-if="showPw" placeholder="密码(悬停提示)" title="从英文字母、数字和下划线中选择6位及其以上构成密码" type="text" id="login-password" v-model="loginPwd" ref="loginPwd" :class="{'warningStyle':lpwarning || pwns || fbmes12}">
          <span v-if="showPw" class="iconfont icon-icon-eye-open eye" @click="isShowPw(1)"></span>
        </div>
        <div class="warningWord" v-if="lpwarning">密码为必填项</div>
        <div class="warningWord" v-if="pwns">密码不符合格式</div>
        <div class="warningWord">{{fbmes12}}</div>
        <div class="item-container code-wrapper">
          <input type="text" placeholder="验证码" v-model="cheCode" :class="{'warningStyle': ccode || lccinc}">
          <!-- <img :src="lcImgSrc" style="position: absolute;top: 7px;right: 20px;cursor: pointer;" @click="refreshCimg(1)"> -->
          <check-code class="check-code" :identifyCode="identifyCode" @changeCode="changeCode"></check-code>
        </div>
        <div class="warningWord" v-if="ccode">请填写验证码</div>
        <div class="warningWord">{{fbmes13}}</div>
        <div style="font-size: 10px;color: blue;text-align: right;padding: 0 23px;cursor: pointer;height: 30px;"><span @click="toggleWay(3)">忘记密码?</span></div>
        <button @click="checkLoginMessege()">登录</button>
      </div>
      <div v-if="!login && !resetPwd" class="login">
        <div>
          <input maxlength="10" title="最大字符数为10" placeholder="用户名" type="text" id="register-name" v-model="registerUser" ref="registerUser" :class="{'warningStyle': ruwarning}">
        </div>
        <div class="warningWord" v-if="ruwarning">用户名为必填项</div>
        <div class="warningWord">{{runhae}}</div>
        <div class="item-container">
          <input v-if="!rshowPw" placeholder="密码(悬停提示)" title="从英文字母、数字和下划线中选择6位及其以上构成密码" type="password" id="register-pw" v-model="registerPwd" ref="registerPwd" :class="{'warningStyle': rpwarning || rpnswarning}">
          <span v-if="!rshowPw" class="iconfont icon-yanjing eye" @click="isShowPw(2)"></span>
          <input v-if="rshowPw" placeholder="密码(悬停提示)" title="从英文字母、数字和下划线中选择6位及其以上构成密码" type="text" id="register-pw" v-model="registerPwd" ref="registerPwd" :class="{'warningStyle': rpwarning || rpnswarning}">
          <span v-if="rshowPw" class="iconfont icon-icon-eye-open eye" @click="isShowPw(2)"></span>
        </div>
        <div class="warningWord" v-if="rpwarning">密码为必填项</div>
        <div class="warningWord" v-if="rpnswarning">密码不符合格式</div>
        <div class="item-container">
          <input v-if="!rrshowPw" title="从英文字母、数字和下划线中选择6位及其以上构成密码" placeholder="确认密码(悬停提示)" type="password" id="register-rpw" v-model="registerRpwd" ref="registerRpwd" :class="{'warningStyle': rrpwarning || rpntswarning || rrpnswarning}">
          <span v-if="!rrshowPw" class="iconfont icon-yanjing eye" @click="isShowPw(3)"></span>
          <input v-if="rrshowPw" title="从英文字母、数字和下划线中选择6位及其以上构成密码" placeholder="确认密码(悬停提示)" type="text" id="register-rpw" v-model="registerRpwd" ref="registerRpwd" :class="{'warningStyle': rrpwarning || rpntswarning || rrpnswarning}">
          <span v-if="rrshowPw" class="iconfont icon-icon-eye-open eye" @click="isShowPw(3)"></span>
        </div>
        <div class="warningWord" v-if="rrpwarning">确认密码为必填项</div>
        <div class="warningWord" v-if="rrpnswarning">密码不符合格式</div>
        <div class="warningWord" style="margin-left: 0;" v-if="rpntswarning">密码与确认密码不一致</div>
        <div class="item-container code-wrapper">
          <input type="text" v-model="rchecode" placeholder="验证码" :class="{'warningStyle': rccode}">
          <!-- <img :src="require('../assets/images/checkcode/' + rcimg + '.png')" style="position: absolute;top: 7px;right: 20px;"> -->
          <check-code class="check-code" :identifyCode="identifyCode" @changeCode="changeCode"></check-code>
        </div>
        <div class="warningWord" v-if="rccode">请填写验证码</div>
        <div class="warningWord">{{fbmes22}}</div>
        <div>
          <span class="sex">
            <label for="man">男&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="radio" name="sex" value="2" id="man" v-model="registerSex">
          </span>
          <span class="sex">
            <label for="woman">女&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="radio" name="sex" value="1" id="woman" v-model="registerSex">
          </span>
        </div>
        <button @click="checkRegisterMessege()">注册</button>
      </div>
      <div v-if="resetPwd" class="login">
        <div>
          <input maxlength="10" title="最大字符数为10" placeholder="用户名" type="text" v-model="resetUser" :class="{'warningStyle': reuwarning}">
        </div>
        <div class="warningWord" v-if="reuwarning">用户名为必填项</div>
        <div class="warningWord">{{fbmes31}}</div>
        <div class="item-container">
          <input v-if="!showRepw" placeholder="密码(悬停提示)" title="从英文字母、数字和下划线中选择6位及其以上构成密码" type="password" v-model="resetRpwd" :class="{'warningStyle': repwarning || repnswarning}">
          <span v-if="!showRepw" class="iconfont icon-yanjing eye" @click="isShowPw(4)"></span>
          <input v-if="showRepw" placeholder="密码(悬停提示)" title="从英文字母、数字和下划线中选择6位及其以上构成密码" type="text" v-model="resetRpwd" :class="{'warningStyle': repwarning || repnswarning}">
          <span v-if="showRepw" class="iconfont icon-icon-eye-open eye" @click="isShowPw(4)"></span>
        </div>
        <div class="warningWord" v-if="repwarning">密码为必填项</div>
        <div class="warningWord" v-if="repnswarning">密码不符合格式</div>
        <div class="item-container">
          <input v-if="!showRerpw" title="从英文字母、数字和下划线中选择6位及其以上构成密码" placeholder="确认密码(悬停提示)" type="password" v-model="resetRrpwd" :class="{'warningStyle': rerpwarning || rerpnswarning || repntswarning}">
          <span v-if="!showRerpw" class="iconfont icon-yanjing eye" @click="isShowPw(5)"></span>
          <input v-if="showRerpw" title="从英文字母、数字和下划线中选择6位及其以上构成密码" placeholder="确认密码(悬停提示)" type="text" v-model="resetRrpwd" :class="{'warningStyle': rerpwarning || rerpnswarning || repntswarning}">
          <span v-if="showRerpw" class="iconfont icon-icon-eye-open eye" @click="isShowPw(5)"></span>
        </div>
        <div class="warningWord" v-if="rerpwarning">确认密码为必填项</div>
        <div class="warningWord" v-if="rerpnswarning">密码不符合格式</div>
        <div class="warningWord" style="margin-left: 0;" v-if="repntswarning">密码与确认密码不一致</div>
        <div class="item-container code-wrapper">
          <input type="text" v-model="resetCheCode" placeholder="验证码">
          <!-- <img :src="require('../assets/images/checkcode/'+ recimg +'.png')" style="position: absolute;top: 7px;right: 20px;" :class="{'warningStyle': reccode}"> -->
          <check-code class="check-code" :identifyCode="identifyCode" @changeCode="changeCode"></check-code>
        </div>
        <div class="warningWord" v-if="reccode">请填写验证码</div>
        <div class="warningWord">{{fbmes32}}</div>
        <div style="font-size: 10px;color: blue;text-align: right;padding: 0 23px;cursor: pointer;height: 30px;"><span @click="toggleWay(3)">登录?</span></div>
        <button @click="resetPassword()">确认重置密码</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  signedIn,
  getCheckCode,
  addUser,
  changeUser
} from '../api/index'
import { setCookie, getDateStr } from '../config/utils'
import CheckCode from '../components/common/CheckCode'

export default {
  data() {
    return {
      identifyCode: '' + Math.floor(Math.random() * 9000 + 1000),
      login: true,
      loginUser: "admin",
      loginPwd: "his2000",
      registerUser: "",
      registerPwd: "",
      registerRpwd: "",
      registerSex: 2,
      luwarning: false,
      lpwarning: false,
      ruwarning: false,
      rpwarning: false,
      rrpwarning: false,
      rpntswarning: false,
      pwns: false,
      resetPwd: false,
      ccode: false,
      cheCode: "",
      showPw: false,
      rccode: false,
      rchecode: "",
      rshowPw: false,
      rrshowPw: false,
      rershow: false,
      resetUser: "",
      reuwarning: false,
      resetRpwd: "",
      repwarning: false,
      resetRrpwd: "",
      rerpwarning: false,
      repnswarning: false,
      repntswarning: false,
      reccode: false,
      showRepw: false,
      rerpnswarning: false,
      resetCheCode: "",
      showRerpw: false,
      rpnswarning: false,
      rrpnswarning: false,
      alertContent: "",
      fbmes11: "",
      fbmes12: "",
      fbmes13: "",
      lccinc: false,
      lcimg: '1036',
      ccArr: [1036, 1222, 3920, 4390, 4551, 4745, 4894, 5750, 6226, 6263, 7608, 9474],
      runhae: '',
      rcimg: '1036',
      recimg: '1036',
      fbmes22: '',
      fbmes31: '',
      fbmes32: ''
    }
  },
  computed: {
    lcImgSrc () {
      return "require('../assets/images/checkcode/"+ this.lcimg + ".png')"
    }
  },
  components: {
    CheckCode
  },
  methods: {
    changeCode () {
      const code = Math.floor(Math.random() * 9000 + 1000)
      this.identifyCode = code + ''
    },
    resetPassword () {
      let exp = /\w{6}/ //不要加g，否则第二次调用test会达不到预期
      if (this.resetUser === "") {
        this.reuwarning = true
      } else if (this.resetRpwd === "") {
        this.repwarning = true
        this.reuwarning = false
      } else if (!exp.test(this.resetRpwd)) {
        this.repnswarning = true
        this.reuwarning = false
        this.repwarning = false
      } else if (this.resetRrpwd === "") {
        this.rerpwarning = true
        this.reuwarning = false
        this.repwarning = false
        this.repnswarning = false
      } else if (!exp.test(this.resetRrpwd)) {
        this.rerpnswarning = true
        this.reuwarning = false
        this.repwarning = false
        this.repnswarning = false
        this.rerpwarning = false
      } else if (this.resetRpwd !== this.resetRrpwd) {
        this.repntswarning = true
        this.reuwarning = false
        this.repwarning = false
        this.repnswarning = false
        this.rerpwarning = false
        this.rerpnswarning = false
      } else if (this.resetCheCode === "") {
        this.reccode = true
        this.reuwarning = false
        this.repwarning = false
        this.repnswarning = false
        this.rerpwarning = false
        this.rerpnswarning = false
        this.repntswarning = false
      } else {
        this.reuwarning = false
        this.repwarning = false
        this.repnswarning = false
        this.rerpwarning = false
        this.rerpnswarning = false
        this.repntswarning = false
        this.reccode = false
        if (JSON.parse(this.identifyCode) !== JSON.parse(this.resetCheCode)) {
          this.fbmes32 = '验证码不正确'
        } else {
          this.fbmes32 = ''
          changeUser({
            name: this.resetUser,
            password: this.resetRrpwd,
            date: getDateStr()
          }).then(res => {
            const data = res.data
            if (data.status === 1) {
              this.fbmes31 = '用户名不存在'
            } else {
              this.fbmes32 = ''
              alert('密码重置成功')
            }
          })
        }
      }
    },
    isShowPw(flag) {
      if (flag === 1) {
        this.showPw = !this.showPw
      } else if (flag === 2) {
        this.rshowPw = !this.rshowPw
      } else if (flag === 3) {
        this.rrshowPw = !this.rrshowPw
      } else if (flag === 4) {
        this.showRepw = !this.showRepw
      } else {
        this.showRerpw = !this.showRerpw
      }
    },
    checkRegisterMessege () {
      let exp = /\w{6}/ //不要加g，否则第二次调用test会达不到预期
      if (this.registerUser === "") {
        this.ruwarning = true
      } else if (this.registerPwd === ""){
        this.rpwarning = true
        this.ruwarning = false
      } else if (!exp.test(this.registerPwd)) {
        this.rpnswarning = true
        this.ruwarning = false
        this.rpwarning = false
      } else if (this.registerRpwd === "") {
        this.rrpwarning = true
        this.ruwarning = false
        this.rpwarning = false
        this.rpnswarning = false
      } else if (!exp.test(this.registerRpwd)) {
        this.rrpnswarning = true
        this.ruwarning = false
        this.rpwarning = false
        this.rpnswarning = false
        this.rrpwarning = false
      }  else if (this.registerPwd !== this.registerRpwd) {
        this.rpntswarning = true
        this.rrpnswarning = false
      } else if (this.rchecode === "") {
        this.rccode = true
        this.ruwarning = false
        this.rpwarning = false
        this.rpnswarning = false
        this.rrpwarning = false
        this.rpntswarning = false
      } else {
        this.rccode = false
        this.ruwarning = false
        this.rpwarning = false
        this.rpnswarning = false
        this.rrpwarning = false
        this.rpntswarning = false
        if (JSON.parse(this.identifyCode) !== JSON.parse(this.rchecode)) {
          this.fbmes22 = '验证码不正确'
        } else {
          this.fbmes22 = ''
          addUser({
            name: this.registerUser,
            password: this.registerPwd,
            sex: this.registerSex,
            date: getDateStr(),
            kind: 1
          }).then(res => {
            const data = res.data
            if (data.status === 1) {
              this.runhae = '该用户名已注册'
            } else {
              this.runhae = ''
              alert('注册成功，请登录！')
            }
          })
        }
      }
    },
    checkLoginMessege() {
      let exp = /\w{6}/
      if (this.loginUser === "") {
        this.luwarning = true
      } else if (this.loginPwd === "") {
        this.lpwarning = true
        this.luwarning = false
      } else if (!exp.test(this.loginPwd)) {
        this.pwns = true
        this.luwarning = false
        this.lpwarning = false
      } else if (this.cheCode === "") {
        this.ccode = true
        this.luwarning = false
        this.lpwarning = false
        this.pwns = false
      } else {
        this.ccode = false
        this.luwarning = false
        this.lpwarning = false
        this.pwns = false
        if (parseInt(this.identifyCode) !== parseInt(this.cheCode)) {
          this.fbmes13 = '验证码不正确'
          this.changeCode()
        } else {
          this.fbmes13 = ''
          signedIn({
            name: this.loginUser,
            password: this.loginPwd,
            checkCode: this.cheCode
          }).then(res => {
            const data = res.data
            const status = data.status
            const mes = data.mes
            const kind = data.kind
            if (status === 11) {
              this.fbmes11 = mes
            } else if (status === 12) {
              this.fbmes11 = ''
              this.fbmes12 = mes
            } else {
              this.fbmes12 = ''
              setCookie('his_user', this.loginUser)
              setCookie('his_kind', kind)
              this.$router.push('/door')
            }
          })
        }
      }
    },
    toggleWay(flag) {
      if (flag === 1) {
        this.login = true
      } else if (flag === 2) {
        this.login = false
        this.refreshCimg(2)
      } else {
        this.resetPwd = !this.resetPwd
        this.refreshCimg(3)
      }
    },
    refreshCimg (flag = 1) {
      getCheckCode().then(res => {
        const data = res.data
        const index = data.index
        if (flag === 1) {
          this.lcimg = this.ccArr[index]
        } else if (flag === 2) {
          this.rcimg = this.ccArr[index]
        } else {
          this.recimg = this.ccArr[index]
        }
      })
    }
  },
  mounted () {
    this.refreshCimg()
  }
}
</script>
<style lang="stylus" scoped>
  #login
    overflow: hidden
    min-height: 657px
    background-image: url("../assets/images/lbg.jpg")
    .login-wrapper
      text-align: center
      line-height: 40px
      width: 350px
      margin: 10px auto
      box-shadow: 0px 0px 5px #C4C4C4
      border-radius: 5px
      background: #ffffff
      .login-title-wrapper
        padding-top: 10px
        border-bottom: 1px solid #999
        .title-item
          cursor: pointer
          display: inline-block
          margin: 0 50px 
          span
            font-weight: 1000
            color: #ADADAD
            font-size: 15px
          .title-item-active2
            color: #000
        .title-item-active1
          border-bottom: 2px solid #666
        .reset-title-item
          font-weight: 1000
          color: #000
          font-size: 15px
      .login
        padding: 10px 10px 10px 10px
        .fbmes
          line-height: 20px
          text-align: left
          padding: 0 26px
          font-size: 10px
          input
            outline: none
            color: red
        .warningWord
          line-height: 20px
          text-align: left
          padding: 0 26px
          font-size: 10px
          color: red
        .eye
          position: absolute
          top: 3px
          right: 28px
          cursor: pointer
        .item-container
          margin-top:8px
          position: relative
          &.code-wrapper
            padding-left: 19px
            text-align: left
            input[type=text]
              width: 190px
              padding-right: 5px
          .check-code
            position: absolute
            top: 4px
            right: 20px
        input[type=text], input[type=password]
          width: 88%
          box-sizing: border-box
          border-radius: 5px
          box-shadow: 0px 0px 1px #B3B0AE
          border: 1px solid #D2D2D0
          padding: 10px 28px 10px 5px
          background-color: #F6F6F6
          outline: none
          font-size: 10px
          &:focus
            border: 1px solid #fdbac5 !important
          &.warningStyle
            border: 1px solid #dbb1b1
            background: #fff0f0
        button
          background-color: #34C8ED
          color: #FFF
          outline: none
          box-shadow: 0px 0px 2px #D0CECC
          border-radius: 5px
          border: 0px
          width: 200px
          padding: 8px 0px
          cursor: pointer
        .sex
          display: inline-block
          margin: 0 27px 0 26px
</style>
