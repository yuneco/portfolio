<template>
  <div class="loading-bar">
    <div :style="{background: color0}"></div>
    <div :style="{background: color1}"></div>
    <div :style="{background: color2}"></div>
    <div :style="{background: color3}"></div>
    <div :style="{background: color4}"></div>
  </div>
</template>

<style>
  .loading-bar {
    width: 97px;
    height: 39px;
    padding-top: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loading-bar > div {
    content: " ";
    width: 19px;
    height: 19px;
    border-radius: 20%;
    position: absolute;
    animation: cssload-shift 2.3s linear infinite;
  }
  .loading-bar > div:nth-of-type(1) {
    animation-delay: -0.46s;
  }
  .loading-bar > div:nth-of-type(2) {
    animation-delay: -0.92s;
  }
  .loading-bar > div:nth-of-type(3) {
    animation-delay: -1.38s;
  }
  .loading-bar > div:nth-of-type(4) {
    animation-delay: -1.84s;
  }

  @keyframes cssload-shift {
    0% {
      left: -58px;
      opacity: 0;
    }
    10% {
      left: 0;
      opacity: 1;
    }
    90% {
      left: 97px;
      opacity: 1;
    }
    100% {
      left: 156px;
      opacity: 0;
    }
  }
</style>

<script>
import ColorUtil from '@/core/ColorUtil'
export default {
  name: 'LoadingBar',
  props: {
    colors: { type: Array, default: () => ColorUtil.padColor('#369', 5).map(c => c.rgb().string()) }
  },
  computed: {
    color0 () { return this.colors[0] || '#888' },
    color1 () { return this.colors[1] || '#888' },
    color2 () { return this.colors[2] || '#888' },
    color3 () { return this.colors[3] || '#888' },
    color4 () { return this.colors[4] || '#888' }
  }
}
</script>
