import Router from 'vue-router';
import register from '../register';
import login from '../login';
import home from '../home';
import loading from '../loadingPage';
let router = new Router({
    routes:[
    {path: '*', redirect: '/register'},
    {path:'/register',name:'register',component:register},
     {path:'/login',name:'login',component:login},
     {
       path:'/home',
       name:'home',
     component:home,
     meta:{
       requireAuth:true
     }
   },
   {
     path:"/loading",name:"loading",component:loading
   }
  ]
});
export default router
