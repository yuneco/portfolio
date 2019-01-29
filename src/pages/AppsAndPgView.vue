<template>
  <div class="apps-and-pg-view">
    <article-list :articles="articlesSource"></article-list>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
export default {
  name: 'AppAndPgView',
  components: { ArticleList },
  data () {
    return {
      articlesSource: [
        {
          id: 'apps-colorinco',
          title: 'Colorinco',
          description: `ColorincoはTwitterに投稿した画像やお気に入りした画像からカラーパレットを表示・ストックできる無料のアプリです。
          フロントはVuejs、サーバサイド（TwitterAPI連携・OGP動的生成）にFirebase Functionsを利用しています。`,
          link: 'https://colorinco.nekobooks.com',
          image: '/img/colorinco-ogp.png'
        },
        {
          id: 'apps-nekobooks',
          title: 'Nekobooks',
          description: 'ポートフォリオサイトです。VuejsとSVGを使用したスムーズなアニメーションとFirebaseの各機能（Hosting / Auth / CloudStorage / CloudFirestore / Functions）を活用して構築しています',
          link: 'https://pf.nekobooks.com',
          image: '/img/nekobooks.png'
        }
      ]
    }
  }
}
</script>
