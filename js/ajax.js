////封装适合各种情况的简化版ajax函数
function ajax({type,url,dataType,data}){
	return new Promise(callback=>{
	var xhr=new XMLHttpRequest();//1.创建xhr对象
	//如果type是get,且data不为空,才+?+data
	if(type.toLowerCase()=="get"&&data!==undefined){
		url+='?'+data;
	}
	xhr.open(type,url,true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				var resData=xhr.responseText;//接收响应结果字符串
				if(dataType!==undefined//如果响应消息的类型json
					&&dataType.toLowerCase()=="json"){
					resData=JSON.parse(resData);
				}
				callback(resData);
			}
		}
	}
	if(type.toLowerCase()==="post")//如果是post
		xhr.setRequestHeader(//才增加:更改请求消息头
			"Content-Type","application/x-www-form-urlencoded"
		);
	//4.发送请求
	xhr.send(type.toLowerCase()=="get"?null:data);
	});
}
