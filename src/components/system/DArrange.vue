<template>
  <div>
    <div class="title">
      <h1>医生排班&#32;{{showDate()}}</h1>
    </div>
    <div class="table-wrapper">
      <el-table :data="arrangeSets" border :span-method="rerank">
        <el-table-column align="center" label="科室" prop="dep">
          <template slot-scope="scope">
            <el-select v-model="selectedDep" :disabled="active">
              <el-option value="1" label="牙科"></el-option>
              <el-option value="2" label="男科"></el-option>
              <el-option value="3" label="妇科"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间段" prop="time"></el-table-column>
        <el-table-column align="center" label="周一" prop="mon">
          <template slot-scope="scope">
            <el-select v-model="scope.row.mon" :disabled="active">
              <el-option value="1" label="李月"></el-option>
              <el-option value="2" label="王晓"></el-option>
              <el-option value="3" label="佳音"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周二" prop="tue">
          <template slot-scope="scope">
            <el-select v-model="scope.row.tue" :disabled="active">
              <el-option value="1" label="李月"></el-option>
              <el-option value="2" label="王晓"></el-option>
              <el-option value="3" label="佳音"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周三" prop="wedn">
          <template slot-scope="scope">
            <el-select v-model="scope.row.wedn" :disabled="active">
              <el-option value="1" label="李月"></el-option>
              <el-option value="2" label="王晓"></el-option>
              <el-option value="3" label="佳音"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周四" prop="thur">
          <template slot-scope="scope">
            <el-select v-model="scope.row.thur" :disabled="active">
              <el-option value="1" label="李月"></el-option>
              <el-option value="2" label="王晓"></el-option>
              <el-option value="3" label="佳音"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周五" prop="fri">
          <template slot-scope="scope">
            <el-select v-model="scope.row.fri" :disabled="active">
              <el-option value="1" label="李月"></el-option>
              <el-option value="2" label="王晓"></el-option>
              <el-option value="3" label="佳音"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周六" prop="sat">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sat" :disabled="active">
              <el-option value="1" label="李月"></el-option>
              <el-option value="2" label="王晓"></el-option>
              <el-option value="3" label="佳音"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="周日" prop="sun">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sun" :disabled="active">
              <el-option value="1" label="李月"></el-option>
              <el-option value="2" label="王晓"></el-option>
              <el-option value="3" label="佳音"></el-option>
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
export default {
  data () {
    return {
      arrangeSets: [
        {
          dep: '牙科',
          time: '上午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: ''
        },
        {
          dep: '牙科',
          time: '中午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: ''
        },
        {
          dep: '牙科',
          time: '下午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: ''
        }
      ],
      arrangeSetsCopy: [
        {
          dep: '牙科',
          time: '上午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: ''
        },
        {
          dep: '牙科',
          time: '中午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: ''
        },
        {
          dep: '牙科',
          time: '下午',
          mon: '',
          tue: '',
          wedn: '',
          thur: '',
          fri: '',
          sat: '',
          sun: ''
        }
      ],
      selectedDep: '',
      state: 0,
      active: true
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
      console.log(this.arrangeSets)
    },
    save (row) {
      this.state = 0
      const arrangeSets = this.arrangeSets.map(item => {
        return { ...item }
      })
      this.arrangeSets = this.arrangeSetsCopy.map(item => {
        return { ...item }
      })
      this.active = true
      console.log(arrangeSets)
    }
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
