<template>
  <e-cont :r="r" :s="s" :dur="dur" :ox="0" :oy="0">
    <svg
      :viewBox="`${-size/2} ${-size/2} ${size} ${size}`"
      :width="size"
      :height="size"
      :class="{
        'planet-root': true,
        round: !liquid
      }"
      :style="{
        left: `${-size/2}px`,
        top: `${-size/2}px`,
        animationDuration: `${Math.abs(rdur)}ms`,
        animationDirection: rdur > 0 ? 'normal' : 'reverse'
      }"
      @click="clickPlanetRoot">
      <defs>
        <clipPath :id="`clippath-${rndid}`">
          <mof-circle v-if="liquid" :size="size * 0.95"></mof-circle>
        </clipPath>
      </defs>
      <g :clip-path="liquid ? `url(#clippath-${rndid})` : ''">
        <rect :x="-size / 2" :y="-size / 2" :width="size" :height="size" :fill="color" />
        <rect v-for="line in lines" :key="line.id"
          :x="line.x" :y="line.y" :width="line.w" :height="line.h"
          :fill="line.fill" :transform="`rotate(${line.r})`" />

        <debug-grid v-if="debug" :w="size" :h="size" :size="10" :group="2"></debug-grid>
      </g>
    </svg>
  </e-cont>
</template>

<style scoped>
.planet-root {
  position: absolute;
  animation: spin 15s linear infinite;
}
.round{
  border-radius: 50%;
}
@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
@keyframes rspin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(-360deg);}
}

</style>

<script>
// import MU from '@/core/MathUtil'
import DebugGrid from './core/DebugGrid'
import ColorUtil from '@/core/ColorUtil'
import TL from '@/core/TL'
import ECont from '@/components/core/ECont'
import MofCircle from './MofCircle'
export default {
  name: 'Planet',
  components: { DebugGrid, ECont, MofCircle },
  props: {
    color: { type: String, default: '#38A6BC' },
    size: { type: Number, default: 100 },
    rdur: { type: Number, default: 15000 },
    liquid: { type: [Boolean, String], default: false },
    debug: { type: String, default: '' }
  },
  data () {
    return {
      r: 0,
      s: 1,
      dur: 0,
      rndid: 'Planet-' + Math.random()
    }
  },
  computed: {
    lines () {
      const BASE_SIZE = this.size
      const LINE_COUNT = 5
      const MIN_LINE_WIDTH = 10
      const MAX_LINE_WIDTH = 60
      const MAX_ROTATION = 50
      const colors = ColorUtil.padColor(this.color, LINE_COUNT, false, 15, 20, 30)
      return Array(LINE_COUNT)
        .fill(0)
        .map((v, index) => ({
          id: `line-${index}`,
          fill: colors[index],
          r: (Math.random() - 0.5) * MAX_ROTATION * 2,
          x: -BASE_SIZE * 1.5,
          y: (index / LINE_COUNT) * (BASE_SIZE - MIN_LINE_WIDTH) - BASE_SIZE / 2,
          w: BASE_SIZE * 3,
          h: MIN_LINE_WIDTH + (MAX_LINE_WIDTH - MIN_LINE_WIDTH) * Math.random()
        }))
    }
  },
  methods: {
    clickPlanetRoot (ev) {
      this.$emit('click', ev)
    },
    async twinkle () {
      const tl = new TL(this.$data, 'twinkle')
        .to({
          s: 0.95,
          dur: 500
        }).wait(500).to({
          s: 1.1,
          dur: 100
        }).wait(100).to({
          s: 1,
          dur: 200
        }).wait(200).to({
          s: 1.05,
          dur: 100
        }).wait(100).to({
          s: 1,
          dur: 200
        }).wait(200)
      await tl.run()
    }
  }
}
</script>
