<template>
  <div>
    <div class="table-wrapper">
      <el-table :data="records" max-height="420">
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="患者" prop="patient"></el-table-column>
        <el-table-column align="center" label="医生" prop="doctor"></el-table-column>
        <el-table-column align="center" label="科室" prop="dep"></el-table-column>
        <el-table-column align="center" label="类型" prop="kind"></el-table-column>
        <el-table-column align="center" label="日期" prop="date"></el-table-column>
        <el-table-column align="center" label="费用" prop="fee"></el-table-column>
        <el-table-column align="center" label="收银员" prop="counter"></el-table-column>
        <el-table-column align="center" label="派药员" prop="piller"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      records: [
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        },
        {
          patient: '李四',
          doctor: '李凯瑞',
          dep: '牙科',
          kind: '普通门诊',
          fee: 253,
          date: '2020-02-01',
          counter: '王杰华',
          piller: '刘烨'
        }
      ]
    }
  },
  methods: {
    delete(row) {}
  }
}
</script>
<style lang="stylus" scoped>
  .table-wrapper
    padding-bottom: 10px
</style>
