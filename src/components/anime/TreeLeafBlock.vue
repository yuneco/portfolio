<template>
  <div class="tree-leaf-block-root">
    <e-cont :x="x" :y="y" :r="r" :s="s">
      <tree-leaf v-for="pos in poses" :key="pos.id"
        :r="pos.r"
        :s="pos.s"
      >
      </tree-leaf>
    </e-cont>
  </div>
</template>

<script>
import ECont from '@/components/anime/core/ECont'
import TreeLeaf from '@/components/anime/TreeLeaf'
import Time from '@/core/Time'

const ANGLE_RANGE = 200

export default {
  name: 'TreeLeafBlock',
  components: { ECont, TreeLeaf },
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    r: { type: Number, default: 0 },
    s: { type: Number, default: 8.5 },
    maxCount: { type: Number, default: 3 }
  },
  data () {
    return {
      leafCount: 0,
      rndId: `tree-leafblock-${Math.random}`
    }
  },
  computed: {
    poses () {
      const count = this.leafCount
      // const SIZE_RANGE = 0
      return Array(count).fill(0).map((v, index) => {
        const angleNoise = Math.random() // プラス側に倒す
        return {
          id: `${this.rndId}-leaf-${index}`,
          r: (ANGLE_RANGE / this.maxCount * (index + angleNoise)) - (ANGLE_RANGE / 2),
          s: 1.2
        }
      })
    }
  },
  methods: {
    async animate () {
      const INTERVAL_MS = 150
      while (this.leafCount < this.maxCount) {
        this.leafCount++
        await Time.wait(INTERVAL_MS)
      }
    }
  },
  mounted () {
    this.animate()
  }
}
</script>
