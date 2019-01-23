<template>
  <div class="menu-box">

    <animate-box v-if="selItemPos" ref="selBgBox" class="sel-bg"
    color="#a3cdda"
    :direction="boxAnimeDir"
    :style="{
      width: `${selItemPos.w}px`,
      height: `${selItemPos.h}px`,
      transform: `translate(${selItemPos.x}px, ${selItemPos.y}px)`,
      transition: `all ${dur}ms`
    }">
    </animate-box>

    <ul :class="{menu: true, 'line-mode': mode === 'line', 'stack-mode': mode === 'stack' }">
      <li :class="{item: true, selected: sel === item.text}" v-for="item in itemsPos" :key="item.text"
        :style="{
          width: `${item.w}px`,
          height: `${item.h}px`,
          transform: `translate(${item.x}px, ${item.y}px)`,
          transition: `all ${dur}ms`
        }"
        @click="itemClicked(item)"
        >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu-box {
  position: relative;
  z-index: 1;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
  cursor: pointer;
}
.item {
  padding: 0;
  margin: 0;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  font-size: 13pt;
  transition: all 0.5s;
  line-height: 40px;
  border: 0px solid #fff;
  box-sizing: border-box;
  font-family: 'Montserrat Alternates', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
  transition: color 0.5s;
}

.stack-mode .item {
  font-size: 22pt;
  font-weight: bold;
  line-height: 80px;
  text-shadow: 0px 0px 12px #002030;
}

.selected {
  color: #002030;
}
.sel-bg {
  transition: all 0.5s;
}
</style>

<script>
import Time from '@/core/Time'
import AnimateBox from '@/components/AnimateBox'
export default {
  name: 'MenuBox',
  components: { AnimateBox },
  props: {
    items: { type: Array, default: () => (['item1', 'item2', 'item3']) },
    sel: { type: String, default: 'Contact' },
    mode: { type: String, default: 'line' }
  },
  data () {
    return {
      width: 100,
      height: 100,
      dur: 0,
      boxAnimeDir: 'top'
    }
  },
  computed: {
    itemsPos () {
      const ROW_HEIGHT_LINE = 40
      const ROW_HEIGHT_STACK = 60
      const isModeLine = this.mode === 'line'
      const rowHeight = isModeLine ? ROW_HEIGHT_LINE : ROW_HEIGHT_STACK
      const w = isModeLine ? this.width / this.items.length : this.width
      const offsetTop = (this.height - (rowHeight * this.items.length)) / 2
      return this.items.map((text, index) => {
        return {
          text,
          w,
          h: rowHeight,
          x: isModeLine ? index * w : 0,
          y: isModeLine ? 0 : offsetTop + index * rowHeight
        }
      })
    },
    selItemPos () {
      return this.itemsPos.find(item => item.text === this.sel) || ({
        w: this.width,
        h: 0
      })
    }
  },
  async mounted () {
    this.adjustSize()
    window.addEventListener('resize', this.adjustSize)
    await Time.wait(500)
    this.dur = 600
  },
  methods: {
    itemClicked (item) {
      this.$emit('selected', item.text)
      this.$refs.selBgBox.fireAction()
    },
    adjustSize () {
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetHeight
    }
  }
}
</script>
