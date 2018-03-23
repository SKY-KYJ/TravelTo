<?php
//动态加载产品收藏情况
//data/products/getCollection.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$pid=$_REQUEST["pid"];
$code='';
$sql =" SELECT is_collect FROM tar_user_collect ";
$sql.=" WHERE uid=$uid AND pid=$pid ";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
//echo $row[0];
if($row!=null&$row[0]==1){
//用户已收藏过的直接更新收藏状态
  $code=0;
}else if($row!=null&$row[0]==0){
  $code=1;
}else{
  $code=1;
}
echo json_encode($code);//返回一个值回去执行后续函数