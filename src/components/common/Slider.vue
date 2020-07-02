<template>
  <div class="slide-show"
  @mouseover="clearInv"
  @mouseout="runInv">
    <div class="slide-img">
      <transition name="slide-trans"
      @before-enter="slideTransBeforeEnter"
      @enter="slideTransEnter">
        <img v-if="isShow" :src="slides[nowIndex].src">
      </transition>
      <transition name="slide-trans-old"
      @leave="slideTransOldLeave"
      @after-leave="slideTransOldAfterLeave">
        <img v-if="!isShow" :src="slides[nowIndex].src">
      </transition>
    </div>
    <h2></h2><!-- 遮罩 -->
    <ul class="slide-pages">
      <li @click="goto(prevIndex, 'left')">&lt;</li>
      <li v-for="(item, index) in slides"
      @click="goto(index)"
      :key="index">
        <span :class="{on: index === nowIndex}">{{ index + 1 }}</span>
      </li>
      <li @click="goto(nextIndex, 'right')">&gt;</li>
    </ul>
  </div>
</template>
<script>
const LEFT = 0
const RIGHT = 1

export default {
  name: 'Slider',
  props: {
    slides: {
      type: Array,
      default () {
        return []
      }
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true, // 初始值为何值不影响
      direction: LEFT
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index, direction) {
      switch (direction) {
        case 'right': {
          this.direction = RIGHT
          break
        }
        case 'left': {
          this.direction = LEFT
          break
        }
        default: {
          this.direction = RIGHT
          break
        }
      }
      if (this.nowIndex > index && this.nowIndex !== this.slides.length - 1) {
        this.direction = LEFT
      }
      this.isShow = false// old出现，new隐藏，不触发vue过渡动画，为过渡动画做准备
      setTimeout(() => {
        this.isShow = true// new出现，old隐藏，触发vue过渡动画
        this.nowIndex = index// 在new里会显示新的图片
      }, 10)
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.invId)
    },
    slideTransBeforeEnter (el) {
      if (this.direction === LEFT) {
        el.style.transform = 'translateX(100%)'
      } else {
        el.style.transform = 'translateX(-100%)'
      }
    },
    slideTransEnter (el) {
      // 触发浏览器重绘
      const rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.transform = 'translateX(0)'
      })
    },
    slideTransOldLeave (el) {
      if (this.direction === LEFT) {
        el.style.transform = 'translateX(-100%)'
      } else {
        el.style.transform = 'translateX(100%)'
      }
    },
    slideTransOldAfterLeave (el) {
      if (this.direction === LEFT) {
        // el.style.transform = 'translateX(0px)'
      }
    }
  },
  mounted () {
    this.runInv()
  }
}
</script>
<style lang="stylus" scoped>
  .slide-show
    position: relative
    height: 100%
    overflow: hidden
    .slide-img
      height: 100%
      .slide-trans-enter-active, .slide-trans-old-leave-active
        transition: all 1s
      img
        height: 100%
        position: absolute
        top: 0
    h2
      position: absolute
      bottom: 0
      text-align: left
      box-sizing: border-box
      padding: 5px 0 0 15px
      width: 100%
      color: #fff
      background: #000
      opacity: .5
      height: 30px
    .slide-pages
      position: absolute
      bottom: 10px
      right: 15px
      li
        display: inline-block
        padding: 0 10px
        cursor: pointer
        color: #fff
        .on
          text-decoration: underline
</style>
