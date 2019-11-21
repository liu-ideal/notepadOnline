<template lang="html">
  <div class="cover_wrap">
    <div class="write" :class="{active:isactive}">
  <div class="write_title">
    <input type="text" name="" value="" placeholder="请输入记事的标题" maxlength="15" :disabled='isdisabled' v-model='mytitle' @keyup='illegalHandleMytitle'>
  </div>
  <div class="write_content">
    <textarea name="name" placeholder="请输入要记事内容(最多200个字符)" maxlength="200" :disabled='isdisabled' v-model='mycontent' @keyup='illegalHandleMycontent'></textarea>
  </div>
  <div class="sign">
    <div v-show='toshow'>
      <span v-if='hidSign' @click='startWrite'>写一个个性签名？</span>
      <i class="clear" v-show='hidRename'>重写</i>
      <canvas id="canvas" width="400" height="140" v-show='canWrite'></canvas>
    </div>
    <img :src="srcData" v-show='isshowtwo'/>
  </div>
  <el-row>
<el-button type="info" plain size='small' @click='tosave' v-show='isshow'>保存</el-button>
<el-button type="info" plain size='small' @click='tohid' v-show='isshow'>取消</el-button>
<el-button type="info" plain size='small' @click='tohid' v-show='isshowtwo'>关闭</el-button>
</el-row>
    </div>
  </div>
</template>
<script>
import docanvas from './docanvas_module.js' //引入canvas模块
import axios from 'axios'
export default {
  name:'alertContent',
  data(){
    return {
    isactive:false,
    mytitle:this.title,
    mycontent:this.content,
    hidSign:true,
    hidRename:false,
    canWrite:false,
    srcData:this.srcImfor,
    lookImg:false,
    parentDate:this.parentDATE
    }
  },
  methods:{
  tosave(){//保存按钮
    if(!this.mytitle||!this.mycontent){//验证 内容不能为空
      this.open();
      return;
    };
    //对要输出的时间做一个处理
    var datee=new Date();
    var year=datee.getFullYear().toString();
    var month=datee.getMonth()+1;
    var day=datee.getDate().toString().length==1?0+datee.getDate().toString():datee.getDate().toString();
    var hour=datee.getHours().toString().length==1?0+datee.getHours().toString():datee.getHours().toString();
    var minute=datee.getMinutes().toString().length==1?0+datee.getMinutes().toString():datee.getMinutes().toString();
    var time=`${year}-${month}-${day} ${hour}:${minute}`;
    if(this.neworrevise==='isNew'){
      for(var k=0;k<this.parentDate.length;k++){//验证标题不能相同
        if(this.parentDate[k].title===this.mytitle){
            this.open4();
            return
        }
      }
      var exppr=/\+/g;
      var imger=docanvas.srcData.replace(exppr,'%2B');//这么处理是因为后端会自动把里面的加号去掉 必须把加号保留
      var readydata={
        user:this.$store.state.user,
        title:this.mytitle,
        content:this.mycontent,
        time:time,
        img:imger
      };
      var data=JSON.stringify(readydata);
      axios.post('./api?add',data).then(res=>{
        var expr=/[\r\n]/g;
        if(res.data.replace(expr,'')){
          //进入到这里说明有错误信息了，这个时候应该把错误信息跟新到前端视图
          //console.log(res.data);
        }else{
          //这里说明新建数据成功，做个消息提示用户就行了
          //console.log('newdate');
          //this.$emit('myregetdata');//这里是告诉父组件需要重新请求数据了
          this.$emit('myregetdata');
       this.open2()
        }
      })
      docanvas.srcData='';

    }
    if(this.neworrevise==='isRevise'){
      for(var k=0;k<this.parentDate.length;k++){//验证标题不能相同
        if(this.parentDate[k].title===this.title){continue}
        if(this.parentDate[k].title===this.mytitle){
            this.open4();
            return
        }
      }
      var readydata={
        user:this.$store.state.user,
        oldTitle:this.title,
        title:this.mytitle,
        time:time,
        content:this.mycontent
      };
      var data=JSON.stringify(readydata);
      axios.post('./api?update',data).then(res=>{
        var expr=/[\r\n]/g;
        if(res.data.replace(expr,'')){
          //进入到这里说明有错误信息了，这个时候应该把错误信息跟新到前端视图
          //console.log(res);
        }else{
          //这里说明新建数据成功，做个消息提示用户就行了
          //console.log('update');
          //this.$emit('myregetdata');//这里是告诉父组件需要重新请求数据了

       this.open3();
       this.$emit('myregetdata');
        }
      });

    }

    this.tohid();
    //---------------------

  },
  tohid(){
    this.isactive=false;
    setTimeout(()=>{this.$emit('childValue',false)},200)
  },
  open() {//弹框
        this.$alert('标题与内容均不能为空', '无效提交', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `请输入标题/内容`
            });
          }
        });
      },
      open2(){
          this.$message({
            message: '笔记添加成功',
            type: 'success'
          });
        },
        open3(){
            this.$message({
              message: '笔记修改成功',
              type: 'success'
            });
          },
          open4() {//弹框
                this.$alert('标题不能与现有的重复', '无效提交', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `请输入不同的标题`
                    });
                  }
                });
              },
  illegalHandleMytitle() {//处理非法输入，直接替换为空
    let rexp=/[<>]/g;
    this.mytitle=this.mytitle.replace(rexp,'')
  },
  illegalHandleMycontent() {//处理非法输入，直接替换为空
    let rexp=/[<>]/g;
    this.mycontent=this.mycontent.replace(rexp,'')
  },
  startWrite(){
    this.hidSign=false;
    this.canWrite=true;
    this.hidRename=true;
  }
  },
  created:function(){
    setTimeout(()=>{this.isactive=true},100);
  },
  props:[
     'isdisabled','isshow','toshow','isshowtwo','title','content','srcImfor','neworrevise','parentDATE'
  ],
  computed:{

  },
  mounted(){
    docanvas.writeCanvas('.clear')//这里是原生事件绑定
  }
}
</script>

<style lang="css" scoped>
.cover_wrap{
  position: absolute;
  background-color: rgba(0, 0, 0,0.5);
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  z-index: 99;

}
.write{
  position: absolute;
  z-index: 100;
  width: 0px;
  height: 0px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin:auto;
  background-color: rgb(255, 255, 251);
  transition: all 0.2s;
  overflow: hidden;
}
.write.active{
  width: 400px;
  height: 400px;
}
.write .write_title{
  width: 100%;
  height: 10%;
}
.write .write_title input{
  width: 100%;
  border: none;
  height: 100%;
  line-height: 100%;
  text-indent: 15px;
  background-color: #fff;
}
.write .write_content{
  width: 100%;
  height: 42%;
  margin-top: 10px;
}
.write .sign{
  width: 100%;
  height: 37%;
  position: relative;
}
.write .sign img{
  display: block;
  height: 100%;
}
.write .sign span{
  position: absolute;
  width: 140px;
  height: 20px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin:auto;
  color: rgba(123, 176, 135,0.6);
  cursor: pointer;
}
.write .sign span:hover{
  color: rgb(8, 144, 79);
}
.write .sign .clear{
  position: absolute;
  bottom: -8px;
  right: 13px;
  z-index: 2;
  font-size: 14px;
  color: rgb(154, 150, 150);
  cursor: pointer;
}
.write .write_content textarea{
  width: 100%;
  height: 100%;
  text-indent: 12px;
  resize: none;
  border: none;
  background-color: #fff;

}
.cover_wrap .write .el-row{
  text-align: center;
}
#canvas{
  display: block;
  cursor: url('./bi.png'),auto;
}
</style>
