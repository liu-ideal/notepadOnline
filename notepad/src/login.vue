<template>
  <div class="wrap">
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
        <el-button type="primary" @click="">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <el-checkbox v-model="login.checked">记住帐号</el-checkbox>
    </el-form>
  <router-link to="/register" class="tologin">还没帐号？点此注册</router-link>
  </div>
</template>

<script>
export default {
  name: 'register',
  data(){
    return{
       login:{
         user:'',
         password:'',
         checked:false
       },
       voidUser:false,
       voidPassword:false
    }
  },
  methods:{
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
  .el-form-item {
    margin-bottom: 40px;
    position: relative;
  }
  .el-form-item #checkUser,.el-form-item #checkPassword{
    position: absolute;
    height: 20px;
    top:42px;
    line-height: 20px;
    color: red;
    font-size: 14px;
  }
  .el-form {
    padding-top: 20px;
  }
  .tologin {
    color:rgb(47, 88, 231);
    position: absolute;
    bottom: 10px;
    right: 0;
    text-decoration: none;
  }
  .tologin:hover{
    text-decoration: underline;
    color: rgb(122, 21, 76);
  }
  .el-checkbox{
    display: block;
    margin-top: -15px;
    margin-left: -15px;
  }
</style>
