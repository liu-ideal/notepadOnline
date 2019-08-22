<?php
//--实现删除笔记接口--
// header('Access-Control-Allow-Origin:*');
// header('Access-Control-Allow-Methods:HEAD,GET,POST,OPTIONS,PATCH,PUT,DELETE');
// header('Access-Control-Allow-Headers:Origin,X-Requested-With,Authorization,Content-Type,Accept,Z-Key');
$mypost=$_POST["data"];
$mydata=json_decode($mypost);
function dealWith($sql){
  global $mydata;
  $mysq=new mysqli('b-kygnzrvcwqh9zf.bch.rds.gz.baidubce.com','b_kygnzrvcwqh9zf','liupei0410','b_kygnzrvcwqh9zf');
  if($mysq->connect_error){
    //只要上面的调用表达式不为0说明连接失败
    echo "读取数据库失败，请联系管理员";
  }
  $mysq->query("set names utf8");//设定编码格式，很重要
$result=$mysq->query($sql);
  if($result) {
    //echo "删除数据成功";
    //如果什么也不传给AJAX 说明操作成功
  }else {
    echo "失败";
  }
  //关闭数据库
  $mysq->close();
}

$sql="DELETE FROM `{$mydata->user}` WHERE title='{$mydata->title}'";

dealWith($sql);
 ?>
