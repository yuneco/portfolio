<template>
  <g :transform="`translate(${offset.x},${offset.y}) rotate(${rotate})`">
    <defs>
      <g :id="`${uniqeprefix}-headobj`"><slot name="head"></slot></g>
      <g :id="`${uniqeprefix}-midobj`"><slot name="mid" ></slot></g>
      <g :id="`${uniqeprefix}-tailobj`"><slot name="tail"></slot></g>
    </defs>

    <path ref="mainPath"
      :d="mainPathData"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      fill="none"
    />

    <use v-for="itemPos in itemsPos" :key="itemPos.id"
      v-bind="{'xlink:href':`#${uniqeprefix}-${itemPos.obj}`}"
      :transform="`translate(${itemPos.x},${itemPos.y}) rotate(${itemPos.r}) scale(${itemPos.scale})`"
    />

    <g v-if="isDebug">
      <circle v-for="(m, ind) in markers"
        :key="`circle-${ind}`"
        :cx="m.x"
        :cy="m.y" r="5"
        :fill="m.f" />
      <line v-for="(p, ind) in lines"
        :key="`line-${ind}`"
        :x1="p[0].x"
        :y1="p[0].y"
        :x2="p[1].x"
        :y2="p[1].y"
        :stroke="p[0].f"
        stroke-width="2" />
    </g>
  </g>
</template>

<script>
import MU from '@/core/MathUtil'
import Point from '@/core/Point'

const CP_LEN_RATE = 0.3

export default {
  name: 'SwingLine',
  components: { },
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    length: { type: Number, default: 300 },
    angle: { type: Number, default: 0 },
    rotate: { type: Number, default: 0 },
    stroke: { type: String, default: '#000' },
    strokeWidth: { type: Number, default: 5 },
    midScaler: { type: Function, default: at => 1 },
    isDebug: { type: Boolean, default: false }
  },
  data () {
    return {
      uniqeprefix: `sl-${Math.random()}`,
      mainPath: null,
      itemsPos: []
    }
  },
  computed: {
    mainPathData () {
      this.updateMidPoints()
      return `
        M${this.ap1.x},${this.ap1.y}
        C${this.cp1.x},${this.cp1.y}
        ${this.cp2.x},${this.cp2.y}
        ${this.ap2.x},${this.ap2.y}`
    },
    offset () { return { x: this.$props.x, y: this.$props.y } },
    ap1 () { return { x: 0, y: 0, f: 'blue' } },
    cp1 () { return { x: 0, y: -this.length * CP_LEN_RATE, f: 'blue' } },
    ap2 () {
      const len = this.length
      const baseY = 0
      const rad = MU.a2r(this.angle)
      const x = Math.sin(rad)
      const y = Math.cos(rad)
      return { x: (~~(x * len)), y: (~~(baseY - y * len)), f: 'red' }
    },
    cp2 () {
      const len = this.length * CP_LEN_RATE
      const rad = MU.a2r(this.angle * 3)
      const x = Math.sin(rad)
      const y = Math.cos(rad)
      const p = { ...this.ap2 }
      p.x -= x * len
      p.y += y * len
      p.f = 'red'
      return p
    },
    items () {
      const marginStart = 50
      const marginEnd = 20
      const marginMid = 30
      const midLen = this.length - (marginStart + marginEnd)
      const count = Math.floor(midLen / marginMid)
      const head = { id: 'head', at: 1, scale: 1, obj: 'headobj' }
      const tail = { id: 'tail', at: 0, scale: 1, obj: 'tailobj' }
      const mids = count >= 0 ? [...Array(count).keys()].map((i) => {
        const at = (midLen / count * i + marginStart) / this.length
        const scale = this.midScaler(at)
        return { id: i, at, scale, obj: 'midobj' }
      }) : []
      return [...mids, head, tail]
    },
    markers () {
      return [ this.ap1, this.cp1, this.ap2, this.cp2 ]
    },
    lines () {
      return [
        [this.ap1, this.cp1],
        [this.ap2, this.cp2]
      ]
    }
  },
  methods: {
    updateMidPoints () {
      if (!this.mainPath) { return }
      const len = this.mainPath.getTotalLength()
      this.itemsPos = this.items.map(item => {
        const at = item.at
        const delta = Math.min(5, len * 0.01)
        const p = new Point(this.mainPath.getPointAtLength(len * at))
        const pFrom = new Point(this.mainPath.getPointAtLength(Math.max(0, len * at - delta)))
        const pTo = new Point(this.mainPath.getPointAtLength(Math.min(len, len * at + delta)))
        const rad = pTo.sub(pFrom).multiply(new Point(1, -1)).rad
        const angle = MU.inverseAngle(MU.mathAngle2ClockAngle(MU.r2a(rad)) - 90)
        return { x: p.x, y: p.y, r: angle, scale: item.scale, obj: item.obj }
      })
    }
  },
  watche: {
  },
  mounted () {
    this.$data.mainPath = this.$refs.mainPath
  }
}
</script>
