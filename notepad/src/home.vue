<template lang="html">
  <div class="wrap">
    <div class="user_information">
      欢迎你  用户<span>123</span>
    </div>
    <div class="main">
      <div class="new_build_thing">
        <el-button type="primary" icon="el-icon-edit" @click='newnotepad'>新建笔记</el-button>
      </div>
      <div class="thing_list">
        <p v-if='false'>您还没有任何记事，点击上面按钮新建一个吧...</p>
        <ul>
          <li><p>我的第一件记事</p><span><i title="查看笔记" class="iconfont icon-chakan" @click='tolook'></i><i class="iconfont icon-xiugai" title="修改笔记" @click='torevise'></i><i><el-button id='special' class="iconfont icon-shanchu" title="删除笔记" @click='todelate'></el-button></i></span></li>
        </ul>
      </div>
    </div>
<alertContent v-if='toalert' @childValue='childValue' :isdisabled='isdisabled' :isshow='isshow' :isshowtwo='isshowtwo' :title='title' :content='content'/>
  </div>
</template>
<!-- <i class="iconfont icon-shanchu" title="删除笔记" @click='todelate'> -->
<script>
import alertContent from './alertContent'
export default {
  name:'home',
  data(){
    return {
      toalert:true,
      isdisabled:false,//子组件的表单是否禁用
      isshow:true, //子组件的保存取消按钮是否显示
      isshowtwo:false,//子组件关闭按钮是否显示
      title:'',
      content:''
    }
  },
  components:{
    alertContent
  },
  methods:{
  childValue(value){
    this.toalert=value
  },
  newnotepad(){
    this.isshow=true;
    this.isshowtwo=false;
    this.isdisabled=false;
    this.toalert=true
  },
  tolook(){
    this.isshow=false;
    this.isshowtwo=true;
    this.isdisabled=true;
    this.toalert=true;
  },
  torevise(){
    this.isshow=true;
    this.isshowtwo=false;
    this.isdisabled=false;
    this.toalert=true
  },
  todelate(){
    this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {//删除按钮弹出警告
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
  },


},

}
</script>

<style lang="css" scoped>
.wrap{
  width: 70%;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(161, 186, 159);
  position: relative;
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
.main .thing_list li{

}
.main .thing_list li span{
  margin-left: 30px;
}
.main .thing_list li span i{
  font-size: 12px;
  color: rgb(9, 110, 52);
  margin-left: 15px;
  cursor: pointer;
}
#special{
  background-color: rgb(161, 186, 159);
  border: none;
  display: inline;
  color: inherit;
  padding: 0;
  font-size: inherit;
}
.main .thing_list li span i:hover{
  font-size: 13px;
  font-weight: bold;
  color: rgb(10, 56, 250);
}








</style>
