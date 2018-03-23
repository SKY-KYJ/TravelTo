<?php
//动态加载人气指南
//data/index/getGuide.php
header("Content-Type:application:json");
require_once("../init.php");
//查询符合条件的指南总数
$sql  =" SELECT count(gid) FROM tar_guide ";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
//echo $row[0]."|";
//获取符合条件指南的随机页码号$pno
$pageSize=8;//可显示的指南数
$pageCount=ceil($row[0]/$pageSize);
if($row[0]<=$pageSize){
  $pno=1;
}else{
  $pno=rand(1,$pageCount);
};
//echo $pageCount."|";
//echo $pno;
//查询符合条件的指南详情并返回数据
$sql =" SELECT gid,title,update_date,sm,file_size ";
$sql .=" FROM tar_guide  ";
$sql .=" ORDER BY rand() ";//随机排序
$sql .=" LIMIT $pno,$pageSize ";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));