<template>
  <div class="cnfy-root"
    :style="{ transform: rootPos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"
    @transitionend="rootAnimEnd"
    @click="ev => $emit('click', ev)" >

    <!--
      cnfyRoot
        BdGr
          HdGr
            Rb1
            HrHr
            Hd
          BdTp
          Am
        Sk
    -->

    <e-cont class="bd-gr"
      :r="bdGrPos.r"
      :ox="bdGrPos.ox"
      :oy="bdGrPos.oy"
      :x="bdGrPos.x"
      :y="bdGrPos.y"
      :dur="dur"
      :easing="easing">

      <e-cont class="hd-gr"
        :r="hdGrPos.r"
        :ox="hdGrPos.ox"
        :oy="hdGrPos.oy"
        :x="hdGrPos.x"
        :y="hdGrPos.y"
        :dur="dur">
        <elm-hr-bk class="elem hr-bk" :style="{ transform: hrBkPos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-hr-bk>
      </e-cont>

      <elm-am class="elem am-bk" :style="{ transform: armBkPos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-am>

      <e-cont class="hd-gr"
        :r="hdGrPos.r"
        :ox="hdGrPos.ox"
        :oy="hdGrPos.oy"
        :x="hdGrPos.x"
        :y="hdGrPos.y"
        :dur="dur"
        :easing="easing">
        <elm-hd class="elem hd"></elm-hd>
      </e-cont>
    </e-cont>

    <elm-lg-bk class="elem lg-bk" :style="{ transform: lgBkPos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-lg-bk>
    <elm-lg-fr class="elem lg-fr" :style="{ transform: lgFrPos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-lg-fr>
    <elm-sk class="elem sk"  :style="{ transform: skPos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-sk>

    <e-cont class="bd-gr"
      :r="bdGrPos.r"
      :ox="bdGrPos.ox"
      :oy="bdGrPos.oy"
      :x="bdGrPos.x"
      :y="bdGrPos.y"
      :dur="dur"
      :easing="easing">

      <elm-bd-tp class="elem bd-tp"></elm-bd-tp>
      <elm-rb1 class="elem rb1" :style="{ transform: rb1Pos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-rb1>
      <elm-am class="elem am-fr" :style="{ transform: armFrPos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-am>

      <e-cont class="hd-gr"
        :r="hdGrPos.r"
        :ox="hdGrPos.ox"
        :oy="hdGrPos.oy"
        :x="hdGrPos.x"
        :y="hdGrPos.y"
        :dur="dur"
        :easing="easing">

        <elm-hr-fr class="elem hr-fr" :style="{ transform: hrFrPos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-hr-fr>
        <elm-rb2 class="elem rb2" :style="{ transform: rb2Pos, transitionDuration: dur+'ms', transitionTimingFunction: easing }"></elm-rb2>
      </e-cont>
    </e-cont>

  </div>
</template>

<style scoped>
  .cnfy-root {
    /* border: 1px solid red; */
    width: 430px;
    height: 900px;
    position: absolute;
    transition: transform 100ms 0s ease;
    transform-origin: 175px, 520px;
  }
  .elem, .gr{
    position: absolute;
    left: 0;
    top: 0;
    transition: transform 100ms 0s ease;
  }
  .rb1 {
    transform-origin: 175px 25px;
    transform: translate(-36px, 461px);
  }
  .rb2 {
    transform-origin: 105px 60px;
    transform: translate(0px, 0px);
  }
  .hd {
    transform-origin: 145px 375px;
    transform: translate(56px, 32px);

  }
  .hr-fr {
    transform-origin: 105px 15px;
    transform: translate(41px, 72px);
  }
  .hr-bk {
    transform-origin: 105px 15px;
    transform: translate(60px, 80px);
  }
  .bd-tp {
    transform-origin: 50% 50%;
    transform: translate(126px, 375px);
  }
  .sk {
    transform-origin: 240px 230px;
    transform: translate(15px, 509px);
  }
  .am-fr {
    transform-origin: 50px 15px;
    transform: translate(121px, 387px) rotate(0deg);
  }
  .am-bk {
    transform-origin: 50px 15px;
    transform: translate(150px, 387px) rotate(0deg);
  }
  .lg-fr {
    transform-origin: 30px 30px;
    transform: translate(172px, 560px) rotate(0deg);
  }
  .lg-bk {
    transform-origin: 30px 30px;
    transform: translate(190px, 560px) rotate(0deg);
  }
  /*
  svg {
    border: 1px solid pink;
  }
  */
  /* group */
</style>

<script>
import ECont from '@/components/core/ECont'
import ElmRb1 from '@/svgcomps/CnfySide/Rb1.svg'
import ElmRb2 from '@/svgcomps/CnfySide/Rb2.svg'
import ElmAm from '@/svgcomps/CnfySide/Am.svg'
import ElmHd from '@/svgcomps/CnfySide/Hd.svg'
import ElmBdTp from '@/svgcomps/CnfySide/BdTp.svg'
import ElmHrFr from '@/svgcomps/CnfySide/HrFr.svg'
import ElmHrBk from '@/svgcomps/CnfySide/HrBk.svg'
import ElmSk from '@/svgcomps/CnfySide/Sk.svg'
import ElmLgFr from '@/svgcomps/CnfySide/LgFr.svg'
import ElmLgBk from '@/svgcomps/CnfySide/LgBk.svg'
export default {
  components: { ECont, ElmRb1, ElmRb2, ElmAm, ElmHd, ElmBdTp, ElmHrFr, ElmHrBk, ElmSk, ElmLgFr, ElmLgBk },
  props: {
    headAngle: { type: Number, default: 0 },
    armFrAngle: { type: Number, default: 0 },
    armBkAngle: { type: Number, default: 0 },
    bowAngle: { type: Number, default: 20 },
    lgFrAngle: { type: Number, default: 0 },
    lgBkAngle: { type: Number, default: 0 },
    strech: { type: Number, default: 1 },
    dur: { type: Number, default: 1000 },
    easing: { type: String, default: 'ease' }
  },
  computed: {
    headTopAngle () {
      return this.headAngle + this.bowAngle
    },
    hdGrPos () {
      return { r: this.headAngle, ox: 230, oy: 390, x: 0, y: Math.max(0, this.headAngle) }
    },
    bdGrPos () {
      return { r: this.bowAngle, ox: 280, oy: 525, x: 0, y: this.bowAngle * 1.5 }
    },
    rootPos () {
      return `translate(${this.bowAngle * 5}px,
        ${(this.bowAngle > 0 ? this.bowAngle * 1.5 : 0) - 438 * (this.strech - 1)}px)
      rotate(${this.bowAngle}deg)`
    },
    armFrPos () { return `translate(121px, 400px) rotate(${this.armFrAngle}deg)` },
    armBkPos () { return `translate(141px, 387px) rotate(${this.armBkAngle}deg)` },
    rb1Pos () { return `translate(-36px, 461px) rotate(${this.bowAngle < 0 ? -this.bowAngle * 2.3 : 0}deg` },
    rb2Pos () { return `translate(0px, 20px) rotate(${this.headTopAngle < 0 ? -this.headTopAngle * 0.5 : 0}deg` },
    hrFrPos () { return `translate(41px, 72px) rotate(${-this.headTopAngle * 0.3}deg` },
    hrBkPos () { return `translate(41px, 60px) rotate(${-this.headTopAngle * 0.4}deg` },
    lgFrPos () { return `translate(172px, 560px) rotate(${-this.lgFrAngle}deg` },
    lgBkPos () { return `translate(190px, 560px) rotate(${-this.lgBkAngle}deg` },
    skPos () {
      return `translate(${this.bowAngle < 0 ? this.bowAngle : 0}px, ${
        438 + this.bowAngle * (this.bowAngle > 0 ? 1 : 0.4)
      }px)
      rotate(${-this.bowAngle / 3}deg)
      scale(${2 - this.strech}, ${this.strech})`
    }
  },
  methods: {
    rootAnimEnd (ev) {
    }
  }
}
</script>
