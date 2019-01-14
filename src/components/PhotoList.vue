<template>
  <div class="list-root">
    <div class="scroller" v-if="width > 0" :style="{
      height: `${totalListHeight}px`
    }">
      <div class="item-box" v-for="item in itemWithPoses" :key="item.id">
        <photo-item  ref="itemRef"
          :title="item.meta.title"
          :src="item.meta.org.url"
          :thumbSrc="item.meta.thumb.url"
          :basecolor="item.meta.colors.main"
          :left="item.pos.left"
          :top="item.pos.top"
          :width="item.pos.width"
          :height="item.pos.height"
          :selected="item.id === selectedId"
          @click="clickItem(item)"
          ></photo-item>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-root {
  position: absolute;
  // background: #99ffff19;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.scroller{
  position: relative;
}
.item-box {
  position: absolute;
  box-sizing: border-box;
  &.selected {
    z-index: 1;
  }
}
</style>

<script>
import PhotoItem from './PhotoItem'
import Time from '@/core/Time'
export default {
  name: 'PhotoList',
  components: { PhotoItem },
  props: {
    defaultColWidth: { type: Number, default: 150 },
    minMargin: { type: Number, default: 20 },
    metas: { type: Array, default: () => ([]) }
  },
  data () {
    return {
      selectedId: null,
      width: 0
    }
  },
  computed: {
    isSelected () {
      return !!this.selectedId
    },
    isSerialView () {
      const BREAK_ROW_COUNT = 3
      return this.isSelected && this.width < (this.defaultColWidth + this.minMargin) * BREAK_ROW_COUNT - this.minMargin
    },
    colCount () {
      const count = (this.width + this.minMargin) / (this.defaultColWidth + this.minMargin)
      const countInt = Math.max(1, Math.floor(count))
      return this.isSerialView ? 1 : countInt
    },
    colWidth () {
      return this.colCount === 1 ? this.width : this.defaultColWidth
    },
    selItemFloatPos () {
      if (!this.selectedId) { return null }
      const selMeta = this.metas.find(meta => meta.filename === this.selectedId)
      if (!selMeta) { return null }
      const parent = this.$el
      const pw = parent.offsetWidth
      const ph = parent.offsetHeight
      const r = Math.min(1, Math.min(pw / selMeta.org.width, ph / selMeta.org.height))
      const width = selMeta.org.width * r
      const height = selMeta.org.height * r
      const left = (pw - width) / 2
      const top = (ph - height) / 2 + parent.scrollTop
      return { left, top, width, height }
    },
    itemWithPoses () {
      const accHeightOfCols = Array(this.colCount).fill(0)
      const marginX = this.colCount >= 2 ? (this.width - this.colCount * this.colWidth) / this.colCount : 0
      const outerMarginX = marginX / 2
      const marginY = this.minMargin
      const selPos = this.selItemFloatPos
      return this.metas.map((meta) => {
        const isSelected = meta.filename === this.selectedId
        const minH = Math.min(...accHeightOfCols)
        const targetColIndex = accHeightOfCols.findIndex(v => v === minH)
        const left = targetColIndex * (marginX + this.colWidth) + outerMarginX
        const top = accHeightOfCols[targetColIndex] + marginY
        const width = this.colWidth
        const height = width / meta.org.width * meta.org.height
        accHeightOfCols[targetColIndex] += height + marginY
        const itemPos = { left, top, width, height }
        const isUseSelPos = isSelected && !this.isSerialView
        return {
          id: meta.filename,
          pos: isUseSelPos ? selPos : itemPos,
          meta: meta }
      })
    },
    selItemPos () {
      if (!this.isSelected) { return null }
      return this.itemWithPoses.find(item => item.id === this.selectedId)
    },
    totalListHeight () {
      return Math.max(...this.itemWithPoses.map(item => item.pos.top + item.pos.height))
    }
  },
  mounted () {
    let lastScrollValue = 0
    let lastScrollTime = 0
    const MAX_INTERVAL = 1000
    window.addEventListener('resize', this.updateWidth)
    this.$el.addEventListener('scroll', (ev) => {
      if (!this.isSelected || !this.isSerialView) { return }
      const isSequental = Date.now() - lastScrollTime < MAX_INTERVAL
      const dir = this.$el.scrollTop - lastScrollValue > 0 ? 'down' : 'up'
      this.selectCurrentScrolled(isSequental ? dir : null)
      lastScrollValue = this.$el.scrollTop
      lastScrollTime = Date.now()
    })
    this.updateWidth()
  },
  destroyed () {
    window.removeEventListener('resize', this.updateWidth)
  },
  methods: {
    async updateWidth () {
      const beforeWidth = this.$el.offsetWidth
      await Time.wait(500)
      if (beforeWidth !== this.$el.offsetWidth) { return }
      this.width = this.$el.offsetWidth
    },
    async scrollToItem (id) {
      const item = this.itemWithPoses.find(item => item.id === id)
      if (!item) { return }
      await Time.wait(0) // wait apply .scroller height
      const offset = (this.$el.offsetHeight - item.pos.height) / 2
      const top = Math.max(0, item.pos.top - offset)
      this.$el.scrollTop = Math.max(0, top)
    },
    clickItem (item) {
      const id = item.id
      const isCloseAction = id === this.selectedId
      const lastSelectedId = this.selectedId
      this.selectedId = isCloseAction ? null : id
      this.scrollToItem(isCloseAction ? lastSelectedId : id)
    },
    selectCurrentScrolled (scrollDir = null) {
      const MARGIN_TO_ENTER = 0.3
      const breakRate = +{
        up: MARGIN_TO_ENTER,
        down: 1 - MARGIN_TO_ENTER
      }[scrollDir] || 0.5
      const center = this.$el.offsetHeight * breakRate + this.$el.scrollTop

      const selItem = this.itemWithPoses.find(item => item.pos.top < center && (item.pos.top + item.pos.height) > center)
      if (!selItem) { return }
      this.selectedId = selItem.id
    }
  }
}
</script>
