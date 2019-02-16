<template>
  <div class="gallery-view">
    <div class="photo-list-outer">
      <div v-show="!isContentLoaded" class="loading">
        LOADING...
        <loading-bar :colors="appColors"></loading-bar>
      </div>
      <photo-list v-show="true" ref="list"
        :metas="imgMetas"
        @changed="itemChanged"
        @click="bookSlideshow"
        ></photo-list>
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
import MathUtil from '@/core/MathUtil'
const SLIDESHOW_ACTIVATE_SEC = 40
const SLIDESHOW_INTERVAL_SEC = 15

export default {
  name: 'GalleryView',
  components: { LoadingBar, PhotoList },
  data () {
    return {
      /** current selected item id */
      selId: null,
      /** selId that specified with URL when mounted. Keep until imgMetas are loaded */
      initialSelId: null,
      /* slide show ... */
      slideshowActivateTimerId: null,
      isSlideshowMode: false
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
    this.bookSlideshow()
  },
  destroyed () {
    window.clearTimeout(this.slideshowActivateTimerId)
    this.isSlideshowMode = false
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
    },
    async runSlideshow () {
      this.isSlideshowMode = true
      console.log('Slideshow start')
      while (this.isSlideshowMode) {
        const meta = this.imgMetas[MathUtil.intBetween(0, this.imgMetas.length - 1)]
        this.$refs.list.selectItemWithId(meta.filename)
        await Time.wait(SLIDESHOW_INTERVAL_SEC * 1000)
      }
      console.log('Slideshow ended')
    },
    bookSlideshow () {
      // Quit slideshow (if running)
      this.isSlideshowMode = false
      // Book slideshow activation after SLIDESHOW_ACTIVATE_SEC sec
      window.clearTimeout(this.slideshowActivateTimerId)
      this.slideshowActivateTimerId = window.setTimeout(() => {
        this.runSlideshow()
      }, SLIDESHOW_ACTIVATE_SEC * 1000)
    }
  }
}
</script>
