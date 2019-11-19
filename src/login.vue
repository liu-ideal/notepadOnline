<template>
  <div class="wrap" @click='hidAfterSubmitTips'>
    <el-form label-width="40px" class="demo-ruleForm">
      <p><i class="iconfont icon-zhucedengluyonghuming"></i><span>欢迎登录</span></p>
      <el-form-item label="帐号" prop="pass">
        <el-input type="text" autocomplete="on" placeholder='请输入登录帐号' v-model="login.user" maxlength='12' @blur='checkUser' @focus='lookCheckUser'></el-input>
        <div id='checkUser' v-show='voidUser'>帐号不能为空</div>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" autocomplete="off" placeholder='请输入登录密码' v-model="login.password" maxlength='12' @blur='checkPass' @focus='lookCheckPass'></el-input>
       <div id='checkPassword' v-show='voidPassword'>密码不能为空</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="tologin" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <el-checkbox v-model="login.checked">记住帐号</el-checkbox>
      <div class="afterSubmitTips" v-show='voidSubmit'>{{afterSubmitTips}}</div>
    </el-form>
  <router-link to="/register" class="tologin">还没帐号？点此注册</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data(){
    return{
      fullscreenLoading: false,
       login:{
         user:'',
         password:'',
         checked:false
       },
       voidUser:false,
       voidPassword:false,
       voidSubmit:true,
       afterSubmitTips:''
    }
  },
  methods:{
    open(){
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        });
      },
      openFullScreen() {//这个是ELEMENT 的loading
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
            this.open()
            this.$router.push({path:'/home'})
          }, 500);
        },
    resetForm() {
        this.login.user='';
        this.login.password='';
      },
    checkUser(){
      if(!this.login.user){
        this.voidUser=true
      }
    },
    checkPass(){
      if(!this.login.password){
        this.voidPassword=true
      }
    },
    lookCheckUser(){
      this.voidUser=false
    },
    lookCheckPass(){
      this.voidPassword=false
    },
    tologin(){
      if(!this.login.user||!this.login.password){
        this.voidSubmit=true;
        this.afterSubmitTips='用户名密码不能为空';
        return
      }
      var readydata={
        user:this.login.user,
        password:this.login.password
        // content:'实施的奋斗给过你我哦go诶个欧委会',
        // time:'2019-08-02',
        // img:img
      };
      var data=JSON.stringify(readydata);
      axios.post('./api?login',data).then(res=>{
        var expr=/[\r\n]/g;
        console.log(res)
        if(res.data.replace(expr,'')){
          //进入到这里说明有错误信息了，这个时候应该把错误信息跟新到前端视图
          this.voidSubmit=true;
          this.afterSubmitTips=res.data;
        }else{
          //这里说明登录成功，应该加载LOADING,跳转路由了 还要先对记住帐号做一个处理
          if(this.login.checked){
            localStorage.setItem('user',readydata.user)
          }
          sessionStorage.setItem('user',readydata.user);
          sessionStorage.setItem('pass',readydata.password);
          this.keepUser(readydata.user);//将VUEX中的user更新 以便在home页面使用
          this.openFullScreen();

        }
      })
    },
    hidAfterSubmitTips(){
      this.voidSubmit=false;
    },
    keepUser(b){
      this.$store.commit('findUser',b)
    }
  },
  created(){
    if(localStorage.length){
      this.login.user=localStorage.getItem('user')
    }
  }
}
</script>

<style scoped>
@media screen and (min-width:768px){
  .wrap{
    width: 400px;
    height: 400px;
  }
}
@media screen and (max-width:767px){
  .wrap{
    width: 100%;
    height: 60%;
  }
}
.wrap{
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: orange;
  text-align: center;
  box-sizing: border-box;
  padding: 0 20px;
}
  .wrap p{
    padding: 20px 0;
  }
  .wrap span{
    font-size: 20px;
    font-weight: bold;
    padding-left: 20px;
    vertical-align: text-bottom;
  }
  .wrap .iconfont{
    font-size: 30px;
    color: rgb(247, 250, 255);
  }
.wrap .el-form-item {
    margin-bottom: 40px;
    position: relative;
  }
  .wrap .el-form-item #checkUser,.wrap .el-form-item #checkPassword{
    position: absolute;
    height: 20px;
    top:42px;
    line-height: 20px;
    color: red;
    font-size: 14px;
  }
  .wrap .el-form {
    padding-top: 20px;
  }
  .wrap .tologin {
    color:rgb(47, 88, 231);
    position: absolute;
    bottom: 10px;
    right: 0;
    text-decoration: none;
  }
.wrap .tologin:hover{
    text-decoration: underline;
    color: rgb(122, 21, 76);
  }
  .wrap .el-checkbox{
    display: block;
    margin-top: -15px;
    margin-left: -15px;
  }
  .wrap .afterSubmitTips{
    height: 20px;
    line-height: 20px;
    color: red;
    font-size: 14px;
  }
</style>
