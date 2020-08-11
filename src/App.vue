<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
    <div v-if="isShowQueryDialog" ref="queryDialog" @mousedown="dragServiceDialog" class="query-dialog-wrapper">
      <h1 class="dialog-title">导诊窗口</h1>
      <div class="query-content">
        <div v-for="(item, index) in queryMes" :key="index">
          <div class="robot-message-wrapper" v-if="item.robotMes.content">
            <div class="avatar-wrapper">
              <el-avatar size="small" icon="el-icon-service"></el-avatar>
              <span class="avatar-name">导诊机器人</span>
            </div>
            <div class="bubble-wrapper">
              <div class="top"></div>
              <div class="bottom" v-html="item.robotMes.content"></div>
            </div>
            <div class="tip-wrapper">
              <div class="tip">
                {{item.robotMes.tip}}
              </div>
            </div>
          </div>
          <div class="client-message-wrapper" v-if="item.clientMes.content">
            <div class="avatar-wrapper">
              <el-avatar size="small" icon="el-icon-question"></el-avatar>
              <span class="avatar-name">患者</span>
            </div>
            <div class="bubble-wrapper">
              <div class="top"></div>
              <div class="bottom" v-html="item.clientMes.content"></div>
            </div>
            <div class="tip-wrapper">
              <div class="tip">
                {{item.clientMes.tip}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="send-wrapper">
        <textarea v-model="symptomDes" placeholder="请输入疾病的症状，我们将会给您推荐挂号信息。查询信息格式为：关键词##关键词##关键词...以此类推。"></textarea>
        <div class="button-wrapper">
          <el-button type="primary" size="mini" @click="submitSymptomDes">发送</el-button>
        </div>
      </div>
    </div>
    <div v-if="isShowCommunicateDialog" class="communicate-wrapper" ref="communicateDialog" @mousedown="dragCommunicateDialog">
      <h1 class="dialog-title">通讯窗口</h1>
      <div class="title">
        <div style="flex: 3;">
          <span style="margin: auto;">{{targetUser}}</span>
        </div>
        <div style="flex: 1;">
          <div v-if="!isShowCommunicate" @click="showCommunicate" style="display: inline-block;">
            <i class="el-icon-caret-left"></i>
          </div>
          <div v-else style="display: inline-block;" @click="showCommunicate">
            <i class="el-icon-caret-right"></i>
          </div>
          <span>联系人列表</span>
        </div>
      </div>
      <div class="content-container">
        <div class="left" :class="{ 'expand' : !isShowCommunicate }">
          <div class="left-top">
            <div v-for="(item, index) in communicationSets" :key="index">
              <div class="robot-message-wrapper" v-if="item.sender">
                <div class="avatar-wrapper">
                  <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
                  <span class="avatar-name">{{targetUser}}</span>
                </div>
                <div class="bubble-wrapper">
                  <div class="top" style="left: 9px"></div>
                  <div class="bottom" style="margin-left: 5px">{{item.sender.content}}</div>
                </div>
                <div class="tip-wrapper">
                  <div class="tip">
                    {{item.sender.date}}
                  </div>
                </div>
              </div>
              <div class="client-message-wrapper" v-if="item.receiver">
                <div class="avatar-wrapper">
                  <el-avatar size="small" icon="el-icon-user"></el-avatar>
                  <span class="avatar-name">{{self}}</span>
                </div>
                <div class="bubble-wrapper">
                  <div class="top" style="right: 11px"></div>
                  <div class="bottom" style="margin-right: 7px">{{item.receiver.content}}</div>
                </div>
                <div class="tip-wrapper">
                  <div class="tip">
                    {{item.receiver.date}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-bottom">
            <textarea v-model="communicateValue"></textarea>
            <div class="button-wrapper">
              <el-button type="primary" size="mini" @click="checkCondition">发送</el-button>
            </div>
          </div>
        </div>
        <div class="right" :class="{ 'active' : isShowCommunicate }">
            <div class="member" v-for="(item,index) in memberSets" :key="index">
              <el-tooltip popper-class="tooltipStyle" :content="item.kind" placement="left-start"><span @click="selectTargetUser(item.name)">{{item.name}}</span></el-tooltip><span class="count" v-if="item.count"><span class="text">{{item.count}}</span></span>
            </div>
        </div>
      </div>
    </div>
    <span v-if="isShowQandC" class="query-button" @click="showQueryDialog">
      <img class="app-img" :src="require('./assets/images/service.png')">
    </span>
    <span v-if="isShowQandC" class="communicate-button" @click="showCommunicateDialog">
      <span class="tip-ball" v-if="tipBallNum">{{tipBallNum}}</span>
      <img class="app-img" :src="require('./assets/images/communicate.png')">
    </span>
  </div>
</template>
<script>
import { sendSymptomDes, addVisitHistory, getClientIPandCity } from './api/index'
import { getDateStr, getCookie, setCookie } from './config/utils'
import {
  getDialogUserList,
  getUserMessageCount
} from './api/index'
import { MessageBox } from 'element-ui'

export default {
  data () {
    return {
      communicationSets: [],
      targetUser: '',
      targetUserMes: '',
      self: '',
      selfMes: '',
      isShowQueryDialog: false,
      communicateValue: '',
      memberSets: [
        // {
        //   name: '李四',
        //   count: "99+",
        //   kind: '患者'
        // },
        // {
        //   name: '李四',
        //   count: "10",
        //   kind: '患者'
        // },
        // {
        //   name: '李四',
        //   count: "2",
        //   kind: '患者'
        // },
        // {
        //   name: '李四',
        //   count: '',
        //   kind: '患者'
        // }
      ],
      isShowCommunicate: false,
      isShowCommunicateDialog: false,
      queryMes: [
        {
          robotMes: {
            content: '您好，请输入您症状，我们将为您提高智能导诊。',
            tip: getDateStr()
          },
          clientMes: {
            content: '',
            tip: getDateStr()
          }
        }
      ],
      symptomDes: ''
    }
  },
  computed: {
    tipBallNum () {
      let len = this.memberSets.length,
          num = 0
      for (let i = 0; i < len; i++) {
        if (this.memberSets[i].count) {
          num += parseInt(this.memberSets[i].count)
        }
      }
      return num
    },
    isShowQandC () {
      const path = this.$route.path
      // console.log(path)
      if (path === '/login') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    checkCondition () {
      let message = ''
      if (!getCookie('his_user')) {
        message = '请登录!'
      } else if (!this.targetUser) {
        message = '请选择聊天对象!'
      }
      if (message) {
        MessageBox({
          title: '警告',
          message,
          type: 'warning'
        })
      } else {
        this.$socket.emit('sendMes', {
          sender: getCookie('his_user'),
          receiver: this.targetUser,
          dialog: this.communicateValue,
          date: getDateStr()
        })
        this.self = getCookie('his_user')
        let dataSets = JSON.parse(localStorage.getItem(`'${this.targetUser}'`))
        // console.log(dataSets)
        // console.log(!(dataSets instanceof Array))
        if (!(dataSets instanceof Array)) {
          dataSets = []
        }
        const speakSets = {
          receiver: {
            content: this.communicateValue,
            date: getDateStr()
          }
        }
        dataSets.push(speakSets)
        // console.log(dataSets)
        this.communicationSets = dataSets
        localStorage.setItem(`'${this.targetUser}'`, JSON.stringify(dataSets))
        // this.communicationSets.push({
        //   receiver: {
        //     content: this.communicateValue,
        //     date: getDateStr()
        //   }
        // })
        this.communicateValue = ''
      }
    },
    selectTargetUser (name) {
      let message = ''
      if (!getCookie('his_user')) {
        message = '请登录!'
      }
      if (message) {
        MessageBox({
          title: '警告',
          message,
          type: 'warning'
        })
      } else {
        this.targetUser = name
        const data = { receiver: getCookie('his_user'), sender: name }
        // console.log(data)
        this.$socket.emit('reqMes', data)
      }
    },
    submitSymptomDes () {
      this.queryMes.push({
        robotMes: {
          content: '',
          tip: getDateStr()
        },
        clientMes: {
          content: this.symptomDes,
          tip: getDateStr()
        }
      })
      sendSymptomDes({ des: this.symptomDes }).then(res => {
        this.symptomDes = ''
        console.log(res.data.mes)
        this.queryMes.push({
          robotMes: {
            content: res.data.mes,
            tip: getDateStr()
          },
          clientMes: {
            content: '',
            tip: getDateStr()
          }
        })
      })
    },
    showCommunicateDialog () {
      if (getCookie('his_user') === null) {
        MessageBox({
          title: '警告',
          message: '请登录！',
          type: 'warning'
        })
      } else {
        this.isShowCommunicateDialog = !this.isShowCommunicateDialog
      }
    },
    dragCommunicateDialog (ev){//窗口拖拽
      var div = this.$refs.communicateDialog
      var mx = ev.clientX //不带单位
      var my = ev.clientY
      var dy = parseFloat(getComputedStyle(div, null).top.replace("px", ""))
      var dx = parseFloat(getComputedStyle(div, null).left.replace("px", ""))
      var fx = mx - dx
      var fy = my - dy
      
      onmousemove = function (ev2){
        var ny = ev2.clientY - fy
        var nx = ev2.clientX - fx
        div.style.cssText = "top:"+ny+"px;"+"left:"+nx+"px;display:block;"
      }	
      
      onmouseup = function () {
        onmousedown = null
        onmousemove = null
      }
      
    },
    showCommunicate () {
      this.isShowCommunicate = !this.isShowCommunicate
    },
    showQueryDialog () {
      this.isShowQueryDialog = !this.isShowQueryDialog
    },
    dragServiceDialog (ev){//窗口拖拽
      var div = this.$refs.queryDialog
      var mx = ev.clientX //不带单位
      var my = ev.clientY
      var dy = parseFloat(getComputedStyle(div, null).top.replace("px", ""))
      var dx = parseFloat(getComputedStyle(div, null).left.replace("px", ""))
      var fx = mx - dx
      var fy = my - dy
      
      onmousemove = function (ev2){
        var ny = ev2.clientY - fy
        var nx = ev2.clientX - fx
        div.style.cssText = "top:"+ny+"px;"+"left:"+nx+"px;display:block;"
      }	
      
      onmouseup = function () {
        onmousedown = null
        onmousemove = null
      }
      
    },
    async addMessageCount(data) {
      let flag = true
      for (let i = 0; i < data.length; i++) {
        let res =  await getUserMessageCount({ sender: data[i].name, receiver: getCookie('his_user')})
        data[i].count = res.data.num
        if (res.data.num && this.targetUser === data[i].name) {
          this.$socket.emit('reqMes', { receiver: getCookie('his_user'), sender: this.targetUser })
          flag = false
          break
        }
      }
      if (flag) {
        this.memberSets = data
      }
      // console.log(data)
    },
    getUserInfoNum () {
      const name = getCookie('his_user')
      this.$socket.emit('getInfoNum', { name })
    }
  },
  mounted () {
    const power = getCookie('his_kind')
    let user = getCookie('his_user')
    if (user !== null) {
      this.getUserInfoNum()
      this.$store.commit('setPower', power)
    } else {
      user = '匿名'
    }
    getClientIPandCity().then(res => {
      const data = res.data
      // console.log(data)
      let location = ['未知', '222']
      if (typeof data === "string") {
        location = data.trim().split(' ')
      }
      // console.log(location[0])
      addVisitHistory({
        visitor: user,
        ip: returnCitySN['cip'],
        address: location[0],
        date: getDateStr()
      })
    })
  },
  sockets: {
    connect () {},
    reqMes (data) {
      const dataSets = data.data
      const sender = data.sender
      let l = dataSets.length
      const comSets = []
      let newData = JSON.parse(localStorage.getItem(`'${sender}'`))
      if (!(newData instanceof Array)) {
        newData = []
      }
      for (let i = 0; i < l; i++) {
        newData.push({
          sender: {
            content: dataSets[i].dialog,
            date: dataSets[i].date
          }
        })
      }
      this.communicationSets = newData
      localStorage.setItem(`'${sender}'`, JSON.stringify(newData))
    },
    getInfoNum (data) {
      let name = getCookie('his_user')
      let userList = data.filter(item => {
        if (item.name !== name) {
          return true
        } else {
          return false
        }
      })
      this.addMessageCount(userList)
    }
  }
}
</script>
<style lang="stylus">
  #app
    min-height: 652px
    background: url("./assets/images/bg.png")
    .query-dialog-wrapper
      position: fixed
      top: 90px
      right: 460px
      z-index: 1000
      width: 410px
      height: 442px
      background-color: #ffffff
      box-shadow: 0px 0px 2px #B2B2B2
      text-align: center
      .dialog-title
        padding: 10px
        color: #FFF
        font-weight: bold
        background-color: #4DADE8
      .query-content
        height: 300px
        background-color: #F3F3F3
        overflow-y: auto
        .robot-message-wrapper
          margin: 10px
          .avatar-wrapper
            height: 30px
            line-height: 30px
            text-align: left
            .avatar-name
              display: inline-block
              height: 28px
              margin-left: 5px
              vertical-align: top
              font-size: 10px
              color: #a0a0a0
            span
              &:first-child
                vertical-align: top
          .bubble-wrapper
            position: relative
            padding-top: 10px
            text-align: left
            .top
              position: absolute
              top: -2px
              left: 8px
              height: 0
              width: 0
              border: 6px solid transparent
              border-bottom: 6px solid #fff
            .bottom
              display: inline-block
              max-width: 85%
              padding: 10px
              background-color: #ffffff
              border-radius: 5px 5px
              font-size: 8px
              text-align: left
          .tip-wrapper
            margin-top: 20px
            text-align: center
            .tip
              display: inline-block
              padding: 5px
              background-color: rgba(0, 0, 0, .1)
              border-radius: 5px 5px
              color: #ffffff
        .client-message-wrapper
          margin: 10px
          .avatar-wrapper
            height: 30px
            line-height: 30px
            text-align: right
            .avatar-name
              display: inline-block
              height: 28px
              margin-left: 5px
              vertical-align: top
              font-size: 10px
              color: #a0a0a0
            span
              &:first-child
                vertical-align: top
          .bubble-wrapper
            position: relative
            padding-top: 10px
            text-align: right
            .top
              position: absolute
              top: -2px
              right: 8px
              height: 0
              width: 0
              border: 6px solid transparent
              border-bottom: 6px solid #fff
            .bottom
              display: inline-block
              max-width: 85%
              padding: 10px
              background-color: #ffffff
              border-radius: 5px 5px
              font-size: 8px
              text-align: left
          .tip-wrapper
            margin-top: 20px
            text-align: center
            .tip
              display: inline-block
              padding: 5px
              background-color: rgba(0, 0, 0, .1)
              border-radius: 5px 5px
              color: #ffffff
      .send-wrapper
        textarea
          width: 98%
          height: 60px
          border: none
          outline: none
          resize: none
        .button-wrapper
          padding: 5px 10px 5px 0
          text-align: right
          border-top: 1px solid #e9e9e9
    .query-button
      position: fixed
      right: 10px
      bottom: 170px
      z-index: 1000
      box-shadow: 0px 0px 1px #C6C4C4
      padding: 5px
      background-color: #3EBAE3
      .app-img
        width: 50px
        height: 50px
    .communicate-button
      position: fixed
      right: 10px
      bottom: 100px
      z-index: 1000
      box-shadow: 0px 0px 1px #C6C4C4
      padding: 5px
      background-color: #3EBAE3
      img
        width: 50px
        height: 50px
      .tip-ball
        position: absolute
        top: -7px
        right: -6px
        background-color: red
        color: rgb(255, 255, 255)
        border-radius: 10px 10px
        padding: 5px
        font-size: 10px
        min-width: 10px
        height: 10px
        line-height: 10px
        text-align: center
    .communicate-wrapper
      position: fixed
      top: 100px
      left: 400px
      z-index: 1000
      width: 615px
      height: 488px
      background-color: #ffffff
      box-shadow: 0px 0px 2px #B2B2B2
      h1
        background-color: #4DADE8
        padding: 10px
        color: #FFF
        font-weight: bold
        text-align: center
      .title
        display:flex
        box-sizing: border-box
        height: 37px
        padding: 10px 50px 5px 0
        border-bottom: 1px solid #CCC
        color: #A29F97
        text-align: center
      .content-container
        position: relative
        height: 415px
        background-color: #F3F3F3
        overflow: hidden
        .left
          display: inline-block
          width: 398px
          height: 415px
          background-color: #ffffff
          vertical-align: top
          transition: width .5s
          &.expand
            width: 100%
          .left-top
            height: 310px
            border-bottom: 1px solid #CCC
            background-color: #F3F3F3
            overflow-y: auto
            .robot-message-wrapper
              margin: 10px
              .avatar-wrapper
                height: 30px
                line-height: 30px
                text-align: left
                .avatar-name
                  display: inline-block
                  height: 28px
                  margin-left: 5px
                  vertical-align: top
                  font-size: 10px
                  color: #a0a0a0
                span
                  &:first-child
                    vertical-align: top
              .bubble-wrapper
                position: relative
                padding-top: 10px
                text-align: left
                .top
                  position: absolute
                  top: -2px
                  left: 8px
                  height: 0
                  width: 0
                  border: 6px solid transparent
                  border-bottom: 6px solid #fff
                .bottom
                  display: inline-block
                  max-width: 85%
                  padding: 10px
                  background-color: #ffffff
                  border-radius: 5px 5px
                  font-size: 8px
                  text-align: left
              .tip-wrapper
                margin-top: 20px
                text-align: center
                .tip
                  display: inline-block
                  padding: 5px
                  background-color: rgba(0, 0, 0, .1)
                  border-radius: 5px 5px
                  color: #ffffff
            .client-message-wrapper
              margin: 10px
              .avatar-wrapper
                height: 30px
                line-height: 30px
                text-align: right
                .avatar-name
                  display: inline-block
                  height: 28px
                  margin-left: 5px
                  vertical-align: top
                  font-size: 10px
                  color: #a0a0a0
                span
                  &:first-child
                    vertical-align: top
              .bubble-wrapper
                position: relative
                padding-top: 10px
                text-align: right
                .top
                  position: absolute
                  top: -2px
                  right: 8px
                  height: 0
                  width: 0
                  border: 6px solid transparent
                  border-bottom: 6px solid #fff
                .bottom
                  display: inline-block
                  max-width: 85%
                  padding: 10px
                  background-color: #ffffff
                  border-radius: 5px 5px
                  font-size: 8px
                  text-align: left
              .tip-wrapper
                margin-top: 20px
                text-align: center
                .tip
                  display: inline-block
                  padding: 5px
                  background-color: rgba(0, 0, 0, .1)
                  border-radius: 5px 5px
                  color: #ffffff
          .left-bottom
            height: 105px
            textarea
              width: 99.5%
              height: 60px
              border: none
              outline: none
              resize: none
            .button-wrapper
              padding: 5px 10px 5px 0
              text-align: right
              border-top: 1px solid #e9e9e9
        .right
          position: absolute
          top: 0
          right: 0
          display: inline-block
          width: 216px
          height: 415px
          border-left: 1px solid #CCC
          overflow-y: auto
          background-color: #ffffff
          transform: translateX(100%)
          transition: all .5s
          &.active
            transform: translateX(0)
          .member
            color: black
            cursor: pointer
            overflow: hidden
            padding: 5px 0px 5px 10px
            &:hover
              background-color: #E4E4E4
            .count
              color: #FFF
              font-size: 10px
              float: right
              margin-right: 5px
              padding: 0px 5px
              &:before
                display: inline-block
                background: #45D7EB
                height: 20px
                width: 10px
                content: ''
                border-radius: 10px 0 0 10px
                vertical-align: top
              &:after
                display: inline-block
                background: #45D7EB
                height: 20px
                width: 10px
                content: ''
                border-radius: 0 10px 10px 0
                vertical-align: top
              .text
                display: inline-block
                height: 20px
                line-height: 20px
                vertical-align: top
                background-color: #45D7EB
</style>
