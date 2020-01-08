<template lang="html">
  <Mytest :option="options"></Mytest>
</template>

<script>
import Mytest from "./mytest.vue"
export default {
  name:"fff",
  data(){
    return{
      options:{
        title:"注册",
        userholder:"请输入注册的用户名",
        passholder:"请输入注册的密码",
        remenber:false,
        submit:"注册"
      }
    }
  },
  components:{
    Mytest
  }
}
</script>

<style lang="scss" scoped>
</style>
