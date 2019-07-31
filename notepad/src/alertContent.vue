<template lang="html">
  <div class="cover_wrap">
    <div class="write" :class="{active:isactive}">
  <div class="write_title">
    <input type="text" name="" value="" placeholder="请输入记事的标题" maxlength="10">
  </div>
  <div class="write_content">
    <textarea name="name" placeholder="请输入要记事内容" maxlength="120"></textarea>
  </div>
  <el-row>
<el-button type="info" plain size='small' @click='tohid'>保存</el-button>
<el-button type="info" plain size='small' @click='tohid'>取消</el-button>
</el-row>
    </div>
  </div>
</template>
<script>
export default {
  name:'alertContent',
  data(){
    return {
    isactive:false
    }
  },
  methods:{
  tohid(){
    this.isactive=false;
    setTimeout(()=>{this.$emit('childValue',false)},200)
  }
  },
  created:function(){
    setTimeout(()=>{this.isactive=true},10)
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
}
.write .write_content{
  width: 100%;
  height: 75%;
  margin-top: 5%;
}
.write .write_content textarea{
  width: 100%;
  height: 100%;
  text-indent: 12px;
  resize: none;
  border: none;

}
.write .el-row{
  text-align: center;
}
</style>
