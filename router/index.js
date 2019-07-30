import Router from 'vue-router';
import register from '../register';
import login from '../login';

let router = new Router({
  routes:[
    {path: '*', redirect: '/register'},
    {path:'/register',component:register},
     {path:'/login',component:login}
  ]
});
export default router
