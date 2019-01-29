<template>
  <div class="outer-rotator" ref="outer" :style="{
    animationPlayState: rotateDur ? 'running' : 'paused',
    animationDuration: `${rotateDur}ms`
  }">
    <div class="rotate-cont-root"
      :style="{
        width: `0px`,
        height: `${ch * 2}px`,
        transformOrigin: 'center',
        transform: `translate(${0}px, ${-ch}px) rotate(${r + groundX}deg)`,
        transition: `transform ${dur}ms 0s ${easing}`,
      }">
      <div class="orbit" v-if="orbitLine"
        :style="{
          width: `${ch * 2}px`,
          height: `${ch * 2}px`,
          border: orbitLine,
          transformOrigin: 'center',
          transform: `translate(${-ch}px, ${0}px)`,
          transition: `transform ${dur}ms 0s ${easing}`,
        }"></div>
      <e-cont :s="s">
        <slot></slot>
      </e-cont>
    </div>
  </div>
</template>

<style scoped>
  .rotate-cont-root {
    position: absolute;
    border: 0px solid red;
    box-sizing: border-box;
  }
  .orbit {
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    z-index: 0;
  }
  .outer-rotator {
    animation-name: loopRotation;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes loopRotation {
    0% { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }
</style>

<script>
import ECont from './ECont'
export default {
  name: 'RCont',
  components: { ECont },
  props: {
    ch: { type: [Number, String], default: 50 },
    cx: { type: [Number, String], default: 0 },
    cy: { type: [Number, String], default: 0 },
    s: { type: [Number, String], default: 1 },
    r: { type: [Number, String], default: 0 },
    x: { type: [Number, String], default: 0 },
    dur: { type: [Number, String], default: 0 },
    easing: { type: String, default: 'ease' },
    orbitLine: { type: String, default: '' },
    rotateDur: { type: [Number, String], default: 0 }
  },
  computed: {
    groundX () {
      return this.x / (this.ch * 2 * Math.PI) * 360
    }
  },
  mounted () {
  }
}
</script>
