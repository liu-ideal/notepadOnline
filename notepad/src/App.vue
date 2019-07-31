<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
html,body{
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: Arial,'Microsoft YaHei',sans-serif;
}
#app{
width: 100%;
height: 100%;
background-color: rgb(222, 227, 213);
}
</style>
