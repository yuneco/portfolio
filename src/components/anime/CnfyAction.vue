<template>
  <e-cont :x="x + dx - origin.ox" :y="y + dy - origin.oy" :r="r + dr" :s="s + ds"
  :dur="~~duration"
  :easing="easing"
  :ox="origin.ox"
  :oy="origin.oy"
  :debug="false"
  >
    <cnfy
      @click="ev => $emit('click', ev)"
      :head-angle="~~headAngle"
      :arm-fr-angle="~~armFrAngle"
      :arm-bk-angle="~~armBkAngle"
      :lg-fr-angle="~~lgFrAngle"
      :lg-bk-angle="~~lgBkAngle"
      :bow-angle="~~bowAngle"
      :strech="strech * 0.01"
      :dur="~~duration"
      :easing="easing"
    ></cnfy>
  </e-cont>
</template>

<script>
import TL from '@/core/TL'
import Cnfy from './Cnfy'
import ECont from './core/ECont'

const originBasePos = { ox: 225, oy: 900 }
const originCenterPos = { ox: 225, oy: 600 }

export default {
  name: 'CnfyAction',
  components: { Cnfy, ECont },
  props: {
    x: { type: [Number, String], default: 0 },
    y: { type: [Number, String], default: 0 },
    r: { type: [Number, String], default: 0 },
    s: { type: [Number, String], default: 1 }
  },
  data () {
    return {
      headAngle: 0,
      armFrAngle: 0,
      armBkAngle: 0,
      lgFrAngle: 0,
      lgBkAngle: 0,
      bowAngle: 0,
      strech: 100,
      duration: 1000,
      dx: 0,
      dy: 0,
      dr: 0,
      ds: 0,
      easing: 'ease',
      crAction: null,
      originMode: 'base',
      isBreakActionImmediate: false
    }
  },
  computed: {
    origin () {
      if (this.$data.originMode === 'center') {
        return originCenterPos
      } else {
        return originBasePos
      }
    }
  },
  methods: {
    async stopAction (immd) {
      if (!this.$data.crAction) { return }
      // console.log('WAIT STOP ACTION')
      await this.$data.crAction.stop(immd)
      // console.log('SOLVED STOP ACTION')
    },

    async waitActionEnd () {
      if (!this.$data.crAction) { return }
      if (this.$data.crAction.isBeforeRun) {
        await this.$data.crAction.onend()
      }
    },

    async bookNextAction (tl) {
      const crAction = this.$data.crAction
      this.$data.crAction = tl
      if (!crAction) {
        return
      }
      crAction.stop(this.isBreakActionImmediate)
      if (crAction.isBeforeRun || crAction.isRunning) {
        // console.log(`[${tl.name}] wait for end of [${crAction.name}]`)
        await crAction.onend(true)
        // console.log(`[${tl.name}] run after [${crAction.name}]`)
      }
    },

    async stand (dur = 500) {
      const tl = new TL(this.$data, 'stand')
        .to({
          headAngle: 0,
          armFrAngle: 0,
          armBkAngle: 0,
          lgFrAngle: 0,
          lgBkAngle: 0,
          bowAngle: 0,
          strech: 100,
          dx: 0,
          dy: 0,
          dr: 0,
          ds: 0,
          originMode: 'base',
          easing: 'ease',
          duration: dur
        }).wait(dur)
      await this.bookNextAction(tl)
      await tl.run()
    },

    async step (dur = 500, stepLen = 50, isLoop = false, loopCb) {
      const tl = new TL(this.$data, 'step')
        .to({
          headAngle: 0,
          armFrAngle: 37,
          armBkAngle: -28,
          bowAngle: 5,
          strech: 85,
          lgFrAngle: 34,
          lgBkAngle: 0,
          dy: -120,
          easing: 'ease-out',
          duration: dur * 0.25
        }).by({
          dx: 0
        }).wait(dur * 0.25).to({
          headAngle: 0,
          armFrAngle: 0,
          armBkAngle: 0,
          bowAngle: 0,
          strech: 100,
          lgFrAngle: 0,
          lgBkAngle: 0,
          dy: 0,
          easing: 'ease-in',
          duration: dur * 0.25
        }).by({
          dx: stepLen
        }).wait(dur * 0.25).to({
          headAngle: 0,
          armFrAngle: -26,
          armBkAngle: 34,
          bowAngle: 5,
          strech: 85,
          lgFrAngle: -16,
          lgBkAngle: 33,
          dy: -120,
          easing: 'ease-out',
          duration: dur * 0.25
        }).by({
          dx: 0
        }).wait(dur * 0.25).to({
          headAngle: 0,
          armFrAngle: 0,
          armBkAngle: 0,
          bowAngle: 0,
          strech: 100,
          lgFrAngle: 0,
          lgBkAngle: 0,
          dy: 0,
          easing: 'ease-in',
          duration: dur * 0.25
        }).by({
          dx: stepLen
        }).wait(dur * 0.25)
      await this.bookNextAction(tl)
      await (isLoop ? tl.runLoop(loopCb) : tl.run())
    },

    async bounce (dur = 1000, isLoop = false, loopCb) {
      this.duration = 1
      this.strech = 100
      const tl = new TL(this.$data, 'bounce')
        .to({
          strech: 120,
          dy: 0,
          easing: 'ease',
          duration: dur / 2
        }).wait(dur / 2).to({
          strech: 100,
          dy: 0,
          easing: 'ease',
          duration: dur / 2
        }).wait(dur / 2)
      await this.bookNextAction(tl)
      await (isLoop ? tl.runLoop(loopCb) : tl.run())
    },

    async somersault (dur = 5000, height = 800, isLoop = false, loopCb) {
      // console.log('somersault', dur, height)
      const tl = new TL(this.$data, 'somersault')
        .to({
          dr: 0
        }).wait(0).to({
          originMode: 'center',
          headAngle: 20,
          armFrAngle: -53,
          armBkAngle: -57,
          bowAngle: 9,
          strech: 89,
          lgFrAngle: 0,
          lgBkAngle: 0,
          dy: -300,
          dr: -10,
          easing: 'cubic-bezier(.59,0,.35,1.02)',
          duration: dur * 0.1
        }).wait(dur * 0.1).to({
          headAngle: 0,
          armFrAngle: 30,
          armBkAngle: 50,
          bowAngle: -10,
          strech: 110,
          lgFrAngle: 0,
          lgBkAngle: 0,
          dy: -height,
          dr: 0,
          easing: 'ease',
          duration: dur * 0.2
        }).wait(dur * 0.2).to({
          headAngle: 20,
          armFrAngle: -86,
          armBkAngle: -56,
          bowAngle: 50,
          strech: 100,
          dr: -60,
          easing: 'ease-in',
          duration: dur * 0.1
        }).wait(dur * 0.1).to({
          headAngle: 0,
          armFrAngle: 64,
          armBkAngle: 92,
          bowAngle: 50,
          strech: 90,
          lgFrAngle: 0,
          lgBkAngle: 0,
          dx: -100,
          dy: -height * 0.75,
          dr: 360,
          easing: 'cubic-bezier(.59,0,.35,1.02)',
          duration: dur * 0.3
        }).wait(dur * 0.3).to({
          headAngle: 20,
          armFrAngle: 0,
          armBkAngle: 0,
          lgFrAngle: 0,
          lgBkAngle: 0,
          bowAngle: 30,
          strech: 85,
          dx: 0,
          dy: -300,
          easing: 'ease-in',
          duration: dur * 0.2
        }).wait(dur * 0.2).to({
          headAngle: 0,
          armFrAngle: 0,
          armBkAngle: 0,
          lgFrAngle: 0,
          lgBkAngle: 0,
          bowAngle: 0,
          strech: 100,
          dx: 0,
          dy: 0,
          easing: 'ease-in-out',
          originMode: 'base',
          duration: dur * 0.1
        }).wait(dur * 0.1).to({
          dr: 0,
          easing: 'ease',
          duration: 0
        }).wait(0)
      await this.bookNextAction(tl)
      await (isLoop ? tl.runLoop(loopCb) : tl.run())
    },

    async jump (height = 200, dur = 3000, isLoop = false, loopCb) {
      const tl = new TL(this.$data, 'jump')
        .to({
          strech: 90,
          headAngle: 10,
          armFrAngle: 30,
          armBkAngle: 45,
          bowAngle: 5,
          dy: 50,
          easing: 'ease-out',
          duration: dur * 0.2
        }).wait(dur * 0.2).to({
          strech: 110,
          headAngle: -10,
          armFrAngle: 20,
          armBkAngle: 20,
          bowAngle: -5,
          dy: -height,
          easing: 'ease-out',
          duration: dur * 0.3
        }).wait(dur * 0.3).to({
          strech: 90,
          headAngle: 10,
          armFrAngle: -10,
          armBkAngle: -10,
          bowAngle: 5,
          dy: 20,
          easing: 'ease-in',
          duration: dur * 0.3
        }).wait(dur * 0.3).to({
          strech: 100,
          headAngle: 0,
          armFrAngle: 0,
          armBkAngle: 0,
          bowAngle: 0,
          dy: 0,
          easing: 'ease-in-out',
          duration: dur * 0.2
        }).wait(dur * 0.2)
      await this.bookNextAction(tl)
      await (isLoop ? tl.runLoop(loopCb) : tl.run())
    },

    async bow (dur = 3000, isLoop = false, loopCb) {
      await this.waitActionEnd()
      const tl = new TL(this.$data, 'bow')
        .to({
          strech: 100,
          bowAngle: -5,
          armFrAngle: 20,
          armBkAngle: 20,
          headAngle: -10,
          easing: 'ease',
          duration: dur * 0.2
        }).wait(dur * 0.2).to({
          strech: 100,
          bowAngle: 30,
          armFrAngle: -35,
          armBkAngle: -25,
          headAngle: 20,
          easing: 'ease',
          duration: dur * 0.4
        }).wait(dur * 0.4).to({
          strech: 100,
          bowAngle: 0,
          armFrAngle: 0,
          armBkAngle: 0,
          headAngle: 0,
          easing: 'ease',
          duration: dur * 0.4
        }).wait(dur * 0.4)
      await this.bookNextAction(tl)
      await (isLoop ? tl.runLoop(loopCb) : tl.run())
    }

  }
}
</script>
