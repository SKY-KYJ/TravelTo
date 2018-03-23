<?php
//清空购物车
//data/cart/clearCart.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
$sql="delete from tar_shoppingcart_item where uid=$uid AND status=0";
mysqli_query($conn,$sql);