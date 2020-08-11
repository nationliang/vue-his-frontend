<template>
  <div>
    <page-header></page-header>
    <page-side :defaultTopicId="defaultTopicId" :sideContent="sideContent" @changeTopic="changeTopic"></page-side>
    <section class="main-wrapper">
      <div class="main">
        <div class="container">
          <canvas v-show="defaultTopicId === 0" ref="ctx1"></canvas>
          <canvas v-show="defaultTopicId === 1" ref="ctx2"></canvas>
          <canvas v-show="defaultTopicId === 2" ref="ctx3"></canvas>
        </div>
      </div>
    </section>
    <page-tail></page-tail>
  </div>
</template>
<script>
import PageHeader from '../components/common/Header'
import PageSide from '../components/common/PageSide'
import PageTail from '../components/common/Footer'
import Chart from 'chart.js'
import {
  getIncomeAndExpenditure,
  getMedicineList_sta,
  getDoctorStatistics
} from '../api/index'

export default {
  data () {
    return {
      defaultTopicId: 0,
      sideContent: {
        title: '数据统计',
        contentArr: [
          {
            topic: '医院总收支'
          },
          {
            topic: '药物出入库'
          },
          {
            topic: '医生接诊'
          }
        ]
      },
      iande: [],
      medicineList_sta: null,
      dandp: null
    }
  },
  components:{
    PageHeader,
    PageSide,
    PageTail
  },
  methods: {
    drawBarGraph2 () {
      const chart = new Chart(this.$refs.ctx3, {
        type: 'bar',
        data: {
          // labels: ["孙淼", "钱程", '洪爱红', '周乐', '李月', '王凯'],
          labels: this.dandp.doctorNameList,
          datasets: [
            {
              label: '统计信息',
              // data: [55, 64, 58, 46, 88, 47],
              data: this.dandp.dataList,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: '医生接诊统计',
            fontSize: '20',
            fontColor: 'black'
          }
        }
      })
    },
    drawBarGraph1 () {
      const chart = new Chart(this.$refs.ctx2, {
        type: 'bar',
        data: {
          // labels: ["黄连", "人参", '雪莲', '砒霜', '鸦片'],
          labels: this.medicineList_sta.nameList,
          datasets: [
            {
              label: '入库',
              // data: [55, 64, 58, 46, 88],
              data: this.medicineList_sta.inList,
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ]
            },
            {
              label: '出库',
              // data: [41, 12, 42, 11, 32],
              data: this.medicineList_sta.outList,
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: '药物进出库统计',
            fontSize: '20',
            fontColor: 'black'
          }
        }
      })
    },
    drawPieGraph () {
      const chart = new Chart(this.$refs.ctx1, {
        type: 'pie',
        data: {
          labels: ["收入", "支出"],
          datasets: [
            {
              data: this.iande,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
              ]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: '医院收支',
            fontSize: '20',
            fontColor: 'black'
          }
        }
      })
    },
    changeTopic (id) {
      this.defaultTopicId = id
      if (id === 1) {
        this.drawBarGraph1()
      } else if (id === 2) {
        this.drawBarGraph2()
      } else {
        this.drawPieGraph()
      }
    }
  },
  mounted () {
    getIncomeAndExpenditure().then(res => {
      this.iande = res.data
      this.drawPieGraph()
    })
    getMedicineList_sta().then(res => {
      this.medicineList_sta = res.data
    })
    getDoctorStatistics().then(res => {
      this.dandp = res.data
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
      text-align: center
      .container
        display: inline-block
        position: relative
        min-width: 820px
        max-width: 1060px
</style>