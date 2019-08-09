<template lang="html">
  <div class="cover_wrap">
    <div class="write" :class="{active:isactive}">
  <div class="write_title">
    <input type="text" name="" value="" placeholder="请输入记事的标题" maxlength="10" :disabled='isdisabled' v-model='mytitle' @keyup='illegalHandleMytitle'>
  </div>
  <div class="write_content">
    <textarea name="name" placeholder="请输入要记事内容(最多200个字符)" maxlength="200" :disabled='isdisabled' v-model='mycontent' @keyup='illegalHandleMycontent'></textarea>
  </div>
  <div class="sign">
    <span v-if='hidSign' @click='startWrite'>写一个个性签名？</span>
    <i class="clear" v-show='hidRename'>重写</i>
    <canvas id="canvas" width="400" height="140" v-show='canWrite'></canvas>
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
    srcc:''
    }
  },
  methods:{
  tosave(){
    if(!this.mytitle||!this.mycontent){//验证 内容不能为空
      this.open();
      return;
    };
    this.tohid()

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
    setTimeout(()=>{this.isactive=true},100)
  },
  props:[
     'isdisabled','isshow','isshowtwo','title','content'
  ],
  computed:{

  },
  mounted(){
    docanvas('.clear')
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
  bottom: 0;
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
.write .el-row{
  text-align: center;
}
#canvas{
  display: block;
  cursor: url('./bi.png'),auto;
}
</style>
