<template>
  <e-cont
    :x="x"
    :y="y"
    :r="isAnimInited ? r : 0"
    :s="isAnimInited ? s : 0"
    :ox="0"
    :oy="0"
    :dur="600"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.81 116.71" width="80" height="100">
      <path d="M41.73,116.67a.43.43,0,0,0,.35,0c11.31-5,31-30.17,39.81-63.14C87.54,32.45,80.52,8.42,63.52,1.07,54.37-2.87,47.37,5.34,41.91,5.34S29.44-2.87,20.3,1.07c-17,7.35-24,31.38-18.38,52.46C10.76,86.5,30.42,111.7,41.73,116.67Z"
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
  name: 'TreePetal',
  components: { ECont },
  props: {
    color: { type: String, default: () => ColorUtil.rndBetween('#FFF1F0', '#FFB1A8').toString() },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    r: { type: Number, default: 0 },
    s: { type: Number, default: 1.0 }
  },
  data () {
    return {
      isAnimInited: false
    }
  },
  async mounted () {
    await Time.wait(100)
    this.isAnimInited = true
  }
}
</script>
