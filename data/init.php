<?php
/*
*项目初始化页面，用于声明其它页面都需要的公共变量/函数。注意：此页面应该被其它页面包含
*/
//允许全部跨域
//header("Access-Control-Allow-Origin:*");
$conn = mysqli_connect("127.0.0.1","root","","tar",3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

