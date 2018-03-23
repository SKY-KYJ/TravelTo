<?php
//data/cart/checkAll.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$check_all=$_REQUEST["check_all"];
$sql="UPDATE tar_shoppingcart_item SET is_checked=$check_all WHERE uid=$uid AND status=0 ";
mysqli_query($conn,$sql);