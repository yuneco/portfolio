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
          id: 'apps-mezash',
          title: 'ネコ🐱メザシ🐟アタック',
          description: 'ネコの日に合わせて20時間ほどでスピート開発したシューティング・ミニケームです。SVGとVue.jsを使い、ゲーム用の描画ライブラリを一切利用せずに作られています。',
          link: [
            { href: 'https://mezashiattack.firebaseapp.com', text: 'https://mezashiattack.firebaseapp.com' },
            { href: 'https://qiita.com/yuneco/items/34daf063075d03c4eede', text: 'Qiita解説記事：VueとSVGを使ってシューティングゲーム『ネコ🐱メザシ🐟アタック🌟』を作ったのでソースと解説' },
            { href: 'https://github.com/yuneco/mezashi', text: 'ソース(GitHub)' }
          ],
          image: '/img/mezashi.png'
        },
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
          id: 'apps-ebako',
          title: '絵箱',
          description: '絵箱はMac用のフリーの画像ビューアです。標準アプリのようなシンプルでわかりやすいUIで、画像をサムネイルで一覧したり簡単な編集を行ったりすることができます。2019年に64bit・Retina・Mojaveダークモード等、最新の環境に対応する新バージョン(ver5)をリリースしました。',
          link: [
            { href: 'http://nekobooks.com/main/ebako/', text: 'http://nekobooks.com/main/ebako/' }
          ],
          image: '/img/ebako.jpg'
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
