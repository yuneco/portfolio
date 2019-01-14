<template>
  <div class="gallery-view">
    <div class="photo-list-outer">
      <photo-list :metas="imgMetas"></photo-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery-view {
  margin: 20px;
  box-sizing: border-box;
}
.photo-list-outer {
  position: absolute;
  box-sizing: border-box;
  width: calc(100% - 40px);
  height: calc(100% - 20px);
}
</style>

<script>
import PhotoList from '@/components/PhotoList'
// import Apis from '@/api/Apis'
export default {
  name: 'GalleryView',
  components: { PhotoList },
  computed: {
    imgMetas () {
      return this.$store.state.gallery.imgMetas
    }
  }
}
</script>
