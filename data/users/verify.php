<?php
//验证输入是否存在
//data/users/verify.php
header("Content-Type:text/plain");
require_once("../init.php");
@$uname=$_REQUEST["uname"];
@$phone=$_REQUEST["phone"];
if($uname!=null||$phone==null){
  $sql="select * from tar_user where uname='$uname'";//验证是否有该用户
}else{
  $sql="select * from tar_user where phone='$phone'";//验证是否有该手机号码
}
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row)
  echo "false";//查找到有该数据
else
  echo "true";//没有查找到该数据