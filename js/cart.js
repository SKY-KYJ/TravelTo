//动态加载购物车产品
function loadCart(){
	$.get("data/users/isLogin.php").then(data=>{
		if(data.code==0){
      //alert("需要先登录");
      hiAlert("需要先登录","提示",function(){
        location="login.html?back="+location.href;
      });
		}else{
			$.get("data/cart/getCart.php").then(items=>{
				var html="";
				// console.log(items);
				for(var p of items){
					html+=`<div class="imfor">
					<div class="check">`
					//判断该产品是否被选中
					if(p.is_checked==0){
            html+=`<input class="check-box" data-iid="${p.iid}" data-price="${(p.price*p.count).toFixed(2)}" type="checkbox"/>`
					}else{
            html+=`<input class="check-box" data-iid="${p.iid}" data-price="${(p.price*p.count).toFixed(2)}"	 type="checkbox" checked>`
					}
          html+=`</div>
					<div class="product">
						<a href="product_details.html?pid=${p.pid}">
							<img src="${p.sm}" alt="">
						</a>
						<span class="desc">
							<a href="product_details.html?pid=${p.pid}">${p.title}</a>
						</span>
						<p class="col">
							<span>出发地:</span>
							<span class="color-desc">${p.origin}</span>
						</p>
					</div>
					<div class="price">
						<p class="price-desc">会员专享价</p>
						<p>
							<b>¥</b><b>${p.price}</b>
						</p>
					</div>
					<div class="num" data-iid="${p.iid}">
						<span class="reduce">-</span>
						<input type="text" value="${p.count}" disabled>
						<span class="add">+</span>
					</div>
					<div class="total-price">
						<span>¥</span>
						<span>${(p.price*p.count).toFixed(2)}</span>
					</div>
					<div class="del">
						<a class="del-btn" data-iid="${p.iid}" href="${p.iid}">删除</a>`;
					//console.log(p.coll);
					//判断该产品是否已收藏
					if(p.coll==1){
            html+=`<a class="coll coll-btn" href="${p.pid}">已收藏</a>`
					}else{
            html+=`<a class="coll" href="${p.pid}">收藏</a>`
					}
          html+=`</div>
					</div>`;
				}
				$(".content-box-body").html(html);
        loadJourney();
        loadPrice();
			})
		}
	})
}
//动态加载选中行程数量
function loadJourney(){
  var journey=$(".check-box:checked").length;
  // console.log(journey);
  $(".totalOne").html(journey);
}
//动态加载总价格
function loadPrice(){
	var price_all=0;
	$(".check-box").each(function(){
		if($(this).is(":checked")){
			var price=parseInt($(this).data("price"))
			price_all+=price
		}
	})
  $(".total-price-all").html(price_all.toFixed(2))
}

//绑定按钮单击事件
$(()=>{
	// console.log(price_all)
	//绑定产品内容按键
	$(".content-box-body")
		//绑定产品数量按键
		.on("click",".reduce,.add",e=>{
		var $tar=$(e.target);
		var count=$tar.parent().children(":eq(1)").val()
		// console.log(count);
		// console.log($tar);
		if($tar.is(".add")){
			count++
		}else{
			count--
		}
		var iid=$tar.parent().data("iid");
		if(count<1){//如果数量少于1时，提示用户是否删除该产品
			var title=$tar.parent().parent().find(".product>.desc>a").html();
			// if(confirm("是否继续删除"+title+"吗?")){
			// 	$.get("data/cart/updateCount.php",{iid,count})
			// 		.then(loadCart);
			// }
      hiConfirm("是否继续删除"+title+"吗?", '确认框', function(r) {
        if(r){
          $.get("data/cart/updateCount.php",{iid,count}).then(loadCart);
				}
      });
		}else{
			$.get("data/cart/updateCount.php",{iid,count})
				.then(loadCart);
		}
	})
		//绑定产品删除按键
		.on("click",".del>.del-btn",e=>{
		e.preventDefault();
		var $tar=$(e.target);
		var iid=$tar.data("iid");
		var title=$tar.parent().parent().find(".product>.desc>a").html();
		// if(confirm("是否继续删除"+title+"吗?")){
		// 	$.get("data/cart/deleteItem.php",{iid})
		// 		.then(loadCart)
		// }
		hiConfirm("是否继续删除"+title+"吗?", '确认框', function(r) {
			if(r){
        $.get("data/cart/deleteItem.php",{iid}).then(loadCart);
			}
		});
	})
		//绑定产品收藏按键
		.on("click",".coll",e=>{
			e.preventDefault();
			var $tar=$(e.target);
			var pid=$tar.attr("href");
			$.get("data/cart/checkCollect.php",{pid}).then(result=>{
        loadCart();
        if(result==1){//判断是否已收藏
          hiOverAlert('已添加收藏',800);
        }else{
          hiOverAlert('已取消收藏',800);
        }
			})
		})
		//绑定产品选中按键
		.on("click",".check-box",e=>{
			var $tar=$(e.target);
			var is_checked='';
			var iid=$tar.data("iid");//获取订单id
      // console.log(count)
			//获取选中产品数量
			//判断被选中产品数量是否符合全选
			if(($(".check-box").length)==($(".check-box:checked").length)){
				$(".check-all").prop("checked",true)
			}else{
        $(".check-all").prop("checked",false)
			};
			if($tar.is(":checked")){
        is_checked=1;
			}else{
				is_checked=0;
			}
			// console.log(price);
			// ${(p.price*p.count).toFixed(2)
      // console.log(is_checked);
      // console.log(iid);
			$.get("data/cart/checkItem.php",{iid,is_checked}).then(loadCart)
		})


	//绑定标题行按键
	$("#box")
		//绑定全部清除按键
		.on("click",".clearAll",e=>{
      // if(confirm("是否继续删除全部订单吗?")) {
      //   $.get("data/cart/clearCart.php")
      //     .then(loadCart)
      // }
      hiConfirm("是否继续删除全部订单吗?", '确认框', function(r) {
        if(r){
          $.get("data/cart/clearCart.php")
            .then(loadCart)
        }
      });
		})
		//绑定选中删除按键
		.on("click",".sel-del",e=>{
      e.preventDefault();
      //获取选中产品数量
      var count=$(".check-box:checked").length;
			// console.log(count);
      // if(confirm("是否继续删除选中的"+count+"个订单吗?")) {
       //  $.get("data/cart/deleteChecked.php")
       //    .then(loadCart)
      // }
      hiConfirm("是否继续删除选中的"+count+"个订单吗?", '确认框', function(r) {
        if(r){
          $.get("data/cart/deleteChecked.php")
            .then(loadCart)
        }
      });
		})
		//绑定全选按键
		.on("click",".check-all",e=>{
			var $tar=$(e.target)
			var check_all='';
			// console.log($tar);
      if($tar.is(":checked")){
        check_all=1;
        $(".check-all").prop("checked",true)
      }else{
        check_all=0;
        $(".check-all").prop("checked",false)
      }
      // console.log(check_all);
      $.get("data/cart/checkAll.php",{check_all}).then(loadCart)
		})

});
//预加载产品列表
$(()=>{
  loadCart();
  // $(".check-all").click()//模拟触发清空被选中项
});