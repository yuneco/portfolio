<template>
  <div :style="{
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${left}px, ${top}px)`
  }"
  @click="clickItem"
  :class="{'photo-item-root': true, selected: selected }"
  >
    <div class="img"></div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style lang="scss" scoped>
.photo-item-root {
  position: absolute;
  transition: all 0.5s ease-out;
  box-sizing: border-box;
  border: 1px solid pink;
  background-color: rgba(172, 215, 255, 0.53);
  z-index: 0;
  &.selected {
  transition: all 0.4s ease-out;
    background-color: rgba(255, 172, 186, 0.53);
    z-index: 1;
  }
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
    width: { type: Number, default: 200 },
    height: { type: Number, default: 200 },
    left: { type: Number, default: 200 },
    top: { type: Number, default: 200 },
    thumbSrc: { type: String, default: TESTSRC },
    selected: { type: [Boolean, String], default: false }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    clickItem (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>
