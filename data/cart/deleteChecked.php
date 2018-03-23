<?php
//动态删除被选中产品
//data/cart/deleteChecked.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
$sql="delete from tar_shoppingcart_item where uid=$uid and is_checked=1 and status=0";
mysqli_query($conn,$sql);
echo json_encode("true");//返回一个值回去执行后续函数