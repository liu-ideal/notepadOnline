<template lang="html">
  <div class="wrap">
    <div class="user_information">
      欢迎你  用户<span>123</span>
    </div>
    <div class="main">
      <div class="new_build_thing">
        <el-button type="primary" icon="el-icon-edit">新建</el-button>
      </div>
      <div class="thing_list">
        <p v-if='false'>您还没有任何记事，点击上面按钮新建一个吧...</p>
        <ul>
          <li><p>我的第一件记事</p><span><i class="iconfont icon-chakan"></i><i class="iconfont icon-xiugai"></i><i class="iconfont icon-shanchu"></i><i class="iconfont icon-shengxu"></i></span></li>
        </ul>
      </div>
    </div>
<alertContent v-if='false'/>
  </div>
</template>

<script>
import alertContent from './alertContent'
export default {
  name:'home',
  components:{
    alertContent
  }
}
</script>

<style lang="css" scoped>
.wrap{
  width: 70%;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(161, 186, 159);
}
.user_information{
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgb(130, 121, 129);
  padding-left: 50px;
}
.user_information span{
  font-size: 18px;
  font-weight: bold;
}
.main{
  padding: 30px 15px
}
.main .new_build_thing{

}
.main .thing_list{
  margin-top: 50px;
}
.main .thing_list p{
  display: inline;
}
.main .thing_list p span{
  
}










</style>
