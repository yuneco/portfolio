<template>
  <div class="test">
    <h1>Test Page</h1>
    <tree-part
      :x="300" :y="500"
    ></tree-part>
  </div>
</template>

<style lang="scss" scoped>
  .box {
    margin: 40px;
  }
</style>

<script>
import TreePart from '@/components/anime/TreePart'
export default {
  name: 'TestView',
  components: { TreePart }
}
</script>
