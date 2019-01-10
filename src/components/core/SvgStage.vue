<template>
  <svg viewbox="0 0 600 600">
    <svg-assets></svg-assets>
    <slot></slot>
  </svg>
</template>

<style scoped>
svg {
  margin: 20px auto;
  display: inline-block;
  width: 600px;
  height: 600px;
}
</style>

<script>
import SvgAssets from '@/svgassets/SvgAssets'
export default {
  components: { SvgAssets }
}
</script>
