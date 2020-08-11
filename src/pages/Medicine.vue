<template>
  <div>
    <page-header></page-header>
    <page-side :defaultTopicId="defaultTopicId" :sideContent="sideContent" @changeTopic="changeTopic"></page-side>
    <section class="main-wrapper">
      <div class="main">
        <section class="handlePill" v-if="defaultTopicId === 0">
          <div class="left">
            <el-table border :data="pillList" max-height="420" :header-cell-style="{ 'background-color': '#eee', 'border-bottom': '1px solid #ccc' }" :cell-style="{ 'background-color': '#eee', 'border-bottom': '1px solid #ccc' }">
              <el-table-column align="center" label="名称" prop="name"></el-table-column>
              <el-table-column align="center" label="数量" prop="num"></el-table-column>
            </el-table>
          </div>
          <div class="right">
            <el-table :data="patientList" max-height="420">
              <el-table-column align="center" width="50">
                <template slot-scope="scope">
                  <input type='radio' @change="updateStatus(scope.row)" name="status" :value="scope.$index">
                </template>
              </el-table-column>
              <el-table-column align="center" type="index" label="序号"></el-table-column>
              <el-table-column align="center" prop="name" label="病人"></el-table-column>
              <el-table-column align="center" prop="date" label="日期"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" @click="givePill(scope.row)">派药</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </section>
        <div class="managePill" v-else>
          <div class="table-wrapper">
            <el-table :data="medicineList" max-height="420">
              <el-table-column align="center" type="index" width="100" label="序号"></el-table-column>
              <el-table-column align="center" prop="name" label="名称"></el-table-column>
              <el-table-column align="center" prop="kind" label="类别"></el-table-column>
              <el-table-column align="center" prop="price" label="单价"></el-table-column>
              <el-table-column align="center" prop="rest" label="库存"></el-table-column>
              <el-table-column align="center" prop="date" label="入库时间"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="deleteMItem(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="addButton-wrapper">
            <el-button type="text" size="mini" @click="showMDialog">添加药品</el-button>
          </div>
        </div>
      </div>
    </section>
    <page-tail></page-tail>
    <div class="mDialog-wrapper" v-if="isShowMDialog" @click="showMDialog"></div>
    <div class="mDialog" v-if="isShowMDialog">
      <h1>添加药品</h1>
      <table class="dialog-main">
        <tr>
          <td>药品名称：<input v-model="pillName" type="text" class="dialog-input"></td>
        </tr>
        <tr>
          <!-- <td>药品种类：<input v-model="pillKind" type="text" class="dialog-input"></td> -->
          <td>药品种类：
            <select class="dialog-input" v-model="pillKind">
              <option value="1">处方药</option>
              <option value="2">非处方药</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>药品数量：<input v-model="amount" type="text" class="dialog-input"></td>
        </tr>
        <tr>
          <td>药品进价：<input v-model="pillCost" type="text" class="dialog-input"></td>
        </tr>
        <tr>
          <td>药品售价：<input v-model="pillPrice" type="text" class="dialog-input"></td>
        </tr>
        <tr>
          <td style="text-align: left;"><span style="display: inline-block;padding: 0 0 2px 7px;">药品简介：</span><br><textarea v-model="pillDes" class="dialog-textarea"></textarea></td>
        </tr>
      </table>
      <div class="button-wrapper">
        <el-button type="primary" @click="addNewPill">添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from '../components/common/Header'
import PageSide from '../components/common/PageSide'
import PageTail from '../components/common/Footer'
import { MessageBox } from 'element-ui'
import {
  getMedicineList,
  deleteMedicine,
  addMedicine,
  getPillList_med,
  finishDistribution,
  pillsDetail
} from '../api/index'
import { getDateStr } from '../config/utils'

export default {
  data () {
    return {
      pillName: '',
      amount: '',
      pillKind: 2,
      pillCost: '',
      pillPrice: '',
      pillDes: '',
      defaultTopicId: 0,
      sideContent: {
        title: '药物管理',
        contentArr: [
          {
            topic: '派药'
          },
          {
            topic: '管理'
          }
        ]
      },
      pillList: [],
      patientList: [
        {
          name: 'admin',
          date: '2020-07-10'
        },
        {
          name: 'admin',
          date: '2020-07-10'
        },
        {
          name: 'admin',
          date: '2020-07-10'
        },
        {
          name: 'admin',
          date: '2020-07-10'
        },
        {
          name: 'admin',
          date: '2020-07-10'
        },
        {
          name: 'admin',
          date: '2020-07-10'
        },
        {
          name: 'admin',
          date: '2020-07-10'
        },
        {
          name: 'admin',
          date: '2020-07-10'
        }
      ],
      medicineList: [],
      isShowMDialog: false
    }
  },
  components:{
    PageHeader,
    PageSide,
    PageTail
  },
  methods: {
    addNewPill () {
      let message = ''
      if (this.pillName === '') {
        message = '药品名不能为空'
      } else if (this.amount === '') {
        message = '药品数量不能为空'
      } else if (this.pillCost === '') {
        message = '进价不能为空'
      } else if (this.pillPrice === '') {
        message = '售价不能为空'
      } else if (this.pillDes === '') {
        message = '描述不能为空'
      } else {}
      if (message !== '') {
        MessageBox({
          title: '警告',
          message,
          type: "warning"
        })
      } else {
        const pillMes = {
          name: this.pillName,
          kind: this.pillKind,
          amount: this.amount,
          des: this.pillDes,
          price: this.pillPrice,
          cost: this.pillCost,
          date: getDateStr()
        }
        // console.log(pillMes)
        addMedicine(pillMes).then(res => {
          if (res.data.scode === 1) {
            MessageBox({
              title: '消息',
              message: '添加成功！',
              type: 'success'
            })
            this.showMDialog()
            this.showMedicineList()
          } else {
            MessageBox({
              title: '消息',
              message: '待添加的药品名已存在！',
              type: 'warning'
            })
          }
        })
      }
    },
    showMDialog (event) {
      this.isShowMDialog = !this.isShowMDialog
    },
    deleteMItem (row) {
      deleteMedicine({ id: row.id }).then(res => {
        if (res.data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: 'success'
          })
          this.showMedicineList()
        }
      })
    },
    updateStatus (row) {
      // this.pillList = [
      //   {
      //     name: '黄连',
      //     num: 5
      //   },
      //   {
      //     name: '黄连',
      //     num: 5
      //   }
      // ],
      pillsDetail({ id: row.id }).then(res => {
        this.pillList = res.data
      })
    },
    givePill (row) {
      finishDistribution({ id: row.id }).then(res => {
        if (res.data.status === 1) {
          MessageBox({
            title: '消息',
            message: '操作成功！',
            type: 'success'
          })
          getPillList_med().then(res => {
            this.patientList = res.data
          })
        }
      })
    },
    changeTopic (id) {
      this.defaultTopicId = id
    },
    showMedicineList () {
      getMedicineList().then(res => {
        this.medicineList = res.data
      })
    }
  },
  mounted () {
    this.showMedicineList()
    getPillList_med().then(res => {
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
      .handlePill
        display: flex
        min-height: 420px
        .left
          flex: 2
          padding: 10px
          background-color: #eeeeee
          >>> .el-table__empty-block
            background-color: #eeeeee
        .right
          flex: 5
          padding: 10px
      .managePill
        padding: 10px
        .table-wrapper
          min-height: 420px
        .addButton-wrapper
          text-align: right
          button
            padding: 7px 0 0 0
  .mDialog-wrapper
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    background-color: rgba(0, 0, 0, .5)
  .mDialog
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 11
    margin: auto
    width: 500px
    height: 480px
    background-color: #ffffff
    h1
      background-color: #F3F3F3
      height: 39px
      text-align: center
      line-height: 40px
    .dialog-main
      width: 100%
      margin: 10px 0
      .dialog-input
        width: 80%
        background-color: #F9F9F9
        border: 1px solid #CCC
        height: 30px
      .dialog-textarea
        background-color: #F9F9F9
        border: 1px solid #CCC
        width: 97%
        height: 100px
        margin-left: 7px
        resize: none
      tr
        td
          height: 50px
          text-align: center
          padding: 0px 10px
    .button-wrapper
      text-align: center
      >>> button
        width: 450px
        padding-top: 10px
        padding-bottom: 10px
</style>