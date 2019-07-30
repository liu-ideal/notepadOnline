<template>
  <div class="wrap">
    <el-form label-width="40px">
      <p><i class="iconfont icon-yonghuzhuce"></i><span>用户注册</span></p>
      <el-form-item label="帐号" prop="pass">
        <el-input type="text" autocomplete="on" placeholder='请输入注册帐号'></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" autocomplete="off" placeholder='请输入注册密码'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="">注册</el-button>
        <el-button @click="">重置</el-button>
      </el-form-item>
    </el-form>
   <router-link to="/login" class="tologin">已有帐号，点此登录</router-link>
  </div>
</template>

<script>
export default {
  name: 'register',
  data(){
    return{

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
