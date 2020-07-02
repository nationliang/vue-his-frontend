<template>
  <div class="side-wrapper">
    <div class="side-content">
      <h1>{{sideContent.title}}</h1>
      <ul>
        <li @click="toggleTopic(index)" :class="{'active': selectedIndex === index}" v-for="(item, index) in sideContent.contentArr" :key="index">{{item.topic}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    defaultTopicId: Number,
    sideContent: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      selectedIndex: 0
    }
  },
  watch: {
    defaultTopicId (newValue, oldValue) {
      this.selectedIndex = newValue
    }
  },
  methods: {
    toggleTopic (index) {
      this.selectedIndex = index
      this.$emit('changeTopic', index)
    }
  },
  mounted () {
    this.selectedIndex = this.defaultTopicId
  }
}
</script>
<style lang="stylus" scoped>
  .side-wrapper
    display: inline-block
    margin: 30px
    width: 200px
    text-align: center
    box-shadow: 0px 0px 5px #B2B2B2
    .side-content
      background-color: #ffffff
      h1
        padding: 20px 10px
        background-color: #32D1DE
        color: #ffffff
        font-weight: bold
      ul
        li
          padding: 20px 10px
          border-top: 1px solid #DEDEDE
          color: #5F4945
          font-weight: bold
          cursor: pointer
          &:hover
            color: #2C6AD3
          &.active
            background-color: #EEEDEC
            color: #000
</style>
