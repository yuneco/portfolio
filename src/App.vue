<template>
  <div id="app">
    <app-back-view></app-back-view>
  </div>
</template>

<style lang="scss">
html, body {
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
div {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import AppBackView from '@/AppBack'
export default {
  components: { AppBackView },
  mounted () {
    this.$store.dispatch('loadGalleryMetas')
  }
}
</script>
