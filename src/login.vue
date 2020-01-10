<template lang="html">
    <commonlogin :option="options" :verify="toVerify" :submit="toSubmit" :changePage="goLogin"></commonlogin>
</template>

<script>
import commonlogin from "./commonlogin.vue"
export default {
  name:"fff",
  data(){
    return{
      options:{
        title:"登录",
        userholder:"请输入登录用户名",
        passholder:"请输入登录密码",
        remenber:true,
        submit:"登录",
        tips:"用户名、密码只能包含数字或字母 且长度小于10",
        changePageTitle:"前往注册"
      }
    }
  },
  components:{
    commonlogin
  },
  methods:{
    toVerify(username,password){
      let isOk=this.onlyNumLetter(username)&&this.onlyNumLetter(password)&&username&&password&&username.length<10&&password.length<10;
      if(isOk){
        return true
      }else{
        return false
      }
    },
    toSubmit(username,password){
      if(this.toVerify(username,password)){
        let readydata={
          user:username,
          password:password
        };
        let data=JSON.stringify(readydata);
        this.axios.post('./api?login',data).then(res=>{
          //var expr=/[\r\n]/g;
          //let expr=/tokenid/g;
          if(!(typeof res.data==="object")){
            //进入到这里说明有错误信息了，这个时候应该把错误信息跟新到前端视图
            this.$alert('用户名或密码错误', '警告', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `请重新输入用户名和密码`
                  });
                }
              });
          }else{
            //这里说明登录成功，应该加载LOADING,跳转路由了 还要先对记住帐号做一个处理
            // if(this.login.checked){
            //   localStorage.setItem('user',readydata.user)
            // }
            // sessionStorage.setItem('user',readydata.user);
            // sessionStorage.setItem('pass',readydata.password);
            localStorage.setItem("tokenid",res.data.tokenid);
            localStorage.setItem("username",readydata.user);
            this.$store.commit('findUser',readydata.user);//将VUEX中的user更新 以便在home页面使用
            this.$message({
              type: 'success',
              message: `登录成功`,
              duration:2000
            });
            this.$router.push({name:'loading',params:{ type: "home" }})//跳转到登录页面

          }
        })
      }else{
        return ;
      }
    },
    goLogin(){
      this.$message({
        message: `请输入注册用户名和密码`,
        duration:2000
      });
     this.$router.push({path:"/register"})
    },
    onlyNumLetter(value){
      let exp=/[^0-9|a-z|A-Z]/;
      return !exp.test(value);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
