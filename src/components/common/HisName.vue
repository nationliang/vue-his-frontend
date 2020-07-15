<template>
  <div class="name-wraper">
    <img :src="require('../../assets/images/redten.png')" class="redten" /><span class="name">还治不了你了医院</span>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
  .name-wraper
    height: 70px
    padding: 10px 0 10px 100px
    .redten
      vertical-align: middle
      width: 80px
      height: 70px
    .name
      vertical-align: middle
      color: #0033ff
      font-size: 35px
      font-weight: bold
</style>
