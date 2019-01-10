<template>
  <div class="home">
    <div class="controls">
      <div class="menu">
        <menu-box></menu-box>
      </div>

      <h2>Posing</h2>
      <label>Nod: <input type="range" min="-30" max="30" v-model="headangle"> {{headangle}}</label>
      <label>ArmFr: <input type="range" min="-130" max="120" v-model="armfrangle"> {{armfrangle}}</label>
      <label>ArmBk: <input type="range" min="-130" max="120" v-model="armbkangle"> {{armbkangle}}</label>
      <label>LegFr: <input type="range" min="-40" max="50" v-model="legfrangle"> {{legfrangle}}</label>
      <label>LegBk: <input type="range" min="-40" max="50" v-model="legbkangle"> {{legbkangle}}</label>
      <label>Bow: <input type="range" min="-30" max="50" v-model="bowangle"> {{bowangle}}</label>
      <label>Strech: <input type="range" min="70" max="120" v-model="strech"> {{strech}}</label>
      <label>X: <input type="range" min="0" max="150" v-model="dx"> {{dx}}</label>
      <label>Y: <input type="range" min="-150" max="150" v-model="dy"> {{dy}}</label>
      <textarea name="" id="" cols="30" rows="10" :value="confyDataJsonStr"></textarea>
      <hr />
      <h2>Actions</h2>
      <button @click="cnfyDoAction('bounce', false)">Bounce</button>
      <button @click="cnfyDoAction('bounce', true)">Bounce(loop)</button>
      <br />
      <button @click="cnfyDoAction('jump', false)">Jump</button>
      <button @click="cnfyDoAction('jump', true)">Jump(loop)</button>
      <br />
      <button @click="cnfyDoAction('bow', false)">Bow</button>
      <button @click="cnfyDoAction('bow', true)">Bow(loop)</button>
      <br />
      <button @click="cnfyDoAction('step', false)">Step</button>
      <button @click="cnfyDoAction('step', true)">Step(loop)</button>
      <br />
      <button @click="cnfyDoAction('somersault', false)">Somersault</button>
      <button @click="cnfyDoAction('somersault', true)">Somersault(loop)</button>
      <br />
      <button @click="cnfyStop">Stop Loop</button>
      <button @click="cnfyDoAction('stand')">Reset</button>
      <br />
      <label>Scale: <input type="range" min="30" max="100" v-model="actionScale"> {{actionScale}}</label>

    </div>

    <!-- <svg-stage>
      <planet :items="planetItems">
        <g id="myPlant">
          <swing-plant
            :angle="~~angle"
            :length="~~length"
            :rotate="0"
            :x="0"
            :y="0"
          ></swing-plant>
        </g>
      </planet>
    </svg-stage> -->

    <div class="stage2">

      <e-cont :x="150" :y="590" :s="actionScale * 0.01">
        <cnfy-action
          ref="cnfyAction"
          @click="cnfyClicked"
        ></cnfy-action>
      </e-cont>

    </div>

    <div class="stage1">
      <e-cont :x="~~dx" :y="~~dy" :s="0.3">
        <cnfy
          :head-angle="~~headangle"
          :arm-fr-angle="~~armfrangle"
          :arm-bk-angle="~~armbkangle"
          :lg-fr-angle="~~legfrangle"
          :lg-bk-angle="~~legbkangle"
          :bow-angle="~~bowangle"
          :strech="strech * 0.01"
          :dur="200"
        ></cnfy>
      </e-cont>
    </div>
  </div>
</template>

<style>
.home {
  display: flex;
  width: 100%;
}
label {
  display: block;
}
.controls {
  position: absolute;
  width: 250px;
  height: 600px;
  left: 0;
}
.stage1 {
  position: absolute;
  width: 300px;
  height: 300px;
  left: 260px;
  overflow: hidden;
  border: 1px solid gray;
}
.stage2 {
  position: absolute;
  width: 600px;
  height: 600px;
  left: 260px;
  top: 320px;
  overflow: hidden;
  border: 1px solid gray;
}</style>

<script>
// import SvgStage from '@/components/SvgStage'
// import SwingPlant from '@/components/SwingPlant'
// import Planet from '@/components/Planet'
import ECont from '@/components/core/ECont'
import Cnfy from '@/components/Cnfy'
import MenuBox from '@/components/MenuBox'
import CnfyAction from '@/components/CnfyAction'

export default {
  name: 'home',
  components: { ECont, Cnfy, CnfyAction, MenuBox },
  data () {
    return {
      headangle: 0,
      armfrangle: 0,
      armbkangle: 0,
      legfrangle: 0,
      legbkangle: 0,
      bowangle: 0,
      strech: 100,
      dx: 80,
      dy: 20,
      duration: 3000,
      actionScale: 45
    }
  },
  computed: {
    confyDataJsonStr () {
      return `{
  headAngle: ${this.$data.headangle},
  armFrAngle: ${this.$data.armfrangle},
  armBkAngle: ${this.$data.armbkangle},
  bowAngle: ${this.$data.bowangle},
  strech: ${this.$data.strech},
  lgFrAngle: ${this.$data.legfrangle},
  lgBkAngle: ${this.$data.legbkangle},
  dx: ${this.$data.dx},
  dy: ${this.$data.dy},
}`
    }
  },
  mounted () {
    // const animate = (time) => {
    //   requestAnimationFrame(animate)
    //   this.$tween.update(time)
    // }
    // requestAnimationFrame(animate)
    // this.anime(1, 2500)

    // let isGoing = true
    // const action = () => {
    //   this.$data.headangle = isGoing ? 25 : -30
    //   this.$data.armfrangle = isGoing ? -96 : 117
    //   this.$data.armbkangle = isGoing ? -107 : 85
    //   this.$data.bowangle = isGoing ? 60 : -30
    //   this.$data.strech = isGoing ? 89 : 105
    //   isGoing = !isGoing
    // }
    // const doNext = () => {
    //   action()
    //   setTimeout(() => {
    //     this.duration = Math.max(this.duration * 0.8, 500)
    //     doNext()
    //   }, this.duration)
    // }
    // doNext()
  },
  methods: {
    anime (v, dur) {
      const at = (min, max, v) => min + (max - min) * v
      new this.$tween.Tween(this.$data)
        .to({
          headangle: at(25, -30, v),
          armfrangle: at(-96, 117, v),
          armbkangle: at(-107, 85, v),
          bowangle: at(60, -30, v),
          strech: at(89, 105, v)
        }, dur)
        .onUpdate(o => {
        })
        .onComplete(() => {
          this.anime(1 - v, Math.max(400, dur * 0.85))
        })
        .start()
    },
    cnfyDoAction (actName, isLoop) {
      const cnfy = this.$refs.cnfyAction
      if (actName === 'jump') {
        cnfy.jump(400, 3000, isLoop)
      } else if (actName === 'bounce') {
        cnfy.bounce(600, isLoop)
      } else if (actName === 'bow') {
        cnfy.bow(3000, isLoop)
      } else if (actName === 'step') {
        cnfy.step(1000, 40, isLoop)
      } else if (actName === 'somersault') {
        cnfy.somersault(5000, 1200, isLoop)
      } else if (actName === 'stand') {
        cnfy.stand()
      }
    },
    cnfyClicked (ev) {
      this.$refs.cnfyAction.jump(200, 2000, true)
    },
    cnfyStop () {
      this.$refs.cnfyAction.stopAction().then(() => {
        console.log('Action Stopped')
      })
    }
  }
}
</script>
