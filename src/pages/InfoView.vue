<template>
  <div class="info-view">
    <profile-icon class="pf-icon" icon-src="/img/yuneco-icon.jpg" :size="130"></profile-icon>

    <div class="articles">
      <transition appear name="slide-r">
        <article-item class="about"
          title="Welcome to Nekobooks"
          image="/img/profile.jpg"
        >
          <p>
            Nekobooksはイラストレーター・UXエンジニア・開発者の「ゆき」が開発・運営する個人サイトです。
            ほっこりする、可愛くてちょっと不思議な世界を表現するため、技術とデザインを融合して様々な手法でアウトプットしています。
          </p>
          <p>
            このサイトでは「ゆき」の個人名義での活動・制作をご紹介しています。
            お仕事のご相談も承っております。お気軽にご相談ください。
          </p>
        </article-item>
      </transition>

      <transition appear name="slide-l">
        <article-item class="illust"
          title="Illiustration and Design Skills"
          image="/img/painter.jpg"
          img-position="right"
        >
          <ul>
            <li>Painting: CorelPainter / Procreate(iPad)</li>
            <li>Design: Adobe Illustrator / Photoshop</li>
          </ul>
          <p>
            Corel Painter MasterとしてペイントソフトPainterの普及活動を地味に推進中。
            最近では主な制作環境をiPad proに移し、Procreateを併用しています。
          </p>
        </article-item>
      </transition>

      <transition appear name="slide-r">
        <article-item class="develop"
          title="Development Skills"
          image="/img/develop.jpg"
        >
          <ul>
            <li>Front: JavaScript(ES2015+) / FW(Vue.js, Riot.js) / CSS(Sass)</li>
            <li>ServerSide: Node.js / Java / Cloud(Firebase, AWS)</li>
            <li>Detabase: Firebase(RealtimeDB, CloudFirestore) / MongoDB / PostgreSQL</li>
            <li>Desktop: Xojo</li>
            <li>資格：基本情報 / ソフトウェア開発技術者 / ネットワークスペシャリスト / セキュリティスペシャリスト</li>
          </ul>
          <p>
            UI・UXと合わせた素早いプロトタイピングを得意としています。
            最近はモダンJSを中心にBaaSを活用した高速開発を主に推進しています。
            少し前まではJavaEE環境の典型的なエンプラWebシステム開発もやっていました。
          </p>
        </article-item>
      </transition>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.slide-r-enter-active, .slide-r-leave-active {
  transition: all 1s;
}
.slide-r-enter, .slide-r-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
.slide-l-enter-active, .slide-l-leave-active {
  transition: all 1s;
}
.slide-l-enter, .slide-l-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

ul {
  padding-left: 25px;
}

.pf-icon {
    margin: 30px auto;
    position: relative;
    z-index: 10;
  }
  .articles{
    position: relative;
    left: 0px;
    top: 0px;
    @include sp-screen() {
      top: -70px;
    }
  }
  // article cards //
  .about {
    position: relative;
    margin: 25px 10px;
    z-index: 3;
    transition-delay: 0ms
  }
  .illust {
    position: relative;
    margin: 25px 10px;
    z-index: 2;
    transition-delay: 500ms
  }
  .develop {
    position: relative;
    margin: 25px 10px;
    z-index: 1;
    transition-delay: 1000ms
  }
</style>

<script>
import ProfileIcon from '@/components/ProfileIcon'
import ArticleItem from '@/components/ArticleItem'
export default {
  name: 'InfoView',
  components: { ProfileIcon, ArticleItem }
}
</script>
