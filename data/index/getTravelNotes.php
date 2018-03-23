<?php
//动态加载旅行者游记
//data/index/getTravelNotes.php
header("Content-Type:application:json");
require_once("../init.php");
//查询符合条件的游记总数
$sql  =" SELECT count(nid) FROM tar_notes ";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
//echo $row[0]."|";
//获取符合条件游记的随机页码号$pno
$pageSize=4;//可显示的游记数
$pageCount=ceil($row[0]/$pageSize);
if($row[0]<=$pageSize){
  $pno=1;
}else{
  $pno=rand(1,$pageCount);
};
//echo $pageCount."|";
//echo $pno;
//查询符合条件的游记详情并返回数据
$sql =" SELECT nid,title,publish_date,writer,dest_name,text_brief,header_pic ";
$sql .=" FROM tar_notes  ";
$sql .=" ORDER BY rand() ";//随机排序
$sql .=" LIMIT $pno,$pageSize ";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));