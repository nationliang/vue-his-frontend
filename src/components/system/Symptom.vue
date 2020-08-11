<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="symptomList" max-height="420">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="病名">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.name"><div class="text-flow">{{scope.row.name}}</div></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="content" label="症状">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.content"><div class="text-flow">{{scope.row.content}}</div></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date" label="日期"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-wrapper">
      <el-button type="text" size="mini" @click="showSymptomDialog">添加症状</el-button>
    </div>
    <div class="dialog-wrapper" v-if="isShowSymptomDialog" @click="showSymptomDialog"></div>
    <div class="dialog-content" v-if="isShowSymptomDialog">
      <h1>添加症状</h1>
      <div class="item-wrapper">
        <span>症状名称：</span><input type="text" v-model="symptomName">
      </div>
      <div class="item-wrapper">
        <span>隶属科室：</span><select v-model="depKind"><option v-for="(item, index) in depKindList" :key="index" :value="item">{{item}}</option></select>
      </div>
      <div class="item-wrapper">
        <span style="vertical-align: top;">症状描述：</span><textarea v-model="symptomContent"></textarea>
      </div>
      <div class="dialog-button-wrapper">
        <el-button type="primary" size="medium" @click="addSymptomMes">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getDateStr } from '../../config/utils'
import { MessageBox } from 'element-ui'
import {
  getSymptomMesList,
  deleteSymptomMes,
  addSymptomMes,
  getDep
} from '../../api/index'

export default {
  data () {
    return {
      isShowSymptomDialog: false,
      symptomName: null,
      depKind: null,
      symptomContent: null,
      depKindList: [
        '妇科',
        '男科',
        '儿科',
        '牙科',
        '中医科',
      ],
      symptomList: [
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        },
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        },
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        },
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        },
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        },
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        },
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        },
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        },
        {
          name: '普通感冒',
          content: '流鼻涕,鼻塞,打喷嚏,流眼泪,发烧,咳嗽,咽痛,声音嘶哑,全身无力',
          dep: '呼吸内科',
          date: getDateStr()
        }
      ]
    }
  },
  methods: {
    addSymptomMes() {
      let message = ''
      if (!this.symptomName) {
        message = '症状名不能为空！'
      } else if (!this.depKind) {
        message = '科室不能为空！'
      } else if (!this.symptomContent) {
        message = '症状不能为空！'
      }

      if (message !== '') {
        MessageBox({
          title: '警告',
          message,
          type: 'warning'
        })
      } else {
        const data = {
          name: this.symptomName,
          dep: this.depKind,
          content: this.symptomContent,
          date: getDateStr()
        }
        // console.log(data)
        addSymptomMes(data).then(res => {
          if (res.data.status === 1) {
            MessageBox({
              title: '消息',
              message: '添加成功！',
              type: 'success'
            })
            this.showSymptomDialog()
            this.showSymptomMesList()
          } else {
            MessageBox({
              title: '消息',
              message: '待添加的症状名已存在！',
              type: 'warning'
            })
          }
        })
      }
    },
    showSymptomDialog () {
      this.isShowSymptomDialog = !this.isShowSymptomDialog
    },
    deleteItem (row) {
      deleteSymptomMes({ id: row.id }).then(res => {
        if (res.data.status === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: 'success'
          })
          this.showSymptomMesList()
        }
      })
    },
    showSymptomMesList () {
      getSymptomMesList().then(res => {
        this.symptomList = res.data
      })
    }
  },
  mounted () {
    this.showSymptomMesList()
    getDep().then(res => {
      let len = res.data.length
      let data = res.data
      const depKindList = []
      for(let i = 0; i < len; i++) {
        depKindList.push(data[i].name)
      }
      this.depKindList = depKindList
    })
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
    max-height: 480px
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
