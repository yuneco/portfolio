<template>
  <div :style="{
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${left}px, ${top}px) scale(${scale})`,
    transitionDuration: `${animDur}ms`,
    zIndex: `${selected ? 2 : 1}`
  }"
  @click="clickItem"
  :class="{'photo-item-root': true }"
  >
    <div v-if="visible" :class="{ 'item-inner': true, selected: selected }" :style="{
      backgroundColor: `${bgColor}`
    }">
      <div class="img thumb" :style="{
        backgroundImage: `url(${thumbSrc})`
      }"></div>
      <div class="img org" v-if="selected || srcLoaded" :style="{ backgroundImage: `url(${src})` }"></div>
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo-item-root {
  position: absolute;
  transition: transform 0.5s ease-out, width 0.25s 0.5s ease-out, height 0.25s 0.5s ease-out;
  z-index: 0;
  .item-inner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // border: 1px solid rgba(3, 4, 6, 0.2);
    background-color: rgba(7, 11, 16, 0.619);
    box-shadow: 0px 0px 8px -2px rgba(17,38,54,1);
    overflow: hidden;
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
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top center;
    &.thumb {
      z-index: 1
    }
    &.org {
      z-index: 2;
    }
  }
  .title {
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: 4px;
    left: 0;
    padding: 5px;
    font-size: 9pt;
    color: #ffffffd4;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>

<script>
import ColorUtil from '@/core/ColorUtil'

export default {
  name: 'PhotoItem',
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    src: { type: String, default: '' },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    scale: { type: Number, default: 1 },
    left: { type: Number, default: 0 },
    top: { type: Number, default: 0 },
    thumbSrc: { type: String, default: '' },
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
    bgColor () {
      const c = ColorUtil.toColor(this.basecolor || '#000000').darken(0.4).alpha(0.5)
      return c.string()
    }
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
