<template>
  <g>
    <linearGradient :id="`${NAME}-SVGID_1_`" gradientUnits="userSpaceOnUse" x1="15.2362" y1="13.8766" x2="-44.3996" y2="-85.4964">
      <stop  offset="0" style="stop-color:#3C8FC7"/>
      <stop  offset="1" style="stop-color:#FFA8EC"/>
    </linearGradient>
    <linearGradient :id="`${NAME}-SVGID_2_`" gradientUnits="userSpaceOnUse" x1="40.4682" y1="69.1148" x2="-35.9326" y2="-63.2153">
      <stop  offset="0" style="stop-color:#188BAB"/>
      <stop  offset="1" style="stop-color:#70A9FF"/>
    </linearGradient>
    <linearGradient :id="`${NAME}-SVGID_3_`" gradientUnits="userSpaceOnUse" x1="-3.2647" y1="51.8602" x2="-3.2647" y2="-64.0339">
      <stop  offset="0" style="stop-color:#3CBEC7"/>
      <stop  offset="1" style="stop-color:#70FFFF"/>
    </linearGradient>

    <g :id="`${NAME}`">
      <path :fill="`url(#${NAME}-SVGID_1_)`" d="M0-59c-27.9,0-51.3,19.4-57.4,45.5L51.3-29.2C41.1-47,22-59,0-59z"/>
      <path :fill="`url(#${NAME}-SVGID_2_)`" d="M-57.4-13.5C-58.4-9.2-59-4.7-59,0c0,1.6,0.1,3.2,0.2,4.7l111,22.6C56.6,19.2,59,9.9,59,0c0-10.6-2.8-20.6-7.7-29.2L-57.4-13.5z"/>
      <path :fill="`url(#${NAME}-SVGID_3_)`" d="M-58.8,4.7C-56.4,35.1-31,59,0,59c22.7,0,42.4-12.8,52.3-31.6L-58.8,4.7z"/>
    </g>
  </g>
</template>

<script>
const NAME = 'PlanetAsset'
export default {
  name: NAME,
  data () {
    return {
      NAME
    }
  }
}
</script>
