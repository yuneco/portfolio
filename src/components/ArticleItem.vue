<template>
  <div class="article-item-root">
    <div class="image" :style="{
      backgroundImage: `url(${image})`
    }">
      <div class="title-in-image">{{ title }}</div>
    </div>

    <div class="text-contents">
      <div class="title">{{ title }}</div>
      <div class="description">
        <slot></slot>
      </div>
      <div class="link" v-for="link in links" :key="link.href">
        <a :href="link.href" target="_blank">{{link.text}}</a>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/shared-mixin.scss" as mixin;

.article-item-root div {
  box-sizing: border-box;
  // border: 1px solid red;
}
.article-item-root {
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
  background-color: #eafdffad;
  box-shadow: 0px 0px 80px -4px rgba(16, 39, 59, 0.783);
  color: #133344;
  text-align: left;

  .image {
    position: relative;
    width: 40%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 200px;
    @include mixin.sp-screen() {
      width: 100%;
      min-height: 150px;
    }
    .title-in-image {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 80%;
      text-align: right;
      color: #ffffff80;
      font-weight: bold;
      font-size: 26pt;
      line-height: 26pt;
      overflow: hidden;
    }
  }
  .text-contents {
    position: relative;
    width: calc(60% - 20px);
    margin: 0 0 0 20px;
    padding: 10px;
    @include mixin.sp-screen() {
      width: 100%;
      margin: 10px 0 0 0;
    }
    .title {
      font-weight: bold;
      font-size: 14pt;
    }
    .description {
      margin-top: 10px;
      font-size: 10pt;
      line-height: 12pt;
    }
    .link {
      margin-top: 10px;
      font-size: 11pt;
      position: relative;
      &+.link {
        margin-top: 1px;
      }
      a {
        display: block;
        color: #1c3854;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

</style>

<script>
export default {
  name: 'ArticleItem',
  props: {
    title: { type: String, default: 'No Title' },
    link: { type: [Object, Array], default: null },
    image: { type: String, default: null },
    imgPosition: { type: String, default: 'left' }
  },
  computed: {
    links () {
      if (Array.isArray(this.link)) {
        return this.link
      } else if (this.link) {
        return [this.link]
      } else {
        return []
      }
    }
  }
}
</script>
