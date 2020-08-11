<template>
  <div>
    <page-header></page-header>
    <page-side :sideContent="sideContent" :defaultTopicId="defaultTopicId" @changeTopic="changeTopic"></page-side>
    <div class="main-wrapper">
      <div class="main">
          <div class="dateDoctor" v-if="defaultTopicId === 0">
            <div class="left">
              <h1 style="color:blue;">患者信息</h1>
              <el-tooltip content="姓名" placement="left">
                <div class="tag-style">{{name}}</div>
              </el-tooltip>
              <el-tooltip content="性别" placement="left">
                <div class="tag-style">{{sex}}</div>
              </el-tooltip>
              <el-tooltip content="年龄" placement="left">
                <div class="tag-style">{{old}}</div>
              </el-tooltip>
              <el-tooltip content="身份证号" placement="left">
                <div class="tag-style">{{idCard}}</div>
              </el-tooltip>
              <el-tooltip content="手机号" placement="left">
                <div class="tag-style">{{phoneNum}}</div>
              </el-tooltip>
              <el-tooltip content="住址" placement="left-start">
                <div class="tag-style" style="height: 117px;">{{address}}</div>
              </el-tooltip>
            </div>
            <div class="right">
              <div v-if="isSelected" style="position: absolute;top: 12px;right: 12px;z-index:10;">
                <el-button size="mini" :type="toggleStatus" @click="submitHeal">提交</el-button>
                <el-button size="mini" @click="back">返回</el-button>
              </div>
              <el-table v-if="!isSelected" border max-height="395" :data="dateItem">
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column align="center" :filters="filter_date" :filter-method="filterHandle" label="日期" prop="date"></el-table-column>
                <el-table-column align="center" :filters="filter_time" :filter-method="filterHandle" label="时间段" prop="time"></el-table-column>
                <el-table-column align="center" label="科室" prop="dep"></el-table-column>
                <el-table-column align="center" label="医生" prop="doctor"></el-table-column>
                <el-table-column align="center" label="类型" prop="kind"></el-table-column>
                <el-table-column align="center" label="患者" prop="patient"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="selectPatient(scope.$index)">选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-tabs v-else v-model="menu" type="card">
                <el-tab-pane label="病历" name="1">
                  <section class="tab-pane-item">
                    <h1>主诉<i v-if="description.length !== 0" class="el-icon-success"></i><i v-else class="el-icon-circle-check"></i></h1>
                    <hr>
                    <el-input v-model="description" type="textarea" resize="none" row="5"></el-input>
                  </section>
                  <section class="tab-pane-item">
                    <h1>诊断详情<i v-if="symptom.length !== 0" class="el-icon-success"></i><i v-else class="el-icon-circle-check"></i></h1>
                    <hr>
                    <el-input v-model="symptom" type="textarea" resize="none" row="5"></el-input>
                  </section>
                  <section class="tab-pane-item">
                    <h1>治疗方案<i v-if="solution.length !== 0" class="el-icon-success"></i><i v-else class="el-icon-circle-check"></i></h1>
                    <hr>
                    <el-input v-model="solution" type="textarea" resize="none" row="5"></el-input>
                  </section>
                </el-tab-pane>
                <el-tab-pane label="药单" name="2">
                  <section style="height: 324px;">
                    <el-table :data="selectPillsCopy" max-height="324" border>
                      <el-table-column width="106" align="center" type="index"></el-table-column>
                      <el-table-column width="106" align="center" label="名称" prop="name"></el-table-column>
                      <el-table-column width="106" align="center" label="类别" prop="kind"></el-table-column>
                      <el-table-column width="106" align="center" label="单价" prop="price"></el-table-column>
                      <el-table-column width="106" align="center" label="数量" prop="num"></el-table-column>
                      <el-table-column width="106" align="center" label="总价" prop="amount"></el-table-column>
                      <el-table-column width="106" align="center" label="操作" prop="">
                        <template slot-scope="scope">
                          <el-button type="danger" size="mini" @click="deleteSelect(scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </section>
                  <div class="addButton"><span @click="showAddPillDialog(1)">添加药品</span></div>
                </el-tab-pane>
                <el-tab-pane label="检查项" name="3">
                  <section style="height: 324px;">
                    <el-table :data="selectCheckCopy" max-height="324" border>
                      <el-table-column width="124" align="center" type="index"></el-table-column>
                      <el-table-column width="124" align="center" label="名称" prop="checkName"></el-table-column>
                      <el-table-column width="124" align="center" label="单价" prop="checkPrice"></el-table-column>
                      <el-table-column width="124" align="center" label="数量" prop="checkNum"></el-table-column>
                      <el-table-column width="124" align="center" label="总价" prop="checkAmount"></el-table-column>
                      <el-table-column width="124" align="center" label="操作">
                        <template slot-scope="scope">
                          <el-button type="danger" size="mini" @click="deleteSelect(scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </section>
                  <div class="addButton"><span @click="showAddPillDialog(2)">添加检查项</span></div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="history" v-else>
            <el-table :data="historyList" border max-height="420">
              <el-table-column align="center" label="序号" type="index" width="100"></el-table-column>
              <el-table-column align="center" label="患者" prop="name"></el-table-column>
              <el-table-column align="center" label="性别" prop="sex"></el-table-column>
              <el-table-column align="center" label="年龄" prop="old"></el-table-column>
              <el-table-column align="center" label="类型" prop="kind"></el-table-column>
              <el-table-column align="center" label="费用" prop="fee"></el-table-column>
              <el-table-column align="center" label="日期" prop="date"></el-table-column>
              <el-table-column align="center" label="联系方式" prop="phoneNum"></el-table-column>
              <el-table-column align="center" label="医生" prop="doctor"></el-table-column>
            </el-table>
          </div>
      </div>
    </div>
    <div class="dialog-bg" v-show="isShowPillDialog" @click="showAddPillDialog"></div>
    <div class="dialog" v-show="isShowPillDialog">
      <h1>{{dialogTitle}}</h1>
      <div class="data-wrapper">
        <div class="data">
          <el-table v-if="currentTitle === 1" :data="medicineList" max-height="410">
            <el-table-column align="center" label="序号" type="index"></el-table-column>
            <el-table-column align="center" label="名称" prop="name"></el-table-column>
            <el-table-column align="center" label="类别" prop="kind"></el-table-column>
            <el-table-column align="center" label="数量" prop="num">
              <template slot-scope="scope">
                <el-tooltip content="最大值为10">
                  <input class="input-count" type="text" v-model="scope.row.num" @change="checkFormat(scope.row, 1)">
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单价" prop="price"></el-table-column>
            <el-table-column align="center" label="总价" prop="amount">
              <template slot-scope="scope">{{scope.row.amount}}</template>
            </el-table-column>
          </el-table>
          <el-table v-else :data="checkList" max-height="410">
            <el-table-column align="center" label="序号" type="index"></el-table-column>
            <el-table-column align="center" label="名称" prop="checkName"></el-table-column>
            <el-table-column align="center" label="单价" prop="checkPrice"></el-table-column>
            <el-table-column align="center" label="数量" prop="checkNum">
              <template slot-scope="scope">
                <el-tooltip content="最大值为1">
                  <input class="input-count" type="text" v-model="scope.row.checkNum" @change="checkFormat(scope.row, 2)">
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="总价" prop="checkAmount">
              <template slot-scope="scope">{{scope.row.checkAmount}}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="button-wrapper">
        <el-button type="primary" size="medium" @click="addPill">添加</el-button>
      </div>
    </div>
    <page-tail></page-tail>
  </div>
</template>
<script>
import PageHeader from '../components/common/Header'
import PageSide from '../components/common/PageSide'
import { MessageBox } from 'element-ui'
import PageTail from '../components/common/Footer'
import { getCookie, getDateStr } from '../config/utils'
import {
  getDateList,
  getMedicineList_doc,
  getCheckList_doc,
  submitHealMes_doc,
  getHistoryList_doc,
  getDocId,
  getDateMes
} from '../api/index'

export default {
  data () {
    return {
      defaultTopicId: 0,
      name: null,
      doc_name: null,
      sex: null,
      old: null,
      idCard: null,
      phoneNum: null,
      address: null,
      dateItem: [],
      sideContent: {
        title: '坐诊',
        contentArr: [
          {
            topic: '待接诊'
          },
          {
            topic: '已接诊'
          }
        ]
      },
      currentItemIndex: 0,
      isSelected: false,
      menu: "1",
      description: '',
      symptom: '',
      solution: '',
      pillList: [
        {
          name: '牛蒡',
          kind: '非处方药',
          price: 5,
          num: 0,
          amount: 0,
          isDeleted: false
        },
        {
          name: '牛蒡',
          kind: '非处方药',
          price: 5,
          num: 0,
          amount: 0,
          isDeleted: false
        },
        {
          name: '牛蒡',
          kind: '非处方药',
          price: 5,
          num: 0,
          amount: 0,
          isDeleted: false
        },
        {
          name: '牛蒡',
          kind: '非处方药',
          price: 5,
          num: 0,
          amount: 0,
          isDeleted: false
        },
        {
          name: '牛蒡',
          kind: '非处方药',
          price: 5,
          num: 0,
          amount: 0,
          isDeleted: false
        },
        {
          name: '牛蒡',
          kind: '非处方药',
          price: 5,
          num: 0,
          amount: 0,
          isDeleted: false
        },
        {
          name: '牛蒡',
          kind: '非处方药',
          price: 5,
          num: 0,
          amount: 0,
          isDeleted: false
        }
      ],
      medicineList: [],
      selectPills: [],
      selectPillsCopy: [],
      isShowPillDialog: false,
      initialCheckData: [
        {
          checkName: '钾鉴定',
          checkPrice: 36,
          checkNum: 0,
          checkAmount: 0,
          isDeleted: false
        },
        {
          checkName: '钾鉴定',
          checkPrice: 36,
          checkNum: 0,
          checkAmount: 0,
          isDeleted: false
        },
        {
          checkName: '钾鉴定',
          checkPrice: 36,
          checkNum: 0,
          checkAmount: 0,
          isDeleted: false
        }
      ],
      checkList: [],
      selectCheck: [],
      selectCheckCopy: [],
      currentTitle: 1,
      historyList: [
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        },
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        },
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        },
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        },
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        },
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        },
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        },
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        },
        {
          name: '患者',
          sex: '男',
          old: 40,
          date: '2020-7-9',
          kind: '普通号',
          fee: 256,
          doctor: '孙淼',
          phoneNum: '22512235544'
        }
      ],
      pat_id: null,
      pat_name: null,
      doc_id: null,
      filter_date: [],
      filter_time: [
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
      ]
    }
  },
  components:{
    PageHeader,
    PageSide,
    PageTail
  },
  watch: {
    currentItemIndex (newVal, oldVal) {
      const patient = this.dateItem[newVal].patientMes
      this.name = patient.name
      this.sex = patient.sex
      this.old = patient.old
      this.idCard = patient.idCard
      this.phoneNum = patient.phoneNum
      this.address = patient.address
    }
  },
  computed: {
    dialogTitle () {
      if (this.currentTitle === 1) {
        return '添加药品'
      } else {
        return '添加检查项'
      }
    },
    symbol () {
      return {
        symptom: this.symptom,
        description: this.description,
        solution: this.solution
      }
    },
    toggleStatus () {
      if (this.symptom !== '' && this.description !== '' && this.solution !== '' && this.selectPillsCopy.length && this.selectCheckCopy.length) {
        return 'success'
      } else {
        return 'danger'
      }
    }
   },
  methods: {
    filterHandle (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    back () {
      this.name = ''
      this.sex = ''
      this.old = ''
      this.idCard = ''
      this.phoneNum = ''
      this.address = ''

      this.selectCheckCopy = []
      this.selectCheckCopy = []
      this.symptom = ''
      this.description = ''
      this.solution = ''
      this.isSelected = false

      const name = getCookie('his_user')
      getDateList({ name }).then(res => {
        this.dateItem = res.data
      })
    },
    submitHeal () {
      if (this.toggleStatus !== 'success') {
        MessageBox({
          title: '警告',
          type: 'warning',
          message: '信息未填写完毕！'
        })
      } else {
        const healSolution = {
          symptom: this.symptom,
          description: this.description,
          solution: this.solution,
          medicineList: this.selectPillsCopy,
          checkList: this.selectCheckCopy,
          pat_id: this.pat_id,
          pat_name: this.pat_name,
          date: getDateStr(),
          doc_id: this.doc_id
        }
        // console.log(healSolution)
        submitHealMes_doc(healSolution).then(res => {
          if (res.data.status === 1) {
            MessageBox({
              title: '通知',
              type: 'success',
              message: '提交成功！'
            })
            this.back()
            this.isSelected = false
          }
        })
      }
    },
    showAddPillDialog (flag = 1) {
      this.currentTitle = flag
      if (flag === 1) {
        this.selectPills = []
        this.medicineList = this.pillList.map(item => {
          return { ...item }
        })
      } else {
        this.selectCheck = []
        this.checkList = this.initialCheckData.map(item => {
          return { ...item }
        })
      }
      this.isShowPillDialog = !this.isShowPillDialog
    },
    checkFormat (row, flag) {
      if (flag === 1) {
        const exp = /^[1-9](\d*)$/
        if (!exp.test(row.num) || row.num > 10) {
          row.num = 0
          row.amount = 0
          const tempArr = []
          for(let i = 0; i < this.selectPills.length; i++) {
            if (this.selectPills[i].amount !== 0) {
              tempArr.push({...this.selectPills[i]})
            }
          }
          this.selectPills = tempArr.slice()
        } else {
          row.amount = row.num * row.price
          const rowCopy = JSON.parse(JSON.stringify(row))
          this.selectPills.push(rowCopy)
        }
      } else {
        const exp = /^1$/
        if (!exp.test(row.checkNum)) {
          row.checkNum = 0
          row.checkAmount = 0
          const tempArr = []
          for(let i = 0; i < this.selectCheck.length; i++) {
            if (this.selectCheck[i].checkAmount !== 0) {
              tempArr.push({...this.selectCheck[i]})
            }
          }
          this.selectCheck = tempArr.slice()
        } else {
          row.checkAmount = row.checkNum * row.checkPrice
          const rowCopy = JSON.parse(JSON.stringify(row))
          this.selectCheck.push(rowCopy)
        }
      }
    },
    deleteSelect (row) {
      if (this.currentTitle === 1) {
        row.isDeleted = true
        this.selectPillsCopy = this.selectPillsCopy.filter(item => {
          return item.isDeleted === false
        })
      } else {
        row.isDeleted = true
        this.selectCheckCopy = this.selectCheckCopy.filter(item => {
          return item.isDeleted === false
        })
      }
    },
    addPill () {
      if (this.currentTitle === 1) {
        const currentSelectPillsCopy = this.selectPills.map(item => {
          return {...item}
        })
        this.selectPillsCopy = this.selectPillsCopy.concat(currentSelectPillsCopy)

        this.showAddPillDialog(1)
      } else {
        const currentSelectCheckCopy = this.selectCheck.map(item => {
          return {...item}
        })
        this.selectCheckCopy = this.selectCheckCopy.concat(currentSelectCheckCopy)
        this.showAddPillDialog(2)
      }
    },
    selectPatient (index) {
      const patient = this.dateItem[this.currentItemIndex].patientMes
      this.name = patient.name
      this.pat_name = patient.name
      this.sex = patient.sex
      this.old = patient.old
      this.idCard = patient.idCard
      this.phoneNum = patient.phoneNum
      this.address = patient.address
      this.pat_id = this.dateItem[this.currentItemIndex].id
      // console.log(this.pat_id)

      this.currentItemIndex = index
      this.isSelected = true
    },
    changeTopic (index) {
      this.defaultTopicId = index
    }
  },
  mounted () {
    getDateMes().then(res => {
      const data = res.data
      this.filter_date = data.dateArr
    })
    this.doc_name = getCookie('his_user')
    getDateList({ name: this.doc_name }).then(res => {
      this.dateItem = res.data
    })
    // const dateItem = [
    //   {
    //     date: '2020-07-04',
    //     time: '上午',
    //     doctor: '孙淼',
    //     dep: '牙科',
    //     kind: '普通号',
    //     patient: 'admin',
    //     patientMes: {
    //       name: 'admin',
    //       sex: '男',
    //       old: 30,
    //       idCard: '555555555555555555',
    //       phoneNum: '55555555555',
    //       address: '上海北京西路152号'
    //     }
    //   },
    //   {
    //     date: '2020-07-04',
    //     time: '上午',
    //     doctor: '钱程',
    //     dep: '外科',
    //     kind: '普通号',
    //     patient: '王武',
    //     patientMes: {
    //       name: '王武',
    //       sex: '男',
    //       old: 30,
    //       idCard: '555555555555555555',
    //       phoneNum: '55555555555',
    //       address: '上海北京南路152号'
    //     }
    //   },
    //   {
    //     date: '2020-07-04',
    //     time: '上午',
    //     doctor: '洪爱红',
    //     dep: '皮肤科',
    //     kind: '普通号',
    //     patient: '刘鸥',
    //     patientMes: {
    //       name: '王武',
    //       sex: '男',
    //       old: 30,
    //       idCard: '555555555555555555',
    //       phoneNum: '55555555555',
    //       address: '上海北京东路152号'
    //     }
    //   }
    // ]
    // this.dateItem = dateItem.slice()

    getCheckList_doc().then(res => {
      this.initialCheckData = res.data
    })

    this.checkList = this.initialCheckData.map(item => {
      return { ...item }
    })

    getMedicineList_doc().then(res => {
      this.pillList = res.data.map(item => {
        return { ...item }
      })
    })

    // this.medicineList = this.pillList.map(item => {
    //   return { ...item }
    // })

    getHistoryList_doc({ name: this.doc_name }).then(res => {
      this.historyList = res.data
    })

    getDocId({ name: this.doc_name }).then(res => {
      this.doc_id = res.data.doc_id
      // console.log(this.doc_id)
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
      .dateDoctor
        display: flex
        min-height: 420px
        .left
          flex: 2
          background-color: #EEE
          h1
            padding: 10px 10px 0 10px
            color: blue
          .tag-style
            background-color: #FFF
            border-radius: 4px
            border: 1px solid #DCDFE6
            box-sizing: border-box
            color: #ccc
            display: inline-block
            font-size: inherit
            height: 40px
            line-height: 40px
            padding: 0 15px
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 273px
            margin: 10px 10px 0 10px
          .input-adjast
            width: 92%
            margin: 10px 10px 0 10px
            border: none
        .right
          position: relative
          flex: 5
          padding: 10px
          text-align: center
          .tab-pane-item 
            box-sizing: border-box
            padding: 0 20px
            margin-top: 20px
            h1
              text-align: left
              color: #5491EE
            >>> textarea
              background: #F8F8F8
          .addButton
            padding-top:5px
            text-align:right
            cursor:pointer
            color:#5491EE
      .history
        padding: 10px 10px
  .dialog-bg
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    background: rgba(0, 0, 0, .5)
  .dialog
    position: fixed
    top: 70px
    left: 0
    right: 0
    z-index: 11
    display: block
    margin: auto
    width: 700px
    height: 500px
    background: #ffffff
    h1
      padding: 10px 0
      background: #F3F3F3
      text-align: center
    .data-wrapper
      height: 410px
      .data
        box-sizing: border-box
        padding: 0 10px
        .input-count
          width: 50px
          height: 30px
          outline: none
          border: 1px solid #ccc
          background: #F9F9F9
          text-align: center
    .button-wrapper
      margin-top: 8px 
      text-align: center
      >>> button
        width: 650px
</style>
