import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
// require('./assets/shared-mixin.scss')
import 'whatwg-fetch'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'production') {
  // activate GA only under the release env
  Vue.use(VueAnalytics, {
    id: 'UA-132808407-1',
    router
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
