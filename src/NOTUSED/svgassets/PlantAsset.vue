<template>
  <g>
    <linearGradient :id="`${NAME}-a`" x1="207.8" x2="207.8" y1="290.2" y2="116" gradientTransform="matrix(0 .80428 -1 0 290.2 -167)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#b3d095"/>
      <stop offset="1" stop-color="#62bbab"/>
    </linearGradient>
    <linearGradient :id="`${NAME}-b`" x1="207.8" x2="207.8" y1="290.2" y2="116" gradientTransform="matrix(0 -.80428 1 0 -290.2 167)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#b3d095"/>
      <stop offset="1" stop-color="#62bbab"/>
    </linearGradient>
    <linearGradient :id="`${NAME}-star`" gradientUnits="userSpaceOnUse" x1="-20.3657" y1="-45.0889" x2="30.6083" y2="63.0035">
      <stop  offset="0" style="stop-color:#FFDE4F"/>
      <stop  offset="1" style="stop-color:#FFBB2E"/>
    </linearGradient>
    <linearGradient :id="`${NAME}-g1`" gradientUnits="userSpaceOnUse" x1="-3.0701" y1="51.8602" x2="-3.0701" y2="-64.0339">
      <stop  offset="0" style="stop-color:#3C8FC7"/>
      <stop  offset="1" style="stop-color:#70FFFF"/>
    </linearGradient>
    <linearGradient :id="`${NAME}-g2`" gradientUnits="userSpaceOnUse" x1="43.1644" y1="73.7846" x2="-49.3605" y2="-86.4732">
      <stop  offset="0" style="stop-color:#1857AB"/>
      <stop  offset="1" style="stop-color:#70FFFF"/>
    </linearGradient>
    <linearGradient :id="`${NAME}-g3`" gradientUnits="userSpaceOnUse" x1="-3.2647" y1="51.8602" x2="-3.2647" y2="-64.0339">
      <stop  offset="0" style="stop-color:#3C8FC7"/>
      <stop  offset="1" style="stop-color:#70FFFF"/>
    </linearGradient>

    <g :id="`${NAME}-head`" transform="scale(0.7)">
      <path :fill="`url(#${NAME}-star)`" d="M-4.4-54.2c2.4-4.9,6.4-4.9,8.9,0L16-30.7c2.4,4.9,8.9,9.6,14.3,10.4l25.9,3.8C61.7-15.8,63-12,59-8.1 L40.3,10.1C36.3,14,33.9,21.6,34.8,27l4.4,25.8c0.9,5.4-2.3,7.8-7.2,5.2L8.9,45.8C4,43.2-4,43.2-8.8,45.8L-32,58 c-4.9,2.6-8.1,0.2-7.2-5.2l4.4-25.8c0.9-5.4-1.5-13-5.5-16.8L-59-8.2c-3.9-3.8-2.7-7.6,2.7-8.4l25.9-3.8c5.4-0.8,11.9-5.5,14.3-10.4 L-4.4-54.2z"/>
    </g>
    <g :id="`${NAME}-mid`" transform="scale(0.6)">
      <path :fill="`url(#${NAME}-a)`" d="M109-41.5C97.7-74.3 18.5-20 3-.8 26.7 3.5 120.3-8.6 109-41.5z"/>
      <path :fill="`url(#${NAME}-b)`" d="M-109-41.5C-120.3-8.6-26.7 3.5-3-.8-18.5-20.1-97.7-74.3-109-41.5z"/>
    </g>
    <g :id="`${NAME}-tail`" transform="scale(0.6)">
      <path :fill="`url(#${NAME}-g1)`" d="M0-54.3c-27.9,0-51.3,19.4-57.4,45.5L51.3-24.4C41.1-42.2,22-54.3,0-54.3z"/>
      <path :fill="`url(#${NAME}-g2)`" d="M-57.4-8.8c-1,4.3-1.6,8.9-1.6,13.5c0,1.6,0.1,3.2,0.2,4.7l111,22.6C56.6,23.9,59,14.6,59,4.7 c0-10.6-2.8-20.6-7.7-29.2L-57.4-8.8z"/>
      <path :fill="`url(#${NAME}-g3)`" d="M-58.8,9.5C-56.4,39.8-31,63.7,0,63.7c22.7,0,42.4-12.8,52.3-31.6L-58.8,9.5z"/>
    </g>
  </g>
</template>

<script>
const NAME = 'PlantAsset'
export default {
  name: NAME,
  data () {
    return {
      NAME
    }
  }
}
</script>
