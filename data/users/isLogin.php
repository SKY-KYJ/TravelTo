<?php
//判断登陆状态
//data/users/isLogin.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid==null)
	echo json_encode(["code"=>0]);
else{
	$sql="select uname from tar_user where uid=$uid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	echo json_encode(["code"=>1,"uname"=>$row[0]]);
}