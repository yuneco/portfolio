<template>
  <g>
    <line v-for="item in gridx" :key="`gridx-${item.at}`"
      :x1="item.at" :y1="-h / 2"
      :x2="item.at" :y2="h / 2"
      :stroke="item.at === 0 ? '#d33' : '#888'"
      :stroke-width="item.width" />
    <line v-for="item in gridy" :key="`gridy-${item.at}`"
      :x1="-w / 2" :y1="item.at"
      :x2="w / 2" :y2="item.at"
      :stroke="item.at === 0 ? '#d33' : '#888'"
      :stroke-width="item.width" />
  </g>
</template>

<script>
export default {
  name: 'DebugGrid',
  props: {
    w: { type: Number, default: 1000 },
    h: { type: Number, default: 1000 },
    size: { type: Number, default: 50 },
    group: { type: Number, default: 2 }
  },
  computed: {
    gridx () {
      const count = Math.floor((this.w / 2) / this.size) * 2 + 1
      return [...Array(count).keys()].map(i => {
        const index = i - (count - 1) / 2
        return {
          at: index * this.size,
          width: index === 0 ? 1 : (index % this.group === 0 ? 2 : 1)
        }
      })
    },
    gridy () {
      const count = Math.floor((this.h / 2) / this.size) * 2 + 1
      return [...Array(count).keys()].map(i => {
        const index = i - (count - 1) / 2
        return {
          at: index * this.size,
          width: index === 0 ? 1 : (index % this.group === 0 ? 2 : 1)
        }
      })
    }
  }
}
</script>
