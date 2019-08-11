<template>
  <div class="wrap" @click='hidAfterSubmitTips'>
    <el-form label-width="40px">
      <p><i class="iconfont icon-yonghuzhuce"></i><span>用户注册</span></p>
      <el-form-item label="帐号" prop="pass">
        <el-input type="text" autocomplete="on" placeholder='请输入注册帐号' v-model="register.user" maxlength='12' @blur='checkUser' @focus='lookCheckUser'></el-input>
          <div id='checkUserr' v-show='voidUser'>{{userTips}}</div>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" autocomplete="off" placeholder='请输入注册密码' v-model="register.password" @blur='checkPass' maxlength='12' @focus='lookCheckPass'></el-input>
        <div id='checkPasswordd' v-show='voidPassword'>{{passTips}}</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="toRegister" v-loading.fullscreen.lock="fullscreenLoading">注册</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="afterSubmitTips" v-show='voidSubmit'>{{afterSubmitTips}}</div>
   <router-link to="/login" class="tologin">已有帐号，点此登录</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data(){
    return{
      fullscreenLoading: false,
       register:{
         user:'',
         password:''
       },
       voidUser:false,
       voidPassword:false,
       voidSubmit:true,
       userTips:'',
       passTips:'',
       afterSubmitTips:''
    }
  },
  methods:{
    openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.open();
          this.$router.push({path:'/login'})//跳转到登录页面
        }, 500);
      },
    open(){
        this.$message({
          message: '恭喜你，注册成功-请登录',
          type: 'success'
        });
      },
    resetForm() {
        this.register.user='';
        this.register.password='';
      },
      checkUser(){
        if(!this.register.user){
          this.voidUser=true;
          this.userTips='用户名不能为空'
        }
        if(this.register.user.indexOf(' ')!=-1){
          this.voidUser=true;
          this.userTips='用户名不能包含空格'
        }
      },
      checkPass(){
        if(!this.register.password){
          this.voidPassword=true;
          this.passTips='密码不能为空'
        }
        if(this.register.password.indexOf(' ')!=-1){
          this.voidPassword=true;
          this.passTips='密码不能包含空格'
        }
      },
      lookCheckUser(){
        this.voidUser=false
      },
      lookCheckPass(){
        this.voidPassword=false
      },
      toRegister(){
        //首先对用户输入信息要求不能为空和包含空格
        if(!this.register.user||!this.register.password||(this.register.user.indexOf(' ')!=-1)||(this.register.password.indexOf(' ')!=-1)){
          this.voidSubmit=true;
          this.afterSubmitTips='用户名或密码不合法';
          return
        }
  var readydata={
    user:this.register.user,
    password:this.register.password,
    title:'thisispassbutcantdelete'
    // content:'实施的奋斗给过你我哦go诶个欧委会',
    // time:'2019-08-02',
    // img:img
  };
  var data=JSON.stringify(readydata);
        //然后向后端发送AJAX请求
  axios.post('http://localhost:82/register.php','data='+data).then(res=>{
    var expr=/用户名已存在/g;
    if(expr.test(res.data)){//如果后端返回字符串包含了用户名已经存在的信息，则更新相关视图
      this.voidSubmit=true;
      this.afterSubmitTips='用户名已存在';
    }else{//这里表示注册成功了，应该进行相关操作了
      this.openFullScreen();//loading动画 并跳转页面
    }
  })
      },
      hidAfterSubmitTips(){
        this.voidSubmit=false;
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
  .el-form-item #checkUserr,.el-form-item #checkPasswordd{
    position: absolute;
    height: 20px;
    top:42px;
    line-height: 20px;
    color: red;
    font-size: 14px;
  }
  .afterSubmitTips{
    height: 20px;
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

</style>
