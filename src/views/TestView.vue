<template>
  <div class="test">
    <h1>Test Page</h1>
    <animate-box class="box"></animate-box>
  </div>
</template>

<style lang="scss" scoped>
  .box {
    margin: 40px;
  }
</style>

<script>
import AnimateBox from '@/components/AnimateBox'
export default {
  name: 'TestView',
  components: { AnimateBox }
}
</script>
