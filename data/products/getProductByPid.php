<?php
//动态加载产品详情
//data/products/getProductByPid.php
header("Content-Type:application/json");
require_once("../init.php");
@$pid=$_REQUEST["pid"];
$output=[];
if($pid){
  $sql="SELECT * FROM tar_product where pid=$pid";
  $result=mysqli_query($conn,$sql);
  $product=mysqli_fetch_all($result,1)[0];
  $output['product']=$product;
  $sid=$product['sid'];
  $sql="SELECT * FROM tar_product_img where sid=$sid";
  $result=mysqli_query($conn,$sql);
  $output['imgs']=mysqli_fetch_all($result,1);
}
echo json_encode($output);