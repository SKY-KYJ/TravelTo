<?php
//动态加载前十榜
//data/index/getTopTen.php
header("Content-Type:application:json");
require_once("../init.php");
@$area=$_REQUEST["area"];//前端传入参数 area 区域
//查询符合条件的产品详情并返回数据
$sql  =" SELECT country,place,img,ranking  ";
$sql .=" FROM tar_index_top ";
$sql .=" WHERE area LIKE '%$area%' ";
$sql .=" ORDER BY ranking ";
$result = mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));