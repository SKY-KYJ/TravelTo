<?php
//动态加载是否选中
//data/cart/checkItem.php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$is_checked=$_REQUEST["is_checked"];
$sql="UPDATE tar_shoppingcart_item SET is_checked=$is_checked WHERE iid=$iid";
mysqli_query($conn,$sql);