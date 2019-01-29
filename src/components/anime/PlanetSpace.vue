<template>
  <div class="space" :style="{
    width: `${w}px`,
    height: `${h}px`,
    background: background,
    perspective: `${perspective}px`
  }">

    <bg-stars :w="w" :h="h"></bg-stars>

      <e-cont class="planet2" :x="planet2pos.x" :y="planet2pos.y">
        <r-cont :ch="planet2pos.s * 75" rotate-dur="13000" orbit-line="3px dotted #ffffff80">
          <planet :size="planet2pos.s * 20" color="#f8a066"></planet>
          <r-cont :ch="planet2pos.s * 75 * 0.25" rotate-dur="6000" orbit-line="2px dotted #ffffff80">
            <planet :size="planet2pos.s * 8" color="#ffcc66"></planet>
          </r-cont>
        </r-cont>
        <r-cont :ch="planet2pos.s * 110" rotate-dur="18000" orbit-line="5px dotted #ffffff40">
          <planet  :rdur="-8000" :size="planet2pos.s * 15" color="#99aacc"></planet>
        </r-cont>

        <planet ref="planet2" :rdur="-16000" :size="planet2pos.s * 100" :color="planetColor2" @click="changePlanet('planet2')"></planet>
      </e-cont>

      <e-cont class="planet1" :x="planet1pos.x" :y="planet1pos.y">
        <r-cont :ch="planet1pos.s * 125" rotate-dur="18000" orbit-line="1px dotted #aaddff99">
          <planet :rdur="3500" :size="planet1pos.s * 10" color="#ddd"></planet>
        </r-cont>

        <planet ref="planet1" :rdur="25000" :size="planet1pos.s * 100" :color="planetColor1" @click="changePlanet('planet1')"></planet>
      </e-cont>

      <e-cont class="planet3" :x="planet3pos.x" :y="planet3pos.y">
        <planet ref="planet3" :rdur="10000" :size="planet3pos.s * 100" :color="planetColor3" @click="changePlanet('planet3')"></planet>
      </e-cont>

      <e-cont class="cnfy-planet" :s="cnfyPlanetPos.s" :x="cnfyPlanetPos.x" :y="cnfyPlanetPos.y" :dur="4500">
        <r-cont :ch="50" :s="0.08" :r="-100" :x="cnfyState.x" :dur="cnfyState.stepSpeed * 2" easeing="ease-in-out">
          <cnfy-action :y="-10" ref="cnfy" @click="cnfyClick"></cnfy-action>
        </r-cont>
      </e-cont>

  </div>
</template>

<style scoped>
.space {
  position: relative;
  overflow: hidden;
}
</style>

<script>
import Planet from '@/components/anime/Planet'
import BgStars from '@/components/anime/BgStars'
import ECont from '@/components/anime/core/ECont'
import RCont from '@/components/anime/core/RCont'
import CnfyAction from '@/components/anime/CnfyAction'
import Time from '@/core/Time'

const DEFAULT_PLANET_SIZE = 100

export default {
  name: 'PlanetSpace',
  components: { BgStars, Planet, ECont, RCont, CnfyAction },
  props: {
    w: { type: Number, default: 100 },
    h: { type: Number, default: 100 },
    perspective: { type: Number, default: 1000 },
    count: { type: Number, default: 10 },
    background: { type: String, default: '#369' },
    planetColor1: { type: String, default: '#acd' },
    planetColor2: { type: String, default: '#99aacc' },
    planetColor3: { type: String, default: '#f8d899' }
  },
  data () {
    return {
      cnfyState: {
        isWalking: false,
        basePlanet: 'planet1',
        stepSpeed: 3000,
        jumpCount: 0,
        x: 0,
        rndActionTimer: 0
      }
    }
  },
  computed: {
    baseSize () {
      return (this.w + this.h) / 2 * 0.15
    },
    planet1pos () {
      const X = 0
      const Y = 1
      const DX = 0.4
      const DY = -0.3
      const BASER_SIZE = this.baseSize
      const SCALE = 3
      const maxW = this.w
      const maxH = this.h
      return {
        s: BASER_SIZE / DEFAULT_PLANET_SIZE * SCALE,
        x: maxW * X + BASER_SIZE * SCALE * DX,
        y: maxH * Y + BASER_SIZE * SCALE * DY
      }
    },
    planet2pos () {
      const X = 0.6
      const Y = 0.4
      const DX = 0
      const DY = 0
      const BASER_SIZE = this.baseSize
      const SCALE = 2
      const maxW = this.w
      const maxH = this.h
      return {
        s: BASER_SIZE / DEFAULT_PLANET_SIZE * SCALE,
        x: maxW * X + BASER_SIZE * SCALE * DX,
        y: maxH * Y + BASER_SIZE * SCALE * DY
      }
    },
    planet3pos () {
      const X = 0.8
      const Y = 0.9
      const DX = 0.2
      const DY = -0.6
      const BASER_SIZE = this.baseSize
      const SCALE = 1.5
      const maxW = this.w
      const maxH = this.h
      return {
        s: BASER_SIZE / DEFAULT_PLANET_SIZE * SCALE,
        x: maxW * X + BASER_SIZE * SCALE * DX,
        y: maxH * Y + BASER_SIZE * SCALE * DY
      }
    },
    cnfyPlanetPos () {
      return this[`${this.cnfyState.basePlanet}pos`]
    }
  },
  mounted () {
    this.cnfyWalk()
    window.clearInterval(this.rndActionTimer)
    this.rndActionTimer = window.setInterval(() => {
      const action = Math.random() < 0.6 ? 'jump' : 'change'
      const planetNum = Math.floor(Math.random() * 3) + 1
      if (action === 'jump') {
        const cnfy = this.$refs.cnfy
        if (!cnfy) {
          console.warn('cnfy not found in', this.$refs, this)
        }
        cnfy.jump(600).then(() => {
          this.cnfyWalk()
        })
      } else {
        this.changePlanet(`planet${planetNum}`)
      }
    }, 15000)
  },
  destroyed () {
    window.clearInterval(this.rndActionTimer)
  },
  methods: {
    async cnfyClick () {
      const cnfy = this.$refs.cnfy
      const isWalking = this.cnfyState.isWalking
      this.cnfyState.jumpCount++
      await cnfy.stopAction()
      if (this.cnfyState.jumpCount % 3 === 0) {
        await cnfy.bounce()
        await cnfy.bounce()
        await cnfy.somersault(5000)
        await cnfy.bow()
      } else {
        await cnfy.jump(350, 3000)
      }
      if (isWalking) {
        this.cnfyWalk()
      }
    },
    async cnfyWalk () {
      const STEPLEN = 40
      const cnfy = this.$refs.cnfy
      await cnfy.stopAction()
      this.cnfyState.isWalking = true
      this.cnfyState.x += STEPLEN
      cnfy.step(this.cnfyState.stepSpeed, 0, true, (count) => {
        this.cnfyState.x += STEPLEN
      }).then(() => {
        this.cnfyState.isWalkin = false
      })
    },
    async changePlanet (name) {
      if (!this.cnfyState.isWalking) { return }
      const targetPlanet = this.$refs[name]
      targetPlanet.twinkle()
      this.cnfyState.isWalking = false
      const cnfy = this.$refs.cnfy
      await cnfy.stopAction(true)
      await cnfy.stand()
      await cnfy.step(1000, 0)
      await cnfy.step(700, 0)
      cnfy.somersault(6000, 1500) // DON'T WAIT ACTION FINISHED
      await Time.wait(500)
      this.cnfyState.basePlanet = name
      this.cnfyState.x = this.cnfyState.x + 50
      await Time.wait(5000)
      targetPlanet.twinkle()
      await cnfy.stopAction()
      await cnfy.bow()
      await cnfy.jump()
      this.cnfyWalk()
    }
  }
}
</script>
