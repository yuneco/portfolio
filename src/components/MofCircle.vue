<template>
  <g>
   <!-- <path d="M100,0 Q140,0 170.7,29.3 T200,100 170.7,170.7 100,200  29.3,170.7 0,100 29.3,29.3 100,0 z"
        fill="none" stroke="red" stroke-width="5" transform="translate(-100,-100)"  /> -->
    <path :d="nextPathStr" fill="none" stroke="red" stroke-width="5" transform="translate(-100,-100)" >
      <animate ref="animate" attributeName="d"
        calcMode="linear"
        :from="pathStr"
        :to="nextPathStr"
        begin="0s" dur="1s" repeatCount="1"></animate>
   </path>
  </g>
</template>

<script>
import Rnd from '@/core/Rnd'

const SIN45 = 1.4142 / 2
const COS45 = SIN45
const DEFSIZE = 100
const defM = [DEFSIZE, 0]
const defQ = [DEFSIZE * 1.4, 0]
const defPoints = [
  [DEFSIZE + COS45 * DEFSIZE, (1 - SIN45) * DEFSIZE],
  [DEFSIZE * 2, DEFSIZE],
  [DEFSIZE + COS45 * DEFSIZE, DEFSIZE + SIN45 * DEFSIZE],
  [DEFSIZE, DEFSIZE * 2],
  [(1 - COS45) * DEFSIZE, DEFSIZE + SIN45 * DEFSIZE],
  [0, DEFSIZE],
  [(1 - COS45) * DEFSIZE, (1 - SIN45) * DEFSIZE],
  [DEFSIZE, 0]
]

export default {
  name: 'MofCircle',
  data () {
    return {
      pathStr: '',
      nextPathStr: ''
    }
  },
  created () {
    this.pathStr = this.createPathStr()
    this.nextPathStr = this.createPathStr()
  },
  mounted () {
    const animate = this.$refs.animate
    animate.addEventListener('endEvent', () => {
      console.log('END')
      this.pathStr = this.nextPathStr
      this.nextPathStr = this.createPathStr()
      animate.beginElement()
    }, false)
  },
  methods: {
    createPathStr () {
      const MAXRND = 4
      const rnd = new Rnd(Date.now())
      const nextRnd = () => (rnd.next() % (MAXRND * 1000)) / 1000 - MAXRND / 2
      const round = (n) => Math.round(n * 100) / 100
      const PStr = (p) => `${round(p[0])},${round(p[1])}`
      const PsStr = (ps) => ps.map(p => PStr(p)).join(' ')
      const rndP = (p) => ([p[0] + nextRnd(), p[1] + nextRnd()])
      const rndPs = (ps) => ps.map(p => rndP(p))

      const cpM = rndP(defM)
      const cpQ = rndP(defQ)
      const cpPs = rndPs(defPoints)
      cpPs[cpPs.length - 1] = [...cpM]

      return `M${PStr(cpM)} Q${PStr(cpQ)} ${PStr(cpPs[0])} T${PsStr([...cpPs].splice(1))}z`
    }
  }
}
</script>
