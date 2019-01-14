<template>
  <path :id="id" :d="nextPathStr" :fill="fill" :stroke="stroke" :stroke-width="swidth" transform="translate(0,0)" >
    <animate ref="animate" attributeName="d"
      calcMode="linear"
      :from="pathStr"
      :to="nextPathStr"
      begin="indefinite" dur="2s" repeatCount="1"></animate>
  </path>
</template>

<script>
// import Rnd from '@/core/Rnd'
import Point from '@/core/Point'
import Time from '@/core/Time'
import MathUtil from '@/core/MathUtil'

const POINT_COUNT = 16

export default {
  name: 'MofCircle',
  data () {
    return {
      pathStr: '',
      nextPathStr: '',
      aps: [],
      cps: [],
      debug: true
    }
  },
  props: {
    size: { type: Number, default: 100 },
    id: { type: String, default: '' },
    fill: { type: String, default: 'none' },
    stroke: { type: String, default: '#ffffff80' },
    swidth: { type: Number, default: 3 }
  },
  created () {
  },
  mounted () {
    const animate = this.$refs.animate
    animate.addEventListener('endEvent', () => {
      this.pathStr = this.nextPathStr
      this.nextPathStr = this.createPathStr()
      animate.beginElement()
    }, false)
    this.pathStr = this.createPathStr()
    this.nextPathStr = this.createPathStr()
    Time.wait(0).then(() => animate.beginElement())
  },
  computed: {
  },
  methods: {
    createAnchorPoints () {
      const SCALE_NOISE = 0.2
      return Array(POINT_COUNT)
        .fill(0)
        .map((v, ind) => {
          const deg = 360 / POINT_COUNT * ind
          const rad = MathUtil.a2r(deg)
          const scale = 1 + (Math.random() - 0.5) * SCALE_NOISE
          const size = this.size / 2 * scale
          return new Point(Math.cos(rad) * size, Math.sin(rad) * size)
        })
    },
    createPathStr () {
      const aps = this.createAnchorPoints()
      aps.push(aps[0])
      // ユーティリティ
      // 桁数を指定して小数を丸める
      const round = (n, dig = 2) => Math.round(n * 10 ** dig) / 10 ** dig
      // Pointを座標文字列化
      const PStr = p => `${round(p.x)},${round(p.y)}`
      // Point配列を座標文字列化
      const PsStr = (ps) => ps.map(p => PStr(p)).join(' ')

      // 次のコントロールポイントを生成
      const nextCp = (pp, p, pn, pcp) => {
        const prevLen = p.sub(pp).len
        const nextLen = pn.sub(p).len
        return p.sub(pcp).times(nextLen / prevLen).add(p)
      }
      // 最初のコントロールポイントを生成
      const getFirstCp = (lp, fp) => {
        const firstCpLen = 0.5 + (Math.random() - 0.5) * 0.3
        return fp.sub(lp).times(firstCpLen).add(fp)
      }

      // アンカーポイントのリストからコントロールポイントのリストを生成
      const cps = []
      cps.push(getFirstCp(aps[aps.length - 2], aps[0]))
      aps.forEach((ap, ind) => {
        if (ind === 0 || ind === aps.length - 1) { return }
        const pap = aps[ind - 1]
        const nap = aps[ind + 1]
        const lcp = cps[ind - 1]
        cps.push(nextCp(pap, ap, nap, lcp))
      })

      // 最初のアンカーポイントにスムーズに繋げるため、
      // 最後のコントロールポイントをもう一つ追加
      const getLastCp = (lap, ap0, ap1, cp0) => {
        const len0 = ap1.sub(ap0).len
        const llen = ap0.sub(lap).len
        return ap0.sub(cp0.sub(ap0).times(llen / len0))
      }
      const lastCp = getLastCp(aps[aps.length - 2], aps[0], aps[1], cps[0])

      // アンカーポイント・コントロールポイントのリストからパスコマンドを生成
      const makeQStr = (ncp, nap) => `Q${PsStr([ncp, nap])}`
      const makeCStr = (ncp1, ncp2, nap) => `C${PsStr([ncp1, ncp1, nap])}`
      const qCmdStr = cps.map((cp, ind) => {
        const ap = aps[ind + 1]
        const isLast = ind === cps.length - 1
        if (!isLast) {
          return makeQStr(cp, ap)
        } else {
          return makeCStr(cp, lastCp, ap)
        }
      }).join(' ')

      // Debug
      this.aps = aps
      this.cps = [...cps, lastCp]

      return `M${PStr(aps[0])} ${qCmdStr}z`
    }
  }
}
</script>
