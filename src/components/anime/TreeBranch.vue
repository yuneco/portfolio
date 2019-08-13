<template>
  <e-cont
    :x="x"
    :y="y"
    :r="isInited ? r : 0"
    :s="isInited ? s : 0"
    :ox="0"
    :oy="0"
    :dur="dur">

    <!-- Child nodes -->
    <slot />

    <!-- Node body -->
    <svg
      :viewBox="`${-width} ${-len} ${width * 2} ${len}`"
      :width="width * 2"
      :height="len"
      :style="{
        left: `${-width}px`,
        top: `${-len}px`
      }"
      >
      <defs>
        <clipPath :id="`clippath-${rndid}`">
          <path :d="clipPath"></path>
        </clipPath>
      </defs>
      <g :clip-path="`url(#clippath-${rndid})`">
        <rect :x="-width" :y="-len" :width="width * 2" :height="len" :fill="color" />
        <rect v-for="line in lines" :key="line.id"
          :x="line.x" :y="line.y" :width="line.w" :height="line.h"
          :fill="line.fill" :transform="`rotate(${line.r})`" />
      </g>
    </svg>

    <!-- accessories -->
    <div class="leafblocks"
      :style="{
        left: `${-width/2}px`,
        top: `${-len}px`
      }"
    >
      <tree-leaf-block v-for="leaf in leafBlocks" :key="leaf.id"
        :x="leaf.x"
        :y="leaf.y"
        :r="leaf.r"
        :s="0.2"
        :max-count="leaf.maxCount"
      >
      </tree-leaf-block>
    </div>

  </e-cont>
</template>

<style lang="scss" scoped>
svg {
  position: absolute;
}
.leafblocks {
  position: absolute;
  z-index: 1;
}
</style>

<script>
// import MU from '@/core/MathUtil'
import ColorUtil from '@/core/ColorUtil'
// import TL from '@/core/TL'
import ECont from '@/components/anime/core/ECont'
import TreeLeafBlock from '@/components/anime/TreeLeafBlock'
import Time from '@/core/Time'
import Point from '@/core/Point'
export default {
  name: 'TreeBranch',
  components: { ECont, TreeLeafBlock },
  props: {
    color: { type: String, default: '#886644' },
    width: { type: Number, default: 20 },
    len: { type: Number, default: 200 },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    r: { type: Number, default: 0 },
    s: { type: Number, default: 1.0 },
    dur: { type: Number, default: 3000 },
    leafBlockCount: { type: Number, default: 5 }
  },
  data () {
    return {
      rndid: 'TreeBranch-' + Math.random(),
      isInited: false,
      leafBlocks: []
    }
  },
  computed: {
    clipPath () {
      // 枝先端の根元に対する太さ
      const EDGE = 0.5
      const [w, l] = [this.width, this.len]
      // 根元と先端の点
      const pS = new Point(0, 0)
      const pE = new Point(0, -l)
      // 根元と先端を含む点の数
      const PCOUNT = 5
      // 左右の曲がり具合
      const X_RND_MAX = 1.3
      // 横幅の半分のベクトル
      const pHarfW = new Point(w / 2, 0)
      // 中心線の根元と先端を除く中間点
      const pMidBase = Array(PCOUNT - 2)
        .fill(0)
        .map((v, index) => new Point(0, (index + 1) * (-l / (PCOUNT - 1))))
        .map((p, index) => p.add(pHarfW.times((Math.random() - 0.5) * X_RND_MAX)))
      // 左側：中心線をコピーして「横幅の半分のベクトル」分だけマイナス
      const pMidLeft = [pS, ...pMidBase, pE].map(p => {
        const yRate = (p.y - pS.y) / (pE.y - pS.y)
        return p.sub(pHarfW.times(EDGE + (1 - yRate) * (1 - EDGE)))
      })
      // 右側：中心線をコピーして「横幅の半分のベクトル」分だけプラス
      const pMidRight = [pS, ...pMidBase, pE].map(p => {
        const yRate = (p.y - pS.y) / (pE.y - pS.y)
        return p.add(pHarfW.times(EDGE + (1 - yRate) * (1 - EDGE)))
      })
      // 左右を結合
      const points = [...pMidLeft, ...(pMidRight.reverse())]
      // Point → x,y の文字列変換
      const p2str = p => `${Math.round(p.x)},${Math.round(p.y)}`
      // 結合した全ての点を文字列に変換してSVGのパスを生成
      return 'M' + points.map(p => p2str(p)).join(' L') + 'z'
    },
    lines () {
      const LINE_COUNT = 5
      const MIN_LINE_WIDTH = this.width * 0.2
      const MAX_LINE_WIDTH = this.width * 0.6
      const MAX_ROTATION = 20
      const colors = ColorUtil.padColor(this.color, LINE_COUNT, false, 15, 20, 30)
      return Array(LINE_COUNT)
        .fill(0)
        .map((v, index) => ({
          id: `line-${index}`,
          fill: colors[index],
          r: (Math.random() - 0.5) * MAX_ROTATION,
          x: (Math.random() - 0.7) * this.width,
          y: -this.len * 3,
          w: MIN_LINE_WIDTH + (MAX_LINE_WIDTH - MIN_LINE_WIDTH) * Math.random(),
          h: this.len * 4
        }))
    }
  },
  methods: {
    addLeafBlock () {
      const AREA = {
        X0: -this.width * 1.5,
        X1: this.width * 2.5,
        Y0: -this.len * 0.2,
        Y1: this.len * 0.4
      }
      const ROTATE_RANGE = 30
      const LEAF_COUNT_MIN = 1
      const LEAF_COUNT_MAX = 3
      this.leafBlocks.push({
        id: `${this.rndid}-leafblock-${this.leafBlocks.length}`,
        x: AREA.X0 + (AREA.X1 - AREA.X0) * Math.random(),
        y: AREA.Y0 + (AREA.Y1 - AREA.Y0) * Math.random(),
        r: ROTATE_RANGE * (Math.random() - 0.5),
        maxCount: Math.floor(LEAF_COUNT_MIN + (LEAF_COUNT_MAX - LEAF_COUNT_MIN + 1) * Math.random())
      })
    }
  },
  async mounted () {
    await Time.wait(100)
    this.isInited = true
    const FIRST_LEAFBLOCK_WAIT = 1000 + Math.random() * 1000
    const LEAFBLOCK_INTERVAL_MIN = 1500
    const LEAFBLOCK_INTERVAL_MAX = 7500
    await Time.wait(FIRST_LEAFBLOCK_WAIT)
    while (this.leafBlocks.length < this.leafBlockCount) {
      await Time.wait(LEAFBLOCK_INTERVAL_MIN + Math.random(LEAFBLOCK_INTERVAL_MAX - LEAFBLOCK_INTERVAL_MIN))
      this.addLeafBlock()
    }
  }
}
</script>
