<template>
  <div class="elem-container" :style="{
      transformOrigin: `${ox}px ${oy}px`,
      transform: `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`,
      transition: `transform ${dur}ms 0s ${easing},
      transform-origin ${dur}ms 0s ${easing}`,
      'will-change': isWillChangeEnabled ? 'transform' : 'auto',
    }"
    @click="clicked"
    >
    <slot></slot>
    <div class="debug" v-if="debug" :style="{
      transform: `translate(${ox}px, ${oy}px)`
    }">
      <div class="debug-origin"></div>
    </div>
  </div>
</template>

<style scoped>
  div.elem-container {
    position: absolute;
    left: 0;
    top: 0;
  }
  .debug {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100000;
  }
  .debug-origin {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100000;
    width: 5px;
    height: 5px;
    background-color: red;
  }
</style>

<script>
export default {
  props: {
    debug: { type: [Boolean, String], default: false },
    ox: { type: [Number, String], default: 0 },
    oy: { type: [Number, String], default: 0 },
    x: { type: [Number, String], default: 0 },
    y: { type: [Number, String], default: 0 },
    z: { type: [Number, String], default: 0 },
    r: { type: [Number, String], default: 0 },
    s: { type: [Number, String], default: 1 },
    dur: { type: [Number, String], default: 0 },
    easing: { type: String, default: 'ease' },
    enableGpu: { type: Boolean, default: false }
  },
  computed: {
    isWillChangeEnabled () {
      return !!(this.enableGpu || this.dur)
    }
  },
  methods: {
    clicked (...args) {
      this.$emit('click', ...args)
      console.log('ECONT Clicked')
    }
  }
}
</script>
