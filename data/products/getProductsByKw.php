<?php
//动态加载搜索产品
//data/products/getProductsByKw.php
header("Content-Type:application/json");
require_once("../init.php");
@$kw=$_REQUEST["kw"];//传入查询参数关键词
@$theme=$_REQUEST["theme"];//传入查询参数主题
@$destination=$_REQUEST["destination"];//传入查询参数目的地0
@$origin=$_REQUEST["origin"];//传入查询参数出发地
@$days=$_REQUEST["days"];//传入查询参数天数
$sql  =" SELECT pid,title,price,origin,destination,theme,days, ";
$sql .=" (SELECT md FROM tar_product_img i WHERE i.sid=p.sid LIMIT 1) AS md ";//子查询
$sql .=" FROM tar_product p ";
//切割传入的参数判断
if($kw||$theme||$destination||$origin||$days){
  if($kw){
    //将$kw按空格切开为数组$kws
    $kws=explode(" ",$kw);
    for($i=0;$i<count($kws);$i++){//遍历$kws
      //将$kws中当前位置的关键词替换为title LIKE '%...%'
      $kws[$i]=" title LIKE '%$kws[$i]%' ";
    }
    //将$kws用" AND "连接为一个条件字符串$where
    $where=implode(" AND ",$kws);
    //$sql=$sql." where ".$where
//    $sql.=" WHERE $where ";
  }
  if($theme||$destination||$origin||$days){
    $keys=[];
    if($theme){
      //将$kws中当前位置的关键词替换为theme LIKE '%...%'
      $themes=" theme LIKE '%$theme%' ";
      //将$kws用" AND "连接为一个条件字符串$where
      $keys[0]=$themes;
      //$sql=$sql." where ".$where
//      $sql.=" WHERE $where ";
    }
    if($destination){
      //将$kws中当前位置的关键词替换为title LIKE '%...%'
      $destinations=" destination LIKE '%$destination%' ";
      //将$kws用" AND "连接为一个条件字符串$where
      $keys[1]=$destinations;
      //$sql=$sql." where ".$where
//      $sql.=" WHERE $where ";
    }
    if($origin){
      //将$kws中当前位置的关键词替换为title LIKE '%...%'
      $origins=" origin LIKE '%$origin%' ";
      //将$kws用" AND "连接为一个条件字符串$where
      $keys[2]=$origins;
      //$sql=$sql." where ".$where
//      $sql.=" WHERE $where ";
    }
    if($days){
      //将$kws中当前位置的关键词替换为title LIKE '%...%'
      $dayss=" days LIKE $days ";
      //将$kws用" AND "连接为一个条件字符串$where
      $keys[3]=$dayss;
      //$sql=$sql." where ".$where
//      $sql.=" WHERE $where ";
    }
    $where=implode(" AND ",$keys);
  }
  $sql.=" WHERE $where ";
};
$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);
$count=count($data);
@$pageNo=$_REQUEST["pageNo"];
if($pageNo==null) $pageNo=1;
@$pageSize=$_REQUEST["pageSize"];
if($pageSize==null) $pageSize=10;
$sql.=" LIMIT ".($pageNo-1)*$pageSize.",$pageSize ";
$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);
$pageCount=ceil(($count/$pageSize));
$output=[
	"pageNo"=>$pageNo,
	"pageSize"=>$pageSize,
	"count"=>$count,
	"pageCount"=>$pageCount,
	"data"=>$data
];
echo json_encode($output);