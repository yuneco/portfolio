<template>
  <transition appear name="scale">
    <div class="profile-icon-root"
      :style="{
        backgroundImage: `url(${iconSrc})`,
        border: border,
        width: `${size}px`,
        height: `${size}px`
      }"
    ></div>
  </transition>
</template>

<style lang="scss" scoped>
.scale-enter-active, .scale-leave-active {
  transition: all 1000ms ease;
  transition-delay: 0;
}
.scale-enter, .scale-leave-to {
  transform: scale(0);
  opacity: 0.5;
}
  .profile-icon-root {
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    background-color: #fff;
  }
</style>

<script>
export default {
  name: 'ProfileIcon',
  props: {
    iconSrc: { type: String, default: '' },
    size: { type: [Number, String], default: 120 },
    border: { type: String, default: '4px solid #ffffff' }
  }
}
</script>
