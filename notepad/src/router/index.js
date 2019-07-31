import Router from 'vue-router';
import register from '../register';
import login from '../login';
import home from '../home';
let router = new Router({
  routes:[
    {path: '*', redirect: '/register'},
    {path:'/register',component:register},
     {path:'/login',component:login},
     {path:'/home',component:home}
  ]
});
export default router
