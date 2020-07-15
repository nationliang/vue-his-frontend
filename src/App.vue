<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
    <div v-if="isShowQueryDialog" ref="queryDialog" @mousedown="dragServiceDialog" class="query-dialog-wrapper">
      <h1>导诊窗口</h1>
      <div class="query-content">
        <div class="robot-message-wrapper">
          <div class="avatar-wrapper">
            <el-avatar size="small" icon="el-icon-service"></el-avatar>
            <span class="avatar-name">导诊机器人</span>
          </div>
          <div class="bubble-wrapper">
            <div class="top"></div>
            <div class="bottom">564654645</div>
          </div>
          <div class="tip-wrapper">
            <div class="tip">
              1564654564564
            </div>
          </div>
        </div>
        <div class="client-message-wrapper">
          <div class="avatar-wrapper">
            <el-avatar size="small" icon="el-icon-question"></el-avatar>
            <span class="avatar-name">患者</span>
          </div>
          <div class="bubble-wrapper">
            <div class="top"></div>
            <div class="bottom">464646464646</div>
          </div>
          <div class="tip-wrapper">
            <div class="tip">
              455555555555
            </div>
          </div>
        </div>
        <div class="client-message-wrapper">
          <div class="avatar-wrapper">
            <el-avatar size="small" icon="el-icon-question"></el-avatar>
            <span class="avatar-name">患者</span>
          </div>
          <div class="bubble-wrapper">
            <div class="top"></div>
            <div class="bottom">464646464646</div>
          </div>
          <div class="tip-wrapper">
            <div class="tip">
              455555555555
            </div>
          </div>
        </div>
        <div class="client-message-wrapper">
          <div class="avatar-wrapper">
            <el-avatar size="small" icon="el-icon-question"></el-avatar>
            <span class="avatar-name">患者</span>
          </div>
          <div class="bubble-wrapper">
            <div class="top"></div>
            <div class="bottom">464646464646</div>
          </div>
          <div class="tip-wrapper">
            <div class="tip">
              455555555555
            </div>
          </div>
        </div>
        <div class="client-message-wrapper">
          <div class="avatar-wrapper">
            <el-avatar size="small" icon="el-icon-question"></el-avatar>
            <span class="avatar-name">患者</span>
          </div>
          <div class="bubble-wrapper">
            <div class="top"></div>
            <div class="bottom">464646464646</div>
          </div>
          <div class="tip-wrapper">
            <div class="tip">
              455555555555
            </div>
          </div>
        </div>
      </div>
      <div class="send-wrapper">
        <textarea placeholder="请输入疾病的症状，我们将会给您推荐挂号信息。查询信息格式为：关键词##关键词##关键词...以此类推。"></textarea>
        <div class="button-wrapper">
          <el-button type="primary" size="mini">发送</el-button>
        </div>
      </div>
    </div>
    <div v-if="isShowCommunicateDialog" class="communicate-wrapper" ref="communicateDialog" @mousedown="dragCommunicateDialog">
      <h1>通讯窗口</h1>
      <div class="title">
        <div v-if="!isShowCommunicate" @click="showCommunicate" style="display: inline-block;">
          <i class="el-icon-caret-left"></i>
        </div>
        <div v-else style="display: inline-block;" @click="showCommunicate">
          <i class="el-icon-caret-right"></i>
        </div>
        <span>联系人列表</span>
      </div>
      <div class="content-container">
        <div class="left" :class="{ 'expand' : !isShowCommunicate }">
          <div class="left-top">
            <div class="robot-message-wrapper">
              <div class="avatar-wrapper">
                <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
                <span class="avatar-name">患者乙</span>
              </div>
              <div class="bubble-wrapper">
                <div class="top"></div>
                <div class="bottom">564654645</div>
              </div>
              <div class="tip-wrapper">
                <div class="tip">
                  1564654564564
                </div>
              </div>
            </div>
            <div class="client-message-wrapper">
              <div class="avatar-wrapper">
                <el-avatar size="small" icon="el-icon-user"></el-avatar>
                <span class="avatar-name">患者甲</span>
              </div>
              <div class="bubble-wrapper">
                <div class="top"></div>
                <div class="bottom">464646464646</div>
              </div>
              <div class="tip-wrapper">
                <div class="tip">
                  455555555555
                </div>
              </div>
            </div>
          </div>
          <div class="left-bottom">
            <textarea v-model="communicateValue"></textarea>
            <div class="button-wrapper">
              <el-button type="primary" size="mini">发送</el-button>
            </div>
          </div>
        </div>
        <div class="right" :class="{ 'active' : isShowCommunicate }">
            <div class="member" v-for="(item,index) in memberSets" :key="index">
              <el-tooltip popper-class="tooltipStyle" :content="item.kind" placement="left-start"><span>{{item.name}}</span></el-tooltip><span class="count">{{item.count}}</span>
            </div>
        </div>
      </div>
    </div>
    <span class="query-button" @click="showQueryDialog">
      <img :src="require('./assets/images/service.png')">
    </span>
    <span class="communicate-button" @click="showCommunicateDialog">
      <img :src="require('./assets/images/communicate.png')">
    </span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShowQueryDialog: false,
      communicateValue: '',
      memberSets: [
        {
          name: '李四',
          count: 1000,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        },
        {
          name: '李四',
          count: 3,
          kind: '患者'
        }
      ],
      isShowCommunicate: false,
      isShowCommunicateDialog: false
    }
  },
  methods: {
    showCommunicateDialog () {
      this.isShowCommunicateDialog = !this.isShowCommunicateDialog
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
      
    }
  }
}
</script>
<style lang="stylus" scoped>
  #app
    min-height: 652px
    background: url("./assets/images/bg.png")
    .query-dialog-wrapper
      position: fixed
      top: 90px
      right: 460px
      z-index: 20
      width: 410px
      height: 442px
      background-color: #ffffff
      box-shadow: 0px 0px 2px #B2B2B2
      text-align: center
      h1
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
      z-index: 20
      box-shadow: 0px 0px 1px #C6C4C4
      padding: 5px
      background-color: #3EBAE3
      img
        width: 50px
        height: 50px
    .communicate-button
      position: fixed
      right: 10px
      bottom: 100px
      z-index: 20
      box-shadow: 0px 0px 1px #C6C4C4
      padding: 5px
      background-color: #3EBAE3
      img
        width: 50px
        height: 50px
    .communicate-wrapper
      position: absolute
      top: 100px
      left: 400px
      z-index: 20px
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
        box-sizing: border-box
        height: 37px
        padding: 10px 50px 5px 0
        border-bottom: 1px solid #CCC
        color: #A29F97
        text-align: right
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
            .count
              border-radius: 50%
              background-color: #45D7EB
              color: #FFF
              font-size: 15px
              float: right
              margin-right: 5px
              padding: 0px 5px
</style>
