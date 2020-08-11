<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="records" max-height="420">
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="患者" prop="name"></el-table-column>
        <el-table-column align="center" label="医生" prop="doctor"></el-table-column>
        <el-table-column align="center" label="科室" prop="dep"></el-table-column>
        <el-table-column align="center" label="类型" prop="kind"></el-table-column>
        <el-table-column align="center" label="日期" prop="date"></el-table-column>
        <el-table-column align="center" label="费用" prop="fee"></el-table-column>
        <el-table-column align="center" label="收银员" prop="counter"></el-table-column>
        <el-table-column align="center" label="派药员" prop="pill"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteSystemHistory(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getHistoryList, deleteHistory } from '../../api/index'
import { MessageBox } from 'element-ui'

export default {
  data () {
    return {
      records: []
    }
  },
  methods: {
    showHistoryList () {
      getHistoryList().then(res => {
        this.records = res.data
      })
    },
    deleteSystemHistory(row) {
      deleteHistory({ id: row.id }).then(res => {
        if (res.data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '删除成功！',
            type: 'success'
          })
          this.showHistoryList()
        }
      })
    }
  },
  mounted () {
    this.showHistoryList()
  }
}
</script>
<style lang="stylus" scoped>
  .table-wrapper
    padding-bottom: 10px
</style>
