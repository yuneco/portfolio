<template>
  <div class="bgstars-root">
    <e-cont v-for="pos in poses" :key="pos.id"
      :x="pos.x" :y="pos.y" :z="pos.z" :s="pos.s" :r="pos.r"
    >
      <little-star ref="stars" :type="pos.type" :color="pos.color"></little-star>
    </e-cont>
  </div>
</template>

<style scoped>
.bgstars-root {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>

<script>
import ECont from '@/components/anime/core/ECont'
import LittleStar from '@/components/anime/LittleStar'
import ColorUtil from '@/core/ColorUtil'
export default {
  name: 'BgStars',
  components: { ECont, LittleStar },
  props: {
    w: { type: Number, default: 100 },
    h: { type: Number, default: 100 },
    minSize: { type: Number, default: 5 },
    maxSize: { type: Number, default: 20 },
    minZ: { type: Number, default: 0 },
    maxZ: { type: Number, default: 500 },
    count: { type: Number, default: 100 },
    color: { type: String, default: '#FFEA4C' }
  },
  data () {
    return {
      twinkleTimer: 0
    }
  },
  computed: {
    poses () {
      const BASE_SIZE = 100
      const STAR_SHAPE_PATE = 0.2
      const CIRCLE_STAR_SIZE_RATE = 0.3
      return Array(this.count)
        .fill(0)
        .map((v, ind) => {
          const type = Math.random() < STAR_SHAPE_PATE ? 'star' : 'circle'
          const scale = (this.minSize + (this.maxSize - this.minSize) * Math.random()) / BASE_SIZE
          return {
            id: `littlestar-elem-${ind}`,
            x: this.w * Math.random(),
            y: this.h * Math.random(),
            z: this.minZ + (this.maxZ - this.minZ) * Math.random(),
            s: scale * (type === 'circle' ? CIRCLE_STAR_SIZE_RATE : 1),
            r: Math.random() * 360,
            color: ColorUtil.rndBetween(this.color, '#fff').string(),
            type
          }
        })
    }
  },
  mounted () {
    this.$data.twinkleTimer = window.setInterval(() => {
      const stars = this.$refs.stars
      const twinkleRate = 0.1
      stars.filter(s => s.type === 'star').forEach(star => {
        if (Math.random() <= twinkleRate) {
          star.twinkle()
        }
      })
    }, 2000)
  },
  destroyed () {
    window.clearInterval(this.$data.twinkleTimer)
  }
}
</script>
