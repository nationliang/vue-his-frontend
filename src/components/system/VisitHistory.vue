<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="statisticsSets" max-height="420">
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="访问者名称" prop="visitor"></el-table-column>
        <el-table-column align="center" label="IP地址" prop="ip"></el-table-column>
        <el-table-column align="center" label="地区" prop="address"></el-table-column>
        <el-table-column align="center" label="访问日期" prop="date" :filters="filter_date" :filter-method="handleFilter"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-wrapper">
      <el-button type='text' size="mini" @click="showDialog">添加测试数据</el-button>
    </div>
    <div class="dialog-wrapper" v-if="isShowDialog" @click="showDialog"></div>
    <div class="dialog-content" v-if="isShowDialog">
      <h1>添加测试数据</h1>
      <div class="item-wrapper">
        <span>访问者：</span><input type="text" v-model="visitor">
      </div>
      <div class="item-wrapper">
        <span>IP：</span><input type="text" v-model="IPvalue">
      </div>
      <div class="item-wrapper">
        <span>地区：</span><input type="text" v-model="address">
      </div>
      <div class="dialog-button-wrapper">
        <el-button type="primary" size="medium" @click="addMes">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getVisitHistory, addVisitHistory, deleteVisitHistory } from '../../api/index'
import { getDateStr } from '../../config/utils'
import { MessageBox } from 'element-ui'

export default {
  data () {
    return {
      statisticsSets: [
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-04-05'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-04-06'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-04-07'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-02-04'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-02-04'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-02-04'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-02-04'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-02-04'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-02-04'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-02-04'
        },
        {
          visitor: '李四',
          ip: '196.168.1.1',
          address: '兰州',
          date: '2020-02-04'
        }
      ],
      filter_date: [
        {
          text: '2020-04-05',
          value: '2020-04-05'
        },
        {
          text: '2020-04-06',
          value: '2020-04-06'
        },
        {
          text: '2020-04-07',
          value: '2020-04-07'
        },
        {
          text: '2020-02-04',
          value: '2020-02-04'
        }
      ],
      IPvalue: '',
      visitor: '',
      address: '',
      isShowDialog: false
    }
  },
  methods: {
    showList () {
      getVisitHistory().then(res => {
        const data = res.data
        this.statisticsSets = data.statisticsSets
        this.filter_date = data.filter_date
      })
    },
    handleFilter (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    addMes () {
      const Mes = {
        visitor: this.visitor,
        ip: this.IPvalue,
        address: this.address,
        date: getDateStr()
      }
      // console.log(checkMes)
      addVisitHistory(Mes).then(res => {
        if (res.data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '添加成功！',
            type: 'success'
          })
          this.showList()
          this.showDialog()
        }
      })
    },
    showDialog () {
      this.isShowDialog = !this.isShowDialog
    },
    deleteData (row) {
      deleteVisitHistory({ id: row.id }).then(res => {
        if (res.data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: 'success'
          })
          this.showList()
        }
      })
    }
  },
  mounted () {
    this.showList()
  }
}
</script>
<style lang="stylus" scoped>
  .table-wrapper
    height: 420px
    padding-bottom: 10px
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
    max-height: 275px
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
      span
        display: inline-block
        width: 64px
        text-align: right
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
