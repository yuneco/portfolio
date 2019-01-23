<template>
  <div class="article-list-root">
    <transition-group appear name="list" tag="div">
      <article-item class="list-item" v-for="(article, index) in articles" :key="article.id"
        :title="article.title"
        :image="article.image"
        :link="article.link"
        :style="{
          transitionDelay: `${index * 500}ms`
        }"
      >
        {{ article.description }}
      </article-item>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<script>
import ArticleItem from './ArticleItem'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    articles: { type: Array, default: () => ([]) }
  },
  data () {
    return {
    }
  }
}
</script>
