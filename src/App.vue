<template>
  <div id="app">
    <app-back-view></app-back-view>
  </div>
</template>

<style lang="scss">
html, body {
  height: 100%;
  box-sizing: border-box;
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
#nav {
  display: none;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import AppBackView from '@/AppBack'
export default {
  components: { AppBackView }
}
</script>
