<template>
  <div class="treepart">
    <tree-branch v-if="isAppeared"
      :width="width"
      :len="len"
      :x="x"
      :y="y"
      :r="r + swingAngle"
      :s="s"
      :dur="swingDur"
      :leat-block-count="telomere * 6 + 12"
    >
      <tree-part v-for="pos in children" :key="pos.id"
        :telomere="telomere ? telomere - 1 : 0"
        :child-count="childCount"
        :x="pos.x"
        :y="pos.y"
        :r="pos.r"
        :width="pos.w"
        :s="pos.s"
        :len="pos.len"
        :root="false"
      >
      </tree-part>
    </tree-branch>
  </div>
</template>

<script>
import TreePart from './TreePart'
import TreeBranch from './TreeBranch'
import Time from '@/core/Time'
export default {
  name: 'TreePart',
  components: { TreePart, TreeBranch },
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    r: { type: Number, default: 0 },
    s: { type: Number, default: 1.0 },
    len: { type: Number, default: 125 },
    width: { type: Number, default: 23 },
    telomere: { type: Number, default: 2 },
    childCount: { type: Number, default: 3 },
    root: { type: Boolean, default: true },
    initialDelay: { type: Number, default: 0 }
  },
  data () {
    return {
      children: [],
      isAppeared: false,
      swingAngle: 0,
      swingDur: 4500
    }
  },
  methods: {
    addChildBranch () {
      const ANGLE_RANGE = 80
      const ANGLE_RND = 20
      const index = this.children.length
      const baseAngle = ANGLE_RANGE / Math.max(1, (this.childCount - 1))
      const isCenter = index === (this.childCount - 1) / 2
      this.children.push({
        id: `treepart-${Math.random()}`,
        x: 0,
        y: isCenter ? -this.len : -this.len * (0.3 + Math.random() * 0.7),
        w: this.width * 0.7,
        r: baseAngle * index - (ANGLE_RANGE / 2) + (ANGLE_RND * (Math.random() - 0.5)),
        len: this.len * (0.6 + Math.random() * 0.2),
        s: 0.9
      })
    },
    async swingStart () {
      while (true) {
        if (!this.$el) { break }
        this.swingAngle = this.swingAngle > 0 ? -5 : 5
        await Time.wait(this.swingDur + Math.random() * 2000)
      }
    }
  },
  async mounted () {
    await Time.wait(this.initialDelay)
    if (!this.root) {
      this.swingStart()
    }
    this.isAppeared = true
    if (this.telomere > 0) {
      while (this.children.length < this.childCount) {
        await Time.wait(600 + 1500 * Math.random())
        this.addChildBranch()
      }
    }
  }
}
</script>
