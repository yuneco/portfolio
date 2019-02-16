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
          link: [
            { href: 'https://colorinco.nekobooks.com', text: 'https://colorinco.nekobooks.com' },
            { href: 'https://qiita.com/yuneco/items/5e526464939082862f5d', text: 'Qiita解説記事：FirebaseとVue.jsでSPAのOGP画像の動的生成' }
          ],
          image: '/img/colorinco-ogp.png'
        },
        {
          id: 'apps-nekobooks',
          title: 'Nekobooks',
          description: 'ポートフォリオサイトです。VuejsとSVGを使用したスムーズなアニメーションとFirebaseの各機能（Hosting / Auth / CloudStorage / CloudFirestore / Functions）を活用して構築しています。解説記事がQiitaのデイリー/週間トレンドのトップに載りました！',
          link: [
            { href: 'https://pf.nekobooks.com', text: 'https://pf.nekobooks.com' },
            { href: 'https://qiita.com/yuneco/items/b14a695a060c96309239', text: 'Qiita解説記事：VueとFirebaseの基本機能全部使ってぬるぬる動くポートフォリオサイトを作ったのでソースと解説' }
          ],
          image: '/img/nekobooks.png'
        }
      ]
    }
  }
}
</script>
