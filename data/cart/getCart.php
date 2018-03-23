<?php
//动态加载列表产品详情
//data/cart/getCart.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
$sql =" SELECT iid,p.pid,count,status,sid,title,price,origin,is_checked, ";
$sql.=" (SELECT sm FROM tar_product_img i WHERE i.sid=p.sid LIMIT 1) AS sm, ";
$sql.=" (SELECT is_collect FROM tar_user_collect u WHERE u.pid=p.pid LIMIT 1) AS coll ";
$sql.=" FROM tar_shoppingcart_item c ";
$sql.=" INNER JOIN tar_product p ON p.pid=c.pid";
$sql.=" WHERE c.uid=$uid AND status=0 ";//获取产品订单状态为0的数据
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));