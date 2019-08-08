import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
var username=sessionStorage.getItem('user');
let store =new Vuex.Store({
  state:{
    user:username
  },
  mutations:{
   findUser(state,value){
     state.user=value
   }
  }
})
export default store
