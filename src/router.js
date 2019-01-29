import Vue from 'vue'
import Router from 'vue-router'
import DebugHome from './views/DebugHome.vue'
import TopView from './views/TopView.vue'
import GalleryView from './views/GalleryView.vue'
import AppsAndPgView from './views/AppsAndPgView.vue'
import InfoView from './views/InfoView.vue'
import ContactView from './views/ContactView.vue'
import TestView from './views/TestView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/cnfy',
      name: 'debug-home',
      component: DebugHome
    },
    {
      path: '/',
      name: 'topView',
      component: TopView
    },
    {
      path: '/gallery',
      name: 'galleryViewRoot',
      component: GalleryView
    },
    {
      path: '/gallery/:filename',
      name: 'galleryViewItem',
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
    },
    {
      path: '/info',
      name: 'infoView',
      component: InfoView
    },
    {
      path: '/test2',
      name: 'testView',
      component: TestView
    },
    {
      path: '/adm/upload',
      name: 'AdminUploadImage',
      component: () => import(/* webpackChunkName: "admin-group" */ './admin/views/ImgUploader.vue')
    },
    {
      path: '/adm/patch',
      name: 'AdminTmpPatch',
      component: () => import(/* webpackChunkName: "admin-group" */ './admin/views/TmpPatch.vue')
    }
  ]
})
