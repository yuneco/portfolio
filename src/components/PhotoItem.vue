<template>
  <div :style="{
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${left}px, ${top}px)`,
    transitionDuration: `${animDur}ms`,
    zIndex: `${selected ? 2 : 1}`
  }"
  @click="clickItem"
  :class="{'photo-item-root': true }"
  >
    <transition name="fade">
      <div v-if="visible" :class="{ 'item-inner': true, selected: selected }" :style="{
        backgroundColor: `${basecolor}60`
      }">
        <div class="img thumb" :style="{ backgroundImage: `url(${thumbSrc})` }"></div>
        <div class="img org" v-if="selected || srcLoaded" :style="{ backgroundImage: `url(${src})` }"></div>
        <div class="title">{{ title }}</div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.photo-item-root {
  position: absolute;
  transition: all 0.5s ease-out;
  z-index: 0;
  .item-inner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid rgba(172, 215, 255, 0.2);
    background-color: rgba(172, 215, 255, 0.084);
    &.selected {
      background-color: rgba(255, 172, 186, 0.53);
    }
  }
  .img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    &.thumb {
      z-index: 1
    }
    &.org {
      z-index: 2;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 300ms ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.4;
  transform: translateY(-80px) scale(0.6);
}
</style>

<script>

const TESTSRC = 'http://farm5.static.flickr.com/4498/23741628238_541f4fc1c7.jpg'

export default {
  name: 'PhotoItem',
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    src: { type: String, default: '' },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    left: { type: Number, default: 0 },
    top: { type: Number, default: 0 },
    thumbSrc: { type: String, default: TESTSRC },
    selected: { type: [Boolean, String], default: false },
    basecolor: { type: String, default: 'transparent' }
  },
  data () {
    return {
      animDur: 0,
      visible: false,
      srcLoaded: false
    }
  },
  computed: {
  },
  mounted () {
    this.animDur = 300
    this.visible = true
  },
  destroyed () {
    this.visible = false
  },
  watch: {
    src () {
      this.srcLoaded = false
    },
    selected (val) {
      if (val) {
        this.srcLoaded = true
      }
    }
  },
  methods: {
    clickItem (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>
