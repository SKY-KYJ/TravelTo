<?php
//注册页请求数据
//data/users/register.php
header("Content-Type:text/json");
require_once("../init.php");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
@$uemail=$_REQUEST["uemail"];
@$phone=$_REQUEST["phone"];
@$gender=$_REQUEST["gender"];
$sql="INSERT INTO tar_user(uname,upwd,uemail,phone,gender) VALUES('$uname','$upwd','$uemail','$phone','$gender')";
$result=mysqli_query($conn,$sql);
//$url="../html/index.html";
if($result==true){
  $sql="select uid from tar_user where uname='$uname'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  session_start();
  $_SESSION["uid"]=$row[0];
  echo "true";//注册成功
//	header("location:$url");
}else{
  echo "false";//注册失败
};