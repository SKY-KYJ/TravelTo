<?php
//动态加载产品收藏情况
//data/cart/checkCollect.php
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
  $sql =" UPDATE tar_user_collect SET is_collect=0 ";
  $sql.=" WHERE uid=$uid AND pid=$pid ";
  $code=0;
}else if($row!=null&$row[0]==0){
  $sql =" UPDATE tar_user_collect SET is_collect=1 ";
  $sql.=" WHERE uid=$uid AND pid=$pid ";
  $code=1;
}else{
//创建一条收藏数据
  $sql =" INSERT INTO tar_user_collect(uid,pid,is_collect) ";
  $sql.=" VALUES($uid,$pid,1) ";
  $code=1;
}
mysqli_query($conn,$sql);
echo json_encode($code);//返回一个值回去执行后续函数
