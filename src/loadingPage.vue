<template lang="html">
  <p>界面即将跳转,请等待 loading ......{{time}}</p>
</template>

<script>
export default {
  name:"loadingPage",
  data(){
    return{
      time:3,
      timer:''
    }
  },
  methods:{

  },
  mounted(){
  this.timer=setInterval(()=>{
      this.time--;
      if(this.time===0){
        clearInterval(this.timer);
        if(this.$route.params.type==="login"){
          this.$router.push({path:'/login'});
        }else if(this.$route.params.type==="home"){
          console.log("home");
          this.$router.push({path:'/home'});
        }else{
          this.$router.push({path:'/register'});
        }
      }
    },1000)
  },
  destroyed(){
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
p{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
