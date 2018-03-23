<?php
//动态加载精品介绍
//data/index/getBoutique.php
header("Content-Type:application:json");
require_once("../init.php");
@$des=$_REQUEST["des"];//前端传入参数 destination 目的地
//查询符合条件的产品总数
$sql  =" SELECT count(pid) FROM tar_product ";
$sql .=" WHERE destination LIKE '%$des%' ";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
//echo $row[0]."|";
//获取符合条件产品的随机页码号$pno
$pageSize=8;//可显示的产品数
$pageCount=ceil($row[0]/$pageSize);
if($row[0]<=$pageSize){
  $pno=1;
}else{
  $pno=rand(1,$pageCount);
};
//echo $pageCount."|";
//echo $pno;
//查询符合条件的产品详情并返回数据
$sql =" SELECT pid,title,price,origin, ";
$sql .=" (SELECT md FROM tar_product_img i WHERE i.sid=p.sid LIMIT 1) AS md ";//子代查询
$sql .=" FROM tar_product p ";
$sql .=" WHERE destination LIKE '%$des%' OR title LIKE '%$des%' ";//模糊查询
$sql .=" ORDER BY rand() ";//随机排序
$sql .=" LIMIT $pno,$pageSize ";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));