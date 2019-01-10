<template>
  <g>
    <swing-line
      :x="~~x"
      :y="~~y"
      :angle="~~angle"
      :length="~~length"
      :rotate="~~rotate"
      stroke="#b3d095"
      :midScaler="(at) => 0.5 + (1 - at * at) / 2"
    >
      <g slot="head" transform="scale(0.7)">
        <use xlink:href="#PlantAsset-head" />
      </g>
      <g slot="mid" transform="scale(0.6)">
        <use xlink:href="#PlantAsset-mid" />
      </g>
      <g slot="tail" transform="scale(0.6)">
        <!-- <use xlink:href="#PlantAsset-tail" /> -->
      </g>
    </swing-line>

  </g>
</template>

<script>
import SwingLine from '@/components/SwingLine'

export default {
  name: 'SwingPlant',
  components: { SwingLine },
  props: {
    x: { type: Number, default: 300 },
    y: { type: Number, default: 500 },
    length: { type: Number, default: 300 },
    angle: { type: Number, default: 0 },
    rotate: { type: Number, default: 0 }
  },
  data () {
    return {
    }
  }
}
</script>
