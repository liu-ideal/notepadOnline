<?php
//--实现查询所有笔记数据接口--
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
if($result->num_rows>1){
  $row=$result->fetch_all(MYSQLI_ASSOC);
  $rowTwo=json_encode($row);
  //返回一个JSON 内容为一个数组，数组里面是对象，前端接收再把这个字符串转回去
  echo "$rowTwo";
}else {
  echo "没有数据";
}

  $mysq->close();
}

$sql="SELECT `title`,`content` FROM `{$mydata->user}`";

dealWith($sql);
 ?>
