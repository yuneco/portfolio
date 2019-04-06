<template>
  <div class="tree-flower-root">
    <e-cont :x="x" :y="y" :r="r" :s="s">
      <tree-petal v-for="pos in poses" :key="pos.id"
        :r="pos.r"
      >
      </tree-petal>
    </e-cont>
  </div>
</template>

<script>
import ECont from '@/components/anime/core/ECont'
import TreePetal from '@/components/anime/TreePetal'
import Time from '@/core/Time'

const MAX_PETAL = 5

export default {
  name: 'TreeFlower',
  components: { ECont, TreePetal },
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    r: { type: Number, default: 0 },
    s: { type: Number, default: 0.3 }
  },
  data () {
    return {
      petalCount: 0,
      rndId: `tree-flower-${Math.random}`
    }
  },
  computed: {
    poses () {
      const count = this.petalCount
      return Array(count).fill(0).map((v, index) => {
        return {
          id: `${this.rndId}-petal-${index}`,
          r: 360 / MAX_PETAL * index
        }
      })
    }
  },
  methods: {
    async animate () {
      const INTERVAL_MS = 150
      while (this.petalCount < MAX_PETAL) {
        this.petalCount++
        await Time.wait(INTERVAL_MS)
      }
    }
  },
  mounted () {
    this.animate()
  }
}
</script>
