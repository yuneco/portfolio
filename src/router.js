import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TopView from './views/TopView.vue'
import GalleryView from './views/GalleryView.vue'
import AppsAndPgView from './views/AppsAndPgView.vue'
import ContactView from './views/ContactView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/test',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'topView',
      component: TopView
    },
    {
      path: '/gallery',
      name: 'galleryView',
      component: GalleryView
    },
    {
      path: '/apps',
      name: 'appsAndPgView',
      component: AppsAndPgView
    },
    {
      path: '/contact',
      name: 'contactView',
      component: ContactView
    }
  ]
})
