<template>
  <div>
    <div class="title">
      <h1>医生排班&#32;{{showDate()}}</h1>
    </div>
    <div class="table-wrapper">
      <el-table :data="arrangeSets" border :span-method="rerank">
        <el-table-column align="center" label="科室" prop="dep">
          <template slot-scope="scope">
            <!-- <el-select v-model="selectedDep" :disabled="active">
              <el-option value="1" label="牙科"></el-option>
              <el-option value="2" label="男科"></el-option>
              <el-option value="3" label="妇科"></el-option>
            </el-select> -->
            <el-select v-model="selectedDep" :disabled="active">
              <el-option v-for="(item, index) in depList" :key="scope.$index + index" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间段" prop="time"></el-table-column>
        <el-table-column align="center" label="周一" prop="mon">
          <template slot-scope="scope">
            <el-select v-model="scope.row.mon" :disabled="disStatus[0][scope.$index]">
              <el-option v-for="(item, index) in depDocList" :key="index" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周二" prop="tue">
          <template slot-scope="scope">
            <el-select v-model="scope.row.tue" :disabled="disStatus[1][scope.$index]">
              <el-option v-for="(item, index) in depDocList" :key="index" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周三" prop="wedn">
          <template slot-scope="scope">
            <el-select v-model="scope.row.wedn" :disabled="disStatus[2][scope.$index]">
              <el-option v-for="(item, index) in depDocList" :key="index" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周四" prop="thur">
          <template slot-scope="scope">
            <el-select v-model="scope.row.thur" :disabled="disStatus[3][scope.$index]">
              <el-option v-for="(item, index) in depDocList" :key="index" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周五" prop="fri">
          <template slot-scope="scope">
            <el-select v-model="scope.row.fri" :disabled="disStatus[4][scope.$index]">
              <el-option v-for="(item, index) in depDocList" :key="index" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周六" prop="sat">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sat" :disabled="disStatus[5][scope.$index]">
              <el-option v-for="(item, index) in depDocList" :key="index" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周日" prop="sun">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sun" :disabled="disStatus[6][scope.$index]">
              <el-option v-for="(item, index) in depDocList" :key="index" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="state === 0" type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button v-else type="success" size="mini" @click="save(scope.row)">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getDep, getDepDocList, addPlan, getPlan } from '../../api/index'
import { MessageBox } from 'element-ui'
import { getDateStr, getMondayDate } from '../../config/utils'

export default {
  data () {
    return {
      disStatus: [
        [true, true, true],
        [true, true, true],
        [true, true, true],
        [true, true, true],
        [true, true, true],
        [true, true, true],
        [true, true, true]
      ],
      arrangeSets: [
        {
          dep: '',
          time: '上午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: '',
          date: ''
        },
        {
          dep: '',
          time: '下午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: '',
          date: ''
        },
        {
          dep: '',
          time: '',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: '',
          date: ''
        }
      ],
      arrangeSetsCopy: [
        {
          dep: '',
          time: '上午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: '',
          date: ''
        },
        {
          dep: '',
          time: '下午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: '',
          date: ''
        },
        {
          dep: '',
          time: '晚上',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: '',
          date: ''
        }
      ],
      selectedDep: '',
      state: 0,
      active: true,
      depList: [],
      depDocList: []
    }
  },
  watch: {
    selectedDep (newVal, oldVal) {
      const l = this.disStatus.length
      let disStatus = this.disStatus
      const date = new Date()
      const time = date.getHours()
      const day = date.getDay()
      if (newVal !== '') {
        // this.arrangeSets = this.arrangeSetsCopy.map(item => {
        //   return { ...item }
        // })
        getPlan({ dep: newVal, reference: getMondayDate()[0] }).then(res => {
          this.arrangeSets = res.data
          this.arrangeSets = this.arrangeSets.map(item => {
            item.dep = newVal
            item.date = getDateStr()
            item.reference = getMondayDate()[0]
            return item
          })
          this.showDepDocList()
          for(let i = 0; i < l; i++) {
            if (day <= i + 1 && day !== 0) {
              disStatus[i] = disStatus[i].map(item => {
                return false
              })
            } else if (day === 0) {
              disStatus[6] = [false, false, false]
            }
          }
          this.disStatus = disStatus
        })
      }
    }
  },
  methods: {
    showDate () {
      const date = new Date()
      const currentday = date.getDay()
      const currentDate = date.getDate()
      // console.log(currentday)
      let dend = ''
      let dstart = ''
      let mstart = ''
      let mend = ''
      let ystart = ''
      let yend = ''
      switch(currentday) {
        case 0: {
          date.setDate(date.getDate() - 6)
          dstart = date.getDate()
          mstart = date.getMonth()
          ystart = date.getFullYear()
          date.setDate(date.getDate() + 6)
          dend = date.getDate()
          mend = date.getMonth()
          yend = date.getFullYear()
          break
        }
        case 1: {
          dstart = date.getDate()
          mstart = date.getMonth()
          ystart = date.getFullYear()
          date.setDate(date.getDate() + 6)
          dend = date.getDate()
          mend = date.getMonth()
          yend = date.getFullYear()
          break
        }
        case 2: {
          date.setDate(date.getDate() - 1)
          dstart = date.getDate()
          mstart = date.getMonth()
          ystart = date.getFullYear()
          date.setDate(date.getDate() + 6)
          dend = date.getDate()
          mend = date.getMonth()
          yend = date.getFullYear()
          break
        }
        case 3: {
          date.setDate(date.getDate() - 2)
          dstart = date.getDate()
          mstart = date.getMonth()
          ystart = date.getFullYear()
          date.setDate(date.getDate() + 6)
          dend = date.getDate()
          mend = date.getMonth()
          yend = date.getFullYear()
          break
        }
        case 4: {
          date.setDate(date.getDate() - 3)
          dstart = date.getDate()
          mstart = date.getMonth()
          ystart = date.getFullYear()
          date.setDate(date.getDate() + 6)
          dend = date.getDate()
          mend = date.getMonth()
          yend = date.getFullYear()
          break
        }
        case 5: {
          date.setDate(date.getDate() - 4)
          dstart = date.getDate()
          mstart = date.getMonth()
          ystart = date.getFullYear()
          date.setDate(date.getDate() + 6)
          dend = date.getDate()
          mend = date.getMonth()
          yend = date.getFullYear()
          break
        }
        case 6: {
          date.setDate(date.getDate() - 5)
          dstart = date.getDate()
          mstart = date.getMonth()
          ystart = date.getFullYear()
          date.setDate(date.getDate() + 6)
          dend = date.getDate()
          mend = date.getMonth()
          yend = date.getFullYear()
          break
        }
      }
      return ystart + '-' + (mstart + 1) + '-' + dstart + '——' + yend + '-' + (mend + 1) + '-' + dend
    },
    rerank ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 9) {
        if (rowIndex === 0) {
          return [3, 1]
        } else if (rowIndex === 1 || rowIndex === 2) {
          return [0, 0]
        }
      }
    },
    edit (row) {
      this.state = 1
      this.active = false
      // console.log(this.arrangeSets)
    },
    save (row) {
      if (this.selectedDep === '') {
        MessageBox({
          title: '警告',
          message: '请选择科室！',
          type: 'warning'
        })
        this.arrangeSets = this.arrangeSetsCopy.map(item => {
          return { ...item }
        })
        return
      }
      this.state = 0
      const arrangeSets = this.arrangeSets.map(item => {
        return { ...item }
      })
      this.arrangeSets = this.arrangeSetsCopy.map(item => {
        return { ...item }
      })
      addPlan({ arrangeSets, reference: getMondayDate()[0]}).then(res => {
        if (res.data.scode === 1) {
          MessageBox({
            title: '消息',
            message: '排班成功！',
            type: 'success'
          })
          this.selectedDep = ''
          this.active = true
          this.disStatus = [
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true]
          ]
        }
      })
    },
    showDepDocList () {
      getDepDocList({ kind: this.selectedDep }).then(res => {
        this.depDocList = res.data 
      })
    }
  },
  mounted () {
    getDep().then(res => {
      this.depList = res.data
    })
  }
}
</script>
<style lang="stylus" scoped>
  .title
    padding: 20px
    h1
      color: #03F
      font-size: 25px
  .table-wrapper
    >>>  .el-table__body tr:hover > td
      background: #fff
</style>
