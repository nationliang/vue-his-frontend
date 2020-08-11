<template>
  <div>
    <page-header></page-header>
    <div>
      <page-side :sideContent="reserveArr" :defaultTopicId="defaultTopicId" @changeTopic="changeTopic"></page-side>
      <div class="content-wrapper">
        <div class="content">
          <div class="dateDoctor" v-if="defaultTopicId === 0">
            <div class="left">
              <h1 style="color:blue;">患者信息</h1>
              <el-input @change="checkName" maxlength="10" show-word-limit v-model="name" placeholder="姓名" class="input-adjast"></el-input>
              <el-select @change="checkSex" v-model="sex" class="input-adjast" placeholder="性别">
                <el-option value="1" label="男"></el-option>
                <el-option value="2" label="女"></el-option>
              </el-select>
              <el-select @change="checkOld" v-model="old" placeholder="年龄" class="input-adjast">
                <el-option v-for="num in 100" :value="num" :key="'s'+num" :label="num + '岁'"></el-option>
              </el-select>
              <el-input @change="checkIdCard" v-model="idCard" placeholder="身份证号" class="input-adjast" maxlength="18" show-word-limit></el-input>
              <el-input @change="checkPhoneNum" v-model="phoneNumber" placeholder="手机号" class="input-adjast" maxlength="11" show-word-limit></el-input>
              <el-input @change="checkAddress" type="textarea" resize="none" maxlength="175" show-word-limit v-model="address" placeholder="住址" class="input-adjast" rows="5"></el-input>
            </div>
            <div class="right">
              <el-table height="395" :data="dateItem" highlight-current-row @current-change="currentRowChange">
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column :filters="dateArr" :filter-method="filterHandle" align="center" width="200" label="日期" prop="date"></el-table-column>
                <el-table-column :filters="timeArr" :filter-method="filterHandle" align="center" label="时间段" prop="time"></el-table-column>
                <el-table-column :filters="depArr" :filter-method="filterHandle" align="center" label="科室" prop="department"></el-table-column>
                <el-table-column :filters="doctorArr" :filter-method="filterHandle" align="center" label="医生" prop="doctor"></el-table-column>
                <el-table-column :filters="kindArr" :filter-method="filterHandle" align="center" label="类型" prop="kind"></el-table-column>
                <el-table-column align="center" label="挂号费" prop="fee"></el-table-column>
              </el-table>
              <button v-show="isShowSubmit" @click="submitMes">提交挂号信息</button>
            </div>
          </div>
          <div class="record" v-if="defaultTopicId === 1">
            <el-tabs v-model="menuName" @tab-click="tabClick">
              <el-tab-pane label="已预约" name="1">
                <el-table max-height="355" :data="datingRecords" border>
                  <el-table-column align="center" type="index"></el-table-column>
                  <el-table-column align="center" label="患者" prop="name"></el-table-column>
                  <el-table-column :filters="datingDocArr" :filter-method="filterHandle" align="center" label="医生" prop="doctor"></el-table-column>
                  <el-table-column :filters="datingDepArr" :filter-method="filterHandle" align="center" label="科室" prop="dep"></el-table-column>
                  <el-table-column :filters="kindArr" :filter-method="filterHandle" align="center" label="类型" prop="kind"></el-table-column>
                  <el-table-column sortable align="center" label="费用" prop="fee"></el-table-column>
                  <el-table-column :filters="datingArr" :filter-method="filterHandle" width="100px" align="center" label="日期" prop="date"></el-table-column>
                  <el-table-column :filters="timeArr" :filter-method="filterHandle" align="center" label="时间段" prop="time"></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button type="danger" size="mini" @click="cancelDate(scope.row)">取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="待付款" name="2">
                <el-table max-height="355" :data="payingRecords" border>
                  <el-table-column align="center" type="index"></el-table-column>
                  <el-table-column align="center" label="患者" prop="name"></el-table-column>
                  <el-table-column :filters="payingDocArr" :filter-method="filterHandle" align="center" label="医生" prop="doctor"></el-table-column>
                  <el-table-column :filters="payingDepArr" :filter-method="filterHandle" align="center" label="科室" prop="dep"></el-table-column>
                  <el-table-column :filters="kindArr" :filter-method="filterHandle" align="center" label="类型" prop="kind"></el-table-column>
                  <el-table-column sortable align="center" label="费用" prop="fee"></el-table-column>
                  <el-table-column :filters="payingDate" :filter-method="filterHandle" width="100px" align="center" label="日期" prop="date"></el-table-column>
                  <el-table-column :filters="timeArr" :filter-method="filterHandle" align="center" label="时间段" prop="time"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="已完成" name="3">
                <el-table max-height="355" :data="historyRecords" border>
                  <el-table-column align="center" type="index"></el-table-column>
                  <el-table-column align="center" label="患者" prop="name"></el-table-column>
                  <el-table-column :filters="historyDocArr" :filter-method="filterHandle" align="center" label="医生" prop="doctor"></el-table-column>
                  <el-table-column :filters="historyDepArr" :filter-method="filterHandle" align="center" label="科室" prop="dep"></el-table-column>
                  <el-table-column :filters="kindArr" :filter-method="filterHandle" align="center" label="类型" prop="kind"></el-table-column>
                  <el-table-column :filters="historyCounter" :filter-method="filterHandle" align="center" label="收费员" prop="counter"></el-table-column>
                  <el-table-column :filters="historyPill" :filter-method="filterHandle" align="center" label="派药员" prop="pill"></el-table-column>
                  <el-table-column sortable align="center" label="费用" prop="fee"></el-table-column>
                  <el-table-column :filters="historyDate" :filter-method="filterHandle" width="100px" align="center" label="日期" prop="date"></el-table-column>
                  <el-table-column :filters="timeArr" :filter-method="filterHandle" align="center" label="时间段" prop="time"></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button type="danger" size="mini" @click="deleteRecord(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <page-tail></page-tail>
  </div>
</template>
<script>
import PageHeader from '../components/common/Header'
import PageSide from '../components/common/PageSide'
import { MessageBox } from 'element-ui'
import { getCookie } from '../config/utils'
import { mapMutations } from 'vuex'
import {
    sendDateMes,
    getDateMes,
    getDateRecords,
    getDatingRecords,
    getPayingRecords,
    getHistoryRecords,
    cancelDate,
    deleteRecord
  } from '../api/index'
import PageTail from '../components/common/Footer'

export default {
  data () {
    return {
      defaultTopicId: 0,
      name: null,
      sex: null,
      old: null,
      idCard: null,
      phoneNumber: null,
      address: null,
      isShowSubmit: false,
      flagCollection: {
        name: false,
        sex: false,
        old: false,
        idCard: false,
        phoneNumber: false,
        address: false,
        date: false
      },
      dateMessage: null,
      reserveArr: {
        title: '病友服务',
        contentArr: [{topic: '预约医生'}, {topic: '预约状态'}]
      },
      dateItem: [],
      dateArr:[],
      timeArr: [
        {
          text: '上午',
          value: '上午'
        },
        {
          text: '下午',
          value: '下午'
        },
        {
          text: '晚上',
          value: '晚上'
        }
      ],
      depArr: [],
      doctorArr: [],
      kindArr: [
        {
          text: '普通门诊',
          value: '普通门诊'
        }
      ],
      menuName: "1",
      dateRecords: [],
      pillArr: [],
      counterArr: [],
      datingRecords: [],
      datingDocArr: [],
      datingDepArr: [],
      datingArr: [],
      payingRecords: [],
      payingDocArr: [],
      payingDepArr: [],
      payingDate: [],
      historyRecords: [],
      historyDocArr: [],
      historyDate: [],
      historyDepArr: [],
      historyPill: [],
      historyCounter: []
    }
  },
  components:{
    PageHeader,
    PageSide,
    PageTail
  },
  watch: {
    flagCollection: {
      handler: function (newVal, oldVal) {
        const flag = newVal.name && newVal.sex && newVal.old && newVal.idCard && newVal.phoneNumber && newVal.address && newVal.date
        if (flag) {
          this.isShowSubmit = true
        } else {
          this.isShowSubmit = false
        }
      },
      deep: true
    }
  },
  methods: {
    cancelDate (row) {
      // console.log(row)
      cancelDate({ id: row.id }).then(res => {
        if (res.data.status === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: "success"
          })
          this.initialDatingData()
        }
      })
    },
    deleteRecord (row) {
      deleteRecord({ id: row.id }).then(res => {
        if (res.data.status === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: "success"
          })
          this.initialHistoryData()
        }
      })
    },
    tabClick (tab, event) {
      // console.log(tab, event)
    },
    submitMes () {
      sendDateMes({
        name: this.name,
        sex: this.sex,
        old: this.old,
        idCard: this.idCard,
        phoneNumber: this.phoneNumber,
        address: this.address,
        dateMessage: this.dateMessage
      }).then(res => {
        const data = res.data
        if (data.status === 1) {
          MessageBox({
            title: "消息提醒",
            message: '预约成功！',
            type: 'success',
            callback (action, instance) {
              location.reload()
            }
          })
        }
      })
    },
    checkName (value) {
      if (value === '') {
        this.flagCollection.name = false
        MessageBox({
          title: '警告',
          message: '姓名不能为空',
          type: 'warning'
        })
      } else {
        this.flagCollection.name = true
      }
    },
    checkSex (value) {
      this.flagCollection.sex = true
    },
    checkOld (value) {
      this.flagCollection.old = true
    },
    checkIdCard (value) {
      const exp = /^\d{18}$/
      if (!exp.test(value)) {
        this.idCard = ''
        this.flagCollection.idCard = false
        MessageBox({
          title: '警告',
          message: '身份证号不符合格式！',
          type: 'warning'
        })
      } else {
        this.flagCollection.idCard = true
      }
    },
    checkPhoneNum (value) {
      const exp = /^\d{11}$/
      if (!exp.test(value)) {
        this.flagCollection.phoneNumber = false
        this.phoneNumber = null
        MessageBox({
          title: '警告',
          message: '手机号不符合格式',
          type: 'warning'
        })
      } else {
        this.flagCollection.phoneNumber = true
      }
    },
    checkAddress (value) {
      if (value === '') {
        this.flagCollection.address = false
        MessageBox({
          title: '警告',
          message: '住址不能为空',
          type: 'warning'
        })
      } else {
        this.flagCollection.address = true
      }
    },
    changePageNum (num) {
      this.currentPage = num
    },
    filterHandle (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    currentRowChange (newRow, oldRow) {
      this.flagCollection.date = true
      this.dateMessage = {
        date: newRow.date,
        time: newRow.time,
        department: newRow.department,
        doctor: newRow.doctor,
        fee: newRow.fee,
        kind: '普通号'
      }
    },
    changeTopic (id) {
      this.defaultTopicId = id
    },
    initialDatingData () {
      const name = getCookie('his_user')
      getDatingRecords({ name }).then(res => {
        const data = res.data
        this.datingRecords = data.dateRecords
        this.datingDocArr = data.docArr
        this.datingDepArr = data.depArr
        this.datingArr = data.dateArr
      })
    },
    initialHistoryData () {
      const name = getCookie('his_user')
      getHistoryRecords({ name }).then(res => {
        const data = res.data
        this.historyRecords = data.dateRecords
        this.historyDocArr = data.docArr
        this.historyDepArr = data.depArr
        this.historyDate = data.dateArr
        this.historyPill = data.pillArr
        this.historyCounter = data.counterArr
      })
    }
  },
  mounted () {
    const name = getCookie('his_user')
    if (name !== null) {
      this.name = name
      this.flagCollection.name = true
    }
    getDateMes().then(res => {
      const data = res.data
      this.dateItem = data.dateItem
      this.dateArr = data.dateArr
      this.timeArr = data.timeArr
      this.depArr = data.depArr
      this.doctorArr = data.doctorArr
    })
  
    getPayingRecords({ name }).then(res => {
      const data = res.data
      this.payingRecords = data.dateRecords
      this.payingDocArr = data.docArr
      this.payingDepArr = data.depArr
      this.payingDate = data.dateArr
    })
    this.initialHistoryData()
    this.initialDatingData()
  }
}
</script>
<style lang="stylus" scoped>
  .content-wrapper
    display: inline-block
    width: 1060px
    min-height: 420px
    margin: 30px 0
    background-color: #ffffff
    box-shadow: 0px 0px 5px #B2B2B2
    vertical-align: top 
    .content
      .dateDoctor
        display: flex
        min-height: 420px
        .left
          flex: 2
          background-color: #EEE
          h1
            padding: 10px 10px 0 10px
            color: blue
          .input-adjast
            width: 92%
            margin: 10px 10px 0 10px
            border: none
        .right
          flex: 5
          padding: 10px
          text-align: center
          button
            margin: 10px 0 5px 0
            background-color: #20B4F2
            border-radius: 5px
            height: 40px
            width: 97%
            border: 0px
            outline: none
            box-shadow: 0px 3px 1px #B7B6B5
            color: #FFF
            &:hover
              background-color: #06f
              color: #ccc
      .record
        padding: 10px
</style>