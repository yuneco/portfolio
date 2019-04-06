<template>
  <div class="app-content-view">

    <div class="menu">
      <menu-box ref="menu" :items="menuItems"
      @selected="menuSelected"
      :sel="currentMenuItem ? currentMenuItem.text : ''"
      :mode="currentMenuItem ? currentMenuItem.menuMode : 'line'"
    ></menu-box>
    </div>

    <div ref="stage" :class="{stage: true, blur: blurStage}" v-show="!isTestPage">
      <planet-space v-if="true" :w="stageWidth" :h="stageHeight"
        :perspective="~~perspective"
        :background="spaceBg"
        :planet-color1="planetColors[0]"
        :planet-color2="planetColors[1]"
        :planet-color3="planetColors[2]"
        :style="{
          left: `${spaceX}px`,
          top:  `${spaceY}px`
        }"
      ></planet-space>
    </div>

    <div class="page-content" ref="page" v-show="!this.isTopPage">
      <router-view/>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.app-content-view {
  background: #0c243c;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
  &.visible {
    opacity: 1;
  }
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
  &.blur {
    filter: blur(8px) brightness(90%);
    transform: scale(1.25);
  }
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
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

<script>
import PlanetSpace from '@/components/anime/PlanetSpace'
import Gradient from '@/core/Gradient'
import Time from '@/core/Time'
import MenuBox from '@/components/MenuBox'

const MENUDEF = [
  { text: 'Top', path: '/', showOnTop: false, menuMode: 'stack' },
  { text: 'Illust', path: '/gallery', showOnTop: true, menuMode: 'line' },
  { text: 'Apps & PG', path: '/apps', showOnTop: true, menuMode: 'line' },
  { text: 'Info', path: '/info', showOnTop: true, menuMode: 'line' },
  { text: 'Contact', path: '/contact', showOnTop: true, menuMode: 'line' }
]

export default {
  name: 'AppContentView',
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
    appColors () {
      return [...this.$store.state.common.colors, '#006987', '#020751', '#acd', '#99aacc', '#f8d899']
    },
    spaceBg () {
      return new Gradient([this.appColors[0], this.appColors[1]]).toString()
    },
    planetColors () {
      return [this.appColors[2], this.appColors[3], this.appColors[4]]
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
    },
    isTestPage () {
      return this.$route.path === '/test2'
    }
  },
  async mounted () {
    this.adjustStageSize()
    window.addEventListener('resize', this.adjustStageSize)
    let lastTouch = Date.now()
    this.$el.addEventListener('touchend', event => {
      if (Date.now() - lastTouch <= 500) {
        event.preventDefault()
      }
      lastTouch = Date.now()
    }, false)
    this.$el.addEventListener('touchstart', event => {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    }, false)
    this.$el.classList.add('visible')
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
    menuSelected (sel) {
      const item = MENUDEF.find(mitem => mitem.text === sel)
      const path = item ? item.path : '/'
      this.$router.push(path)
      this.$refs.page.scrollTo(0, 0)
    }
  }
}
</script>
