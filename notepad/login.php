<?php
//--实现登录功能接口--
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
  $resultTable=$mysq->query("SHOW TABLES");//取得所有表名
  while($row=$resultTable->fetch_array(MYSQLI_NUM)) {//判断用户名是否已经存在
    if($row[0]==$mydata->user){
      //什么都不给前端返回说明成功,前端路由跳转
      //echo "有这个用户";
    $result= $mysq->query($sql);
    while($rowTwo=$result->fetch_array(MYSQLI_NUM)){
      if($mydata->password===$rowTwo[0]){
        //什么都不给前端返回说明成功
        //echo "验证通过";
        return;
      }


    }
    }
  //  $jss=json_encode($row);
  //
  // echo $jss;
}
echo "用户名或密码不正确";

  //关闭数据库
  $mysq->close();
}


$sql="SELECT * FROM `{$mydata->user}` LIMIT 1 ;";
dealWith($sql);
 ?>
