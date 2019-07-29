<template lang="html">
    <div class="write">
  <div class="write_title">
    <input type="text" name="" value="" placeholder="请输入记事的标题">
  </div>
  <div class="write_content">
    <textarea name="name" rows="8" cols="80" placeholder="请输入要记事主要内容"></textarea>
  </div>
  <div class="cover_wrap">

  </div>
    </div>
</template>
<script>
export default {
  name:'alertContent',
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>

<style lang="css" scoped>
.write{
  position: absolute;
}
.cover_wrap{
  position: fixed;
  background-color: rgb(0, 0, 0);
  width: 100vh;
  height: 100vh;
  z-index: 99;
  opacity: 0.1
}

</style>
