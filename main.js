// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUi from 'element-ui'
import Router from 'vue-router'
import router from './router/index.js'
Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(Router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
