<template>
  <div class="gallery-view">
    <div class="photo-list-outer">
      <div v-show="!isContentLoaded" class="loading">
        LOADING...
        <loading-bar :colors="appColors"></loading-bar>
      </div>
      <photo-list v-show="true" ref="list" :metas="imgMetas" @changed="itemChanged"></photo-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery-view {
  margin: 20px;
  padding: 0px;
  box-sizing: border-box;
  overflow: visible;
}
.photo-list-outer {
  position: absolute;
  box-sizing: border-box;
  width: calc(100% - 40px);
  height: calc(100% - 20px);
}
.loading {
  height: 120px;
  padding-top: 50px;
}
</style>

<script>
import LoadingBar from '@/components/LoadingBar'
import PhotoList from '@/components/PhotoList'
import Time from '@/core/Time'
// import Apis from '@/api/Apis'
export default {
  name: 'GalleryView',
  components: { LoadingBar, PhotoList },
  data () {
    return {
      /** current selected item id */
      selId: null,
      /** selId that specified with URL when mounted. Keep until imgMetas are loaded */
      initialSelId: null
    }
  },
  computed: {
    imgMetas () {
      return this.$store.state.gallery.imgMetas
    },
    isContentLoaded () {
      return this.imgMetas && this.imgMetas.length > 0
    },
    appColors () {
      return [...this.$store.state.common.colors, '#006987', '#020751', '#acd', '#99aacc', '#f8d899']
    }
  },
  watch: {
    '$route' (to, from) {
      const newSelId = this.$route.params.filename
      if (this.selId !== newSelId) {
        this.$refs.list.selectItemWithId(newSelId)
      }
    },
    async imgMetas (val) {
      // this watch will be fired only once when DB documents are loaded.
      if (this.initialSelId) {
        // if the item to select is specified (see this.mounted), select that after item list is constructed.
        await Time.wait(1)
        // select item without smooth-scrolling to avoid animation delay in page loading phase
        this.$refs.list.selectItemWithId(this.initialSelId, false)
        this.initialSelId = null
      }
    }
  },
  mounted () {
    // keep gallery item specified in url onto local data object
    // NOTE: gallery items metadata (=imgMetas) may not be loaded yet.
    this.initialSelId = this.$route.params.filename || null
  },
  methods: {
    async itemChanged (id, item) {
      this.selId = id
      await Time.wait(200)
      if (this.selId !== id) { return }
      if (item) {
        const colors = item.meta.colors.colorset.colors
          .map(rgb => `rgb(${rgb.map(v => Math.round(v)).join(',')})`)
        this.$store.commit('setAppColors', { colors })
      } else {
        this.$store.commit('setAppColors', { colors: null })
      }
      this.$router.replace(`/gallery/${item ? item.id : ''}`)
    }
  }
}
</script>
