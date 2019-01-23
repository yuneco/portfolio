<template>
  <div class="anim-box-root">
    <div class="box" ref="box" :style="boxStyle" @click="fireAction" @animationend="endAnimation">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.anim-box-root {
  position: absolute;
  width: 250px;
  height: 80px;
  .box {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(235, 142, 125);

    &.bounce {
      animation: bounce 1s ease;
    }
  }
}

@keyframes bounce {
  0% {
    transform: scale(1, 1);
  }
  60% {
    transform: scale(1.2, 0.8) translateY(-20px);
  }
  85% {
    transform: scale(0.9, 1.1) translateY(0px);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>

<script>
export default {
  name: 'AnimationBox',
  props: {
    color: { type: String, default: '#336699' },
    dur: { type: Number, default: 1000 },
    direction: { type: String, default: 'bottom' }
  },
  data () {
    return {

    }
  },
  computed: {
    transformOrigin () {
      return ({
        top: 'center top',
        bottom: 'center bottom',
        left: 'left center',
        right: 'right center'
      })[this.direction] || this.direction
    },
    boxStyle () {
      return {
        transformOrigin: this.transformOrigin,
        animationDuration: this.dur,
        backgroundColor: this.color
      }
    },
    rootStyle () {
      return {

      }
    }
  },
  methods: {
    fireAction () {
      this.$refs.box.classList.add('bounce')
    },
    endAnimation () {
      this.$refs.box.classList.remove('bounce')
    }
  }
}
</script>
