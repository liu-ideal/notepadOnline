// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUi from 'element-ui'
import Router from 'vue-router'
import router from './router/index.js'
import Vuex from 'vuex'
import store from './store/store.js'
import axios from 'axios'
Vue.config.productionTip = true
Vue.prototype.axios=axios
Vue.use(ElementUi)
Vue.use(Router)
Vue.use(Vuex)
router.beforeEach((to,from,next)=>{//全局守卫实现未登录拦截
  if(to.meta.requireAuth){
      var readydata={
        user:localStorage.getItem("username")
        // content:'实施的奋斗给过你我哦go诶个欧委会',
        // time:'2019-08-02',
        // img:img
      };
      let data=JSON.stringify(readydata);
      let token=localStorage.getItem("tokenid");
      if(token){
        axios.post('./api?token',data,{headers:{'tokenid':token}}).then(res=>{
          //let expr=/[\r\n]/g;
          let expr=/homeok/g;
          if(!expr.test(res.data)){
            //进入到这里说明登录信息无效，这个时候应该跳转到登录页面
           next({path:'/login'})
          }else{
            //这里说明登录信息有效 跳转路由了
          next()
          }
        })
      }else{
        next({path:'/login'})
      }
  }else{
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
