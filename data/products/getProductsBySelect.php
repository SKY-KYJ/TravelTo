<?php
//动态加载产品选项
//data/products/getProductsBySelect.php
header("Content-Type:application:json");
require_once("../init.php");
//查询符合条件的theme返回数据
$sql =" SELECT theme FROM tar_product GROUP BY theme ";
$result=mysqli_query($conn,$sql);
$theme=mysqli_fetch_all($result,1);
//查询符合条件的days返回数据
$sql =" SELECT days FROM tar_product GROUP BY days ";
$result=mysqli_query($conn,$sql);
$days=mysqli_fetch_all($result,1);
//查询符合条件的origin返回数据
$sql =" SELECT origin FROM tar_product GROUP BY origin ";
$result=mysqli_query($conn,$sql);
$origin=mysqli_fetch_all($result,1);
//查询符合条件的destination返回数据
$sql =" SELECT destination FROM tar_product GROUP BY destination ";
$result=mysqli_query($conn,$sql);
$destination=mysqli_fetch_all($result,1);
$output=[
	"theme"=>$theme,
	"days"=>$days,
	"origin"=>$origin,
	"destination"=>$destination
];
echo json_encode($output);