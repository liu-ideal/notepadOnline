<?php
//--实现新建笔记接口--
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:HEAD,GET,POST,OPTIONS,PATCH,PUT,DELETE');
header('Access-Control-Allow-Headers:Origin,X-Requested-With,Authorization,Content-Type,Accept,Z-Key');
$mypost=$_POST["data"];
$mydata=json_decode($mypost);
function dealWith($sql){
  global $mydata;
  $mysq=new mysqli("localhost","root","","liu");
  if($mysq->connect_error){
    //只要上面的调用表达式不为0说明连接失败
    echo "读取数据库失败，请联系管理员";
  }
  $mysq->query("set names utf8");//设定编码格式，很重要
$result=$mysq->query($sql);
  if($result) {
    //什么都不返回给前端表明成功
    //echo "成功存入数据";
    //如果什么也不传给AJAX 说明操作成功，前端应该要路由跳转到登录页面了了

  }else {
    echo "失败";
  }
  //关闭数据库
  $mysq->close();
}

$sql="INSERT INTO `{$mydata->user}` (`title`,`content`,`time`,`img`) VALUES ('{$mydata->title}','{$mydata->content}','{$mydata->time}','{$mydata->img}');";
dealWith($sql);
 ?>
