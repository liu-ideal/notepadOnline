import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
var username=sessionStorage.getItem('user');
var password=sessionStorage.getItem('pass');
let store =new Vuex.Store({
  state:{
    user:username,
    pass:password
  },
  mutations:{
   findUser(state,value){
     state.user=value
   }
  }
})
export default store
