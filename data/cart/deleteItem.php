<?php
//动态删除单个产品
//data/cart/deleteItem.php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
$sql="delete from tar_shoppingcart_item where iid=$iid";
mysqli_query($conn,$sql);