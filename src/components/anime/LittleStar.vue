<template>
  <e-cont :r="r" :s="s" :dur="dur" :ox="50" :oy="50">
    <svg class="star-root" viewBox="-50 -50 100 100" width="100" height="100">
      <g>
        <circle v-if="type === 'circle'" cx="0" cy="0" r="50" :fill="color" />
        <path v-if="type === 'star'" :fill="color" d="M-3.6-45.4c2-4,5.2-4,7.3,0L13-26.2c2,4,7.3,7.8,11.7,8.5l21.1,3.1c4.5,0.6,5.5,3.7,2.3,6.9L32.9,7c-3.3,3.2-5.2,9.4-4.5,13.8l3.6,21c0.7,4.4-1.9,6.4-5.9,4.2L7.2,36.2c-4-2.1-10.5-2.1-14.4,0l-18.9,9.9c-4,2.1-6.6,0.2-5.9-4.2l3.6-21c0.7-4.4-1.2-10.6-4.5-13.7l-15.3-15c-3.2-3.1-2.2-6.2,2.2-6.9l21.1-3.1c4.4-0.7,9.7-4.5,11.7-8.5L-3.6-45.4z"/>
      </g>
    </svg>
  </e-cont>
</template>

<style scoped>
</style>

<script>
// import MU from '@/core/MathUtil'
// import ColorUtil from '@/core/ColorUtil'
import TL from '@/core/TL'
import ECont from '@/components/anime/core/ECont'
export default {
  name: 'LittleStar',
  components: { ECont },
  props: {
    color: { type: String, default: '#FFB900' },
    type: { type: String, default: 'star' }
  },
  data () {
    return {
      r: 0,
      s: 1,
      dur: 0,
      twinkleTl: null
    }
  },
  computed: {
  },
  created () {
    this.$data.twinkleTl = new TL(this.$data, 'twinkle')
      .to({
        r: 360,
        s: 1.5,
        dur: 500
      }).wait(500).to({
        s: 1,
        dur: 200
      }).wait(200).to({
        r: 0,
        dur: 0
      })
  },
  methods: {
    async twinkle () {
      await this.twinkleTl.run()
    }
  }
}
</script>
