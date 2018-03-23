<?php
//动态添加商品到购物车
//data/cart/addCart.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$pid=$_REQUEST["pid"];
@$count=$_REQUEST["count"];
$sql="select * from tar_shoppingcart_item where uid=$uid and pid=$pid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row==null){
	$sql="insert into tar_shoppingcart_item (uid,pid,count,is_checked,status) values ($uid,$pid,$count,0,0)";
}else{
	$sql="update tar_shoppingcart_item set count=count+$count where uid=$uid and pid=$pid";
}
mysqli_query($conn,$sql);
echo json_encode(1);