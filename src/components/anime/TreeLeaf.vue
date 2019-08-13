<template>
  <e-cont
    :x="x"
    :y="y"
    :r="isAnimInited ? r : 0"
    :s="isAnimInited ? s : 0"
    :ox="0"
    :oy="0"
    :dur="isAnimEnded ? 0 : 600"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.3 115.3" width="66" height="115">
    <path d="M33.2,115.2c6.3-0.5,14.6-8.9,26.6-39.1C71.5,46.6,69.2,0.4,33.2,0.4S-5.1,46.6,6.6,76C18.6,106.3,27,114.6,33.2,115.2z"
      :fill="color"
      />
    </svg>
  </e-cont>
</template>

<style lang="scss" scoped>
svg {
  position: absolute;
  left: -40px;
  top: -100px;
}
</style>

<script>
import ECont from '@/components/anime/core/ECont'
import ColorUtil from '@/core/ColorUtil'
import Time from '@/core/Time'
export default {
  name: 'TreeLeaf',
  components: { ECont },
  props: {
    color: { type: String, default: () => ColorUtil.rndBetween('#83D6B8', '#1B98A1').toString() },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    r: { type: Number, default: 0 },
    s: { type: Number, default: 1.0 }
  },
  data () {
    return {
      isAnimInited: false,
      isAnimEnded: false
    }
  },
  async mounted () {
    await Time.wait(100)
    this.isAnimInited = true
    await Time.wait(600)
    this.isAnimEnded = true
  }
}
</script>
