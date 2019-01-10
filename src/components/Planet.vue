<template>
  <e-cont :r="r" :s="s" :dur="dur" :ox="0" :oy="0">
    <svg class="planet-root" :viewBox="`${-size/2} ${-size/2} ${size} ${size}`" :width="size" :height="size" :style="{
      background: color,
      left: `${-size/2}px`,
      top: `${-size/2}px`
    }" @click="clickPlanetRoot">
      <g>
        <!-- <use xlink:href="#PlanetAsset" /> -->
        <defs>
          <slot></slot>
        </defs>

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
  border-radius: 50%;
}
</style>

<script>
// import MU from '@/core/MathUtil'
import DebugGrid from './core/DebugGrid'
import ColorUtil from '@/core/ColorUtil'
import TL from '@/core/TL'
import ECont from '@/components/core/ECont'
export default {
  name: 'Planet',
  components: { DebugGrid, ECont },
  props: {
    color: { type: String, default: '#38A6BC' },
    size: { type: Number, default: 100 },
    debug: { type: String, default: '' }
  },
  data () {
    return {
      r: 0,
      s: 1,
      dur: 0
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
