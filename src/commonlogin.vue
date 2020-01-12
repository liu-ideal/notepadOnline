<template lang="html">
<div class="wrap">
  <div class="wrap_wrap">
  <div class="wrap_inner">
    <h4>{{option.title}}</h4>
    <div class="username">
      <p>Username:</p>
        <input type="text" name="" v-model="username" :placeholder="option.userholder" @keyup="verify(username,password)">
    </div>
    <div class="password">
      <p>Password:</p>
        <input type="password" name="" v-model="password" :placeholder="option.passholder" @keyup="verify(username,password)" @keyup.enter="submit(username,password)">
    </div>
    <div class="verify_tips">
        {{!verify(username,password)?option.tips:""}}
    </div>
    <div class="remenber_submit">
        <div class="remenber" v-if="option.remenber">
          <label><input type="checkbox" name="" value="" v-model="remenber">记住用户名</label>
        </div>
        <div class="submit">
          <button type="button" name="button" @click="submit(username,password)">{{option.submit}}</button>
        </div>
    </div>
    </div>
  </div>
<p class="changePage" @click="changemyPage">{{option.changePageTitle}}</p>
</div>
</template>
<script>
export default {
  name:"commonlogin",
  props:["option","verify","submit","changePage","receiveRemenber"],
  data(){
    return{
      username:"",
      password:"",
      remenber:false
    }
  },
  computed:{
    changemyPage(){
      if(this.changePage){
        return this.changePage
      }else{
        return function(){

        }
      }
    }
  },
  watch:{
    remenber(value){
      this.receiveRemenber(value);
    },
    "option.defaultUser"(value){
      this.username=value;
    }
  }


}
</script>

<style lang="scss" scoped>
.wrap{
  width: 500px;
  height: 350px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-55%);
  border: 1px solid rgba(148, 145, 145, 0.8);
  border-radius: 5px;
  color: rgb(60, 60, 60);
  &:hover{
    border: 1px solid rgba(103, 103, 103, 1);
    box-shadow: 0 0 2px rgb(89, 89, 89);
  }
  .changePage{
    position: absolute;
    bottom: 3%;
    right: 5%;
    color: red;
    font-size: 15px;
    cursor: pointer;
  }
  .wrap_wrap{
    width: 494px;
    height: 344px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(227, 233, 233, 0.8);
    .wrap_inner{
      width: 350px;
      height: 270px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: rgba(231, 240, 240, 0.8);
      border: 1px solid rgb(190, 190, 190);
      @mixin com {
        width: 300px;
        margin: auto;
      }
      h4{
        font-size: 15px;
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
      .username{
        @include com;
        p{
          margin-bottom: 10px;
          font-size: 14px;
        }
        input{
          width: 100%;
          height: 30px;
          line-height: 30px;
          border: 1px solid gray;
          border-radius: 2px;
          margin-bottom: 15px;
          text-indent: 5px;
          &:focus{
            border: 1px solid #008C8C;
            outline: none;
          }
        }
      }
      .password{
        @include com;
        p{
          margin-bottom: 10px;
          font-size: 14px;
        }
        input{
          width: 100%;
          height: 30px;
          line-height: 30px;
          border: 1px solid gray;
          border-radius: 2px;
          margin-bottom: 15px;
          text-indent: 5px;
          &:focus{
            border: 1px solid #008C8C;
            outline: none;
          }
        }
      }
      .verify_tips{
        height: 30px;
        line-height: 30px;
        color: rgb(162, 0, 0);
        font-size: 13px;
        overflow: hidden;
      }
      .remenber_submit{
        position: relative;
        &::before{
          content: "";
          display: block;
          width: 100%;
          height: 1px;
          background-color: rgb(106, 106, 105);
          transform: scale(1,0.5);
          position: absolute;
          top: 0;
          left: 0;
        }
        &::after{
          content: "";
          display: block;
          clear: both;
        }
        .remenber{
          float: left;
          margin-top: 20px;
          margin-left: 20px;
          font-size: 14px;
          input{
            margin-right: 8px;
            vertical-align: -1px;
          }
        }
        .submit{
          float: right;
          margin-top: 20px;
          margin-right: 20px;
          button{
            border: none;
            display: block;
            width: 80px;
            height: 30px;
            line-height: 1;
            border-radius: 10px;
            background-color: rgb(98, 189, 241);
            color: #fff;
            font-weight: bold;
            font-size: 15px;
            cursor: pointer;
            &:focus{
              border: 1px solid #008C8C;
              outline: none;
            }

          }
        }
      }
    }
  }

}
</style>
