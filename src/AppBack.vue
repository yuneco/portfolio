<template>
  <div class="app-back-view">

    <div class="menu">
      <menu-box ref="menu" :items="menuItems"
      @selected="menuSelected"
      :sel="currentMenuItem ? currentMenuItem.text : ''"
      :mode="isTopPage ? 'stack' : 'line'"
    ></menu-box>
    </div>

    <div ref="stage" :class="{stage: true, blur: blurStage}">
      <planet-space v-if="true" :w="stageWidth" :h="stageHeight"
        :perspective="~~perspective"
        :background="spaceBg"
        :style="{
          left: `${spaceX}px`,
          top:  `${spaceY}px`
        }"
      ></planet-space>
    </div>

    <div class="page-content" v-show="!this.isTopPage">
      <router-view/>
    </div>

  </div>
</template>

<style scoped>
.app-back-view {
  background: #0c243c;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.stage {
  border: 1px solid gray;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  filter: blur(0px) brightness(100%);
  transform: scale(1.0);
  transition: all 1.5s;
}
.stage.blur {
  filter: blur(8px) brightness(90%);
  transform: scale(1.25);
}
.menu {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.page-content {
  position: absolute;
  z-index: 1;
  width: calc(100% - 0px);
  height: calc(100% - 40px);
  left: 0px;
  top: 40px;
  color: white;
  overflow: scroll;
}
</style>

<script>
import PlanetSpace from '@/components/PlanetSpace'
import Gradient from '@/core/Gradient'
import Time from '@/core/Time'
import MenuBox from '@/components/MenuBox'

const MENUDEF = [
  { text: 'Top', path: '/', showOnTop: false },
  { text: 'Gallery', path: '/gallery', showOnTop: true },
  { text: 'Apps & PG', path: '/apps', showOnTop: true },
  { text: 'Contact', path: '/contact', showOnTop: true },
  { text: 'Adm', path: '/adm/upload', showOnTop: true }
]

export default {
  name: 'AppBackView',
  components: { PlanetSpace, MenuBox },
  data () {
    return {
      stageWidth: 100,
      stageHeight: 100,
      spaceX: 0,
      spaceY: 0,
      perspective: 1000,
      isInitialResized: false
    }
  },
  computed: {
    spaceBg () {
      return new Gradient(['#006987', '#020751']).toString()
    },
    currentMenuItem () {
      return MENUDEF.find(item => item.path === this.$route.path)
    },
    isTopPage () {
      return this.$route.path === '/'
    },
    topMenuItem () {
      return MENUDEF.find(item => item.path === '/')
    },
    menuItems () {
      const items = MENUDEF.filter(item => item.showOnTop || !this.isTopPage)
      return items.map(item => item.text)
    },
    blurStage () {
      return !this.isTopPage
    }
  },
  mounted () {
    this.adjustStageSize()
    window.addEventListener('resize', this.adjustStageSize)
  },
  destroyed () {
    window.removeEventListener('resize', this.adjustStageSize)
  },
  methods: {
    async adjustStageSize (ev, force) {
      const beforeWidth = document.body.offsetWidth
      const beforeHeight = document.body.offsetHeight
      if (this.isInitialResized) {
        await Time.wait(500)
      }
      this.isInitialResized = true
      if (document.body.offsetWidth !== beforeWidth && document.body.offsetHeight !== beforeHeight) { return }
      const stage = this.$refs.stage
      this.stageWidth = stage.offsetWidth
      this.stageHeight = stage.offsetHeight
    },
    menuSelected (item) {
      const path = ({
        'Top': '/',
        'Gallery': '/gallery',
        'Apps & PG': '/apps',
        'Contact': '/contact',
        'Adm': '/adm/upload'
      })[item] || ''
      this.$router.push(path)
    }
  }
}
</script>
