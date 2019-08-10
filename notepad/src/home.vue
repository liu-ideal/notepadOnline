<template lang="html">
  <div class="wrap">
    <div class="user_information">
      欢迎你  用户 <span>{{this.$store.state.user}}</span>
    </div>
    <div class="main">
      <div class="new_build_thing">
        <el-button type="primary" icon="el-icon-edit" @click='newnotepad'>新建笔记</el-button>
      </div>
      <div class="thing_list">
        <p v-if='noOne'>您还没有任何记事，点击上面按钮新建一个吧...</p>
        <ul>
          <li v-for='(item,index) in mydata'><p>{{item.title}}</p><span><i title="查看笔记" class="iconfont icon-chakan" @click='tolook(index)'></i><i class="iconfont icon-xiugai" title="修改笔记" @click='torevise'></i><i><el-button id='special' class="iconfont icon-shanchu" title="删除笔记" @click='todelate(index)'></el-button></i></span><span class="dateSpan">{{item.time}}</span></li>
        </ul>
      </div>
    </div>
<alertContent v-if='toalert' @childValue='childValue' :isdisabled='isdisabled' :isshow='isshow' :toshow='toshow' :isshowtwo='isshowtwo' :title='title' :content='content' @myRegetData='myRegetData' :srcImfor='toChildSrc'/>
  </div>
</template>
<script>
import alertContent from './alertContent'
import axios from 'axios'
export default {
  name:'home',
  data(){
    return {
      noOne:false,
      toalert:false,
      isdisabled:false,//子组件的表单是否禁用
      isshow:true, //子组件的保存取消按钮是否显示
      isshowtwo:false,//子组件关闭按钮是否显示
      title:'',
      content:'',
      mydata:[],
      regetData:false,
      toChildSrc:'',
      toshow:true,
    }
  },
  watch:{
    mydata:function(val,oldVal){
      if(!val.length){
        this.noOne=true
      }else {
        this.noOne=false
      }
    },
    regetData:function(val,oldVal){
      if(this.regetData===true){
        this.getDataFrom();
        this.regetData=false
      }
    }
  },
  components:{
    alertContent
  },
  methods:{
  getDataFrom(){
      var readydata={
        user:this.$store.state.user
        // content:'实施的奋斗给过你我哦go诶个欧委会',
        // time:'2019-08-02',
        // img:img
      };
      var data=JSON.stringify(readydata);
      axios.post('http://localhost:82/query_all.php','data='+data).then(res=>{
          if(!(res.data instanceof Array)){
          }else{
            this.mydata.length=0;
            if(res.data.length>20){res.data.length=20}//只展示20条数据
            for(var i=1;i<res.data.length;i++){
              this.mydata.push(res.data[i])
              console.log(this.mydata);
            }
          }

      })
  },
  myRegetData(value){
    this.regetData=value
  },
  childValue(value){
    this.toalert=value
  },
  newnotepad(){
    this.isshow=true;
    this.toshow=true;
    this.isshowtwo=false;
    this.isdisabled=false;
    this.toalert=true
  },
  tolook(index){
    this.isshow=false;
    this.toshow=false;
    this.isshowtwo=true;
    this.isdisabled=true;
    this.toalert=true;
    this.title=this.mydata[index].title;
    this.content=this.mydata[index].content;
    this.toChildSrc=this.mydata[index].img
  },
  torevise(){
    this.toshow=false;
    this.isshow=true;
    this.isshowtwo=false;
    this.isdisabled=false;
    this.toalert=true
  },
  todelate(index){

    this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {//删除按钮弹出警告
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //这里处理删除逻辑
                 var readydata={
                user:this.$store.state.user,
                title:this.mydata[index].title
              };
              var data=JSON.stringify(readydata);
              axios.post('http://localhost:82/delate.php','data='+data).then(res=>{
              //console.log(res);
              this.getDataFrom();
              });
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
beforeCreate(){

},
created(){
  //这里要获取来自后端传过来的数据进行展示
  this.getDataFrom()
  if(this.mydata.length==0){
    this.noOne=true
  }else{
    this.noOne=false
  }
}
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
margin-top: 20px;
font-size: 17px;
color: rgb(73, 77, 76);
}
.main .thing_list li span{
  margin-left: 60px;
}
.main .thing_list .dateSpan{
  font-size: 12px;
  color: rgb(44, 43, 47)
}
.main .thing_list li span i{
  font-size: 14px;
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
