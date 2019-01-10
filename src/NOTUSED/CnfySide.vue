<template>
  <g :transform="`translate(${x},${y}) rotate(${rotate}) scale(${scale})`">
    <use xlink:href="#CnfySideAsset-Sk"
      :transform="`rotate(${0})`"
    />
    <use xlink:href="#CnfySideAsset-Fc" />
    <use xlink:href="#CnfySideAsset-BdTp" />
    <use xlink:href="#CnfySideAsset-Rb2" />
    <use xlink:href="#CnfySideAsset-HnFr" />
    <use xlink:href="#CnfySideAsset-HrFr" />
    <use xlink:href="#CnfySideAsset-Rb1" />

    <debug-grid :w="2000" :h="2000"></debug-grid>
  </g>
</template>

<script>
import DebugGrid from '@/components/core/DebugGrid'
export default {
  name: 'CnfySide',
  components: { DebugGrid },
  props: {
    x: { type: Number, default: 300 },
    y: { type: Number, default: 500 },
    scale: { type: Number, default: 1 },
    rotate: { type: Number, default: 0 }
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>
