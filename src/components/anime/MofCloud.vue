<template>
  <e-cont :r="r" :s="s" :dur="dur" :ox="0" :oy="0">
    <svg
      :viewBox="`${-size/2} ${-size/2} ${size} ${size}`"
      :width="size"
      :height="size"
      class="cloud-root"
      :style="{
        left: `${-size/2}px`,
        top: `${-size/2}px`
      }"
      @click="clickPlanetRoot">
      <mof-circle :size="size * 0.7"></mof-circle>
    </svg>
  </e-cont>
</template>

<style scoped>
.cloud-root {
  position: absolute;
}
</style>

<script>
// import MU from '@/core/MathUtil'
import ECont from '@/components/anime/core/ECont'
import MofCircle from './MofCircle'
export default {
  name: 'Planet',
  components: { ECont, MofCircle },
  props: {
    color: { type: String, default: '#38A6BC' },
    size: { type: Number, default: 100 }
  },
  data () {
    return {
      r: 0,
      s: 1,
      dur: 0,
      rndid: 'Cloud-' + Math.random()
    }
  }
}
</script>
