import Vue from 'vue'
import Router from 'vue-router'
import DebugHome from './pages/DebugHome.vue'
import TopView from './pages/TopView.vue'
import GalleryView from './pages/GalleryView.vue'
import AppsAndPgView from './pages/AppsAndPgView.vue'
import InfoView from './pages/InfoView.vue'
import ContactView from './pages/ContactView.vue'
import TestView from './pages/TestView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // OGP Redirect //
      path: '/_gallery/:filename',
      redirect: '/gallery/:filename'
    },
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
      component: () => import(/* webpackChunkName: "admin-group" */ './admin/pages/ImgUploader.vue')
    },
    {
      path: '/adm/patch',
      name: 'AdminTmpPatch',
      component: () => import(/* webpackChunkName: "admin-group" */ './admin/pages/TmpPatch.vue')
    }
  ]
})
