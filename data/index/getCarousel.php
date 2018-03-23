<?php
//动态加载首页轮播图
//data/index/getCarousel.php
header("Content-Type:application/json");
require_once("../init.php");
$sql="select * from tar_index_carousel";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));