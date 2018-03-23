<?php
//动态加载精品介绍
//data/products/getProductBoutique.php
header("Content-Type:application:json");
require_once("../init.php");
$pageSize=4;//可显示的产品数
//查询符合条件的产品详情并返回数据
$sql =" SELECT pid,title, ";
$sql .=" (SELECT md FROM tar_product_img i WHERE i.sid=p.sid LIMIT 1) AS md ";//子代查询
$sql .=" FROM tar_product p ";
$sql .=" ORDER BY rand() ";//随机排序
$sql .=" LIMIT 1,$pageSize ";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));