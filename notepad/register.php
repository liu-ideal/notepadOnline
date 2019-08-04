<?php
//--实现注册功能接口--
$mypost=$_POST["data"];
$mydata=json_decode($mypost);
function dealWith($sql,$sqlTwo){
  global $mydata;
  $mysq=new mysqli("localhost","root","","liu");
  if($mysq->connect_error){
    //只要上面的调用表达式不为0说明连接失败
    echo "读取数据库失败，请联系管理员";
  }
  $mysq->query("set names utf8");//设定编码格式，很重要
  $resultTable=$mysq->query("SHOW TABLES");//取得所有表名
  while($row=$resultTable->fetch_array(MYSQLI_NUM)) {//判断用户名是否已经存在
    if($row[0]==$mydata->user){
      echo "用户名已存在";
      return;
    }
  //  $jss=json_encode($row);
  //
  // echo $jss;
}
$result=$mysq->query($sql);
  if($result) {
    //如果什么也不传给AJAX 说明操作成功，前端应该要路由跳转到登录页面了了
    $resultTwo=$mysq->query($sqlTwo);
    if($resultTwo) {

    }else {
      echo "失败";
    }
  }else {
    echo "失败";
  }
  //关闭数据库
  $mysq->close();
}

$sql="CREATE TABLE `liu`.`{$mydata->user}` ( `password` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `title` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `content` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ) ENGINE = InnoDB;";
$sqlTwo="INSERT INTO `{$mydata->user}` (`password`) VALUES ('{$mydata->password}');";
dealWith($sql,$sqlTwo);
 ?>
