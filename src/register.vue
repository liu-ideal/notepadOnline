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
        title:"注册",
        userholder:"请输入注册的用户名",
        passholder:"请输入注册的密码",
        remenber:false,
        submit:"注册",
        tips:"用户名、密码只能包含数字或字母 且长度小于10",
        changePageTitle:"已有帐号-去登录"
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
          password:password,
          title:'thisispassbutcantdelete'
          // content:'实施的奋斗给过你我哦go诶个欧委会',
          // time:'2019-08-02',
          // img:img
        };
        let data=JSON.stringify(readydata);
        this.axios.post('./api?register',data).then(res=>{
          //console.log(res);
          let expr=/用户名已存在/g;
          if(expr.test(res.data)){//如果后端返回字符串包含了用户名已经存在的信息，则更新相关视图
            this.$alert('用户名已存在', '警告', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `请重新输入用户名`
                  });
                }
              });
          }else{//这里表示注册成功了，应该进行相关操作了
            this.$message({
              type: 'success',
              message: `注册成功 请登录`,
              duration:2000
            });
            this.$router.push({name:'loading',params:{type:"login"}})//跳转到登录页面
          }
        })
      }else{
        return ;
      }
    },
    goLogin(){
      this.$message({
        message: `请输入登录用户名和密码`,
        duration:2000
      });
     this.$router.push({path:"/login"})
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
