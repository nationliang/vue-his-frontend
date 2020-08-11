<template>
  <div>
    <page-header></page-header>
    <page-side :defaultTopicId="defaultTopicId" :sideContent="sideContent"></page-side>
    <section class="main-wrapper">
      <div class="main">
        <el-table :data="patientList" max-height="420">
          <el-table-column align="center" label="序号" type="index"></el-table-column>
          <el-table-column align="center" label="姓名" prop="name"></el-table-column>
          <el-table-column align="center" label="科室" prop="dep"></el-table-column>
          <el-table-column align="center" label="医生" prop="doctor"></el-table-column>
          <el-table-column align="center" label="日期" prop="date"></el-table-column>
          <el-table-column align="center" label="类型" prop="kind"></el-table-column>
          <el-table-column align="center" label="费用" prop="fee"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="pay(scope.row)">收款</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <page-tail></page-tail>
  </div>
</template>
<script>
import PageHeader from '../components/common/Header'
import PageSide from '../components/common/PageSide'
import PageTail from '../components/common/Footer'
import { MessageBox } from 'element-ui'
import {
  finishPayment,
  getPatientList_mon
} from '../api/index'
import { getCookie } from '../config/utils'

export default {
  data () {
    return {
      defaultTopicId: 0,
      sideContent: {
        title: '财务管理',
        contentArr: [
          {
            topic: '收款'
          }
        ]
      },
      patientList: [
        {
          name:'admin',
          dep: '牙科',
          doctor: '孙淼',
          kind: '普通号',
          date: '2020-07-10',
          fee: 451
        }
      ]
    }
  },
  components:{
    PageHeader,
    PageSide,
    PageTail
  },
  methods: {
    pay (row) {
      const name = getCookie('his_user')
      finishPayment({
        id: row.id,
        counter: name
      }).then(res => {
        if (res.data.status === 1) {
          MessageBox({
            title: '消息',
            message: '操作成功！',
            type: 'success'
          })
          getPatientList_mon().then(res => {
            this.patientList = res.data
          })
        }
      })
    }
  },
  mounted () {
    getPatientList_mon().then(res => {
      this.patientList = res.data
    })
  }
}
</script>
<style lang="stylus" scoped>
  .main-wrapper
    display: inline-block
    width: 1060px
    min-height: 420px
    margin: 30px 0
    background-color: #ffffff
    box-shadow: 0px 0px 5px #B2B2B2
    vertical-align: top
    .main
      min-height: 420px
      padding: 10px
</style>