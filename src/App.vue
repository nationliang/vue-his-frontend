<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>
<script>
export default {
}
</script>
<style lang="stylus" scoped>
  #app
    min-height: 652px
    background: url("./assets/images/bg.png")
</style>
