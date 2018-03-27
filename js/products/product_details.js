//动态加载产品详情
$(()=>{
  var pid=location.search.split('=')[1];//'?pid=1'
  $.ajax({
    type:'get',
    url:'data/products/getProductByPid.php',
    data:'pid='+pid,
    dataType:'json'
  }).then(output=>{
    //获取查询后产品数据
    var {product,imgs}=output;
    var {sid,title,price,origin,destination,theme,days,outlines,team_name, feature,introduce}=product;
    var kw=destination.split("-")[0];
    //console.log(kw);
    //动态加载产品信息
    $("[data-main=kw]").html(kw);
    $("[data-main=title]").html(title);
    $("[data-main=price]").html(price);
    if(theme==1){
      $("[data-main=theme]").remove();
    }else{
      var the=theme.split(" ");
      //console.log(the);
      for(var i=0;i<the.length;i++){
        var span=$(`<span data-main='theme'>${the[i]}</span>`);
        $(".promise>b").after(span);
        //console.log(span);
      }
    }
    $("[data-main=origin]").html(origin);
    $("[data-main=destination]").html(destination);
    $("[data-main=outlines]").html(outlines);
    //动态加载产品详情
    // var html="";
    //for(var spec of specs){
    //  html+=`<a href="product_details.html?pid=${spec.pid}"
			//				class=${spec.pid===product.pid?"active":""}>${spec.spec}</a>`;
    //}
    //document.querySelector(".show-details .spec>div")
    //  .innerHTML=html;
    //var {lname, os,memory,resolution,
    //  video_card,cpu,video_memory,category,disk,details}=product;
    //document.querySelector("#param>ul")
    //  .innerHTML=`<li>
    //          <a href="javascript:;">商品名称：${lname}</a>
    //        </li>
    //        <li>
    //          <a href="javascript:;">系统：${os}</a>
    //        </li>
    //        <li>
    //          <a href="javascript:;">内存容量：${memory}</a>
    //        </li>
    //        <li>
    //          <a href="javascript:;">分辨率：${resolution}</a>
    //        </li>
    //        <li>
    //          <a href="javascript:;">显卡型号：${video_card}</a>
    //        </li>
    //        <li>
    //          <a href="javascript:;">处理器：${cpu}</a>
    //        </li>
    //        <li>
    //          <a href="javascript:;">显存容量：${video_memory}</a>
    //        </li>
    //        <li>
    //          <a href="javascript:;">分类：${category}</a>
    //        </li>
    //        <li>
    //          <a href="javascript:;">硬盘容量：${disk}</a>
    //  </li>`;
    //document.querySelector("#product-intor")
    //  .innerHTML=details;
    //
    //动态加载产品预览图
    var html='';
    for(var pic of imgs){
     html+=`<li class="pic"><img src="${pic.md}" data-md="${pic.md}" data-lg="${pic.md}"></li>`;
    }
    // console.log(html);
    $(".small_list").html(html)
      .css("width",110*imgs.length+'px');
    if(imgs.length<=4){
      $("a.forward").addClass("disabled");
    }
    $(".mImg").attr("src",`${imgs[0].md}`).removeClass("img");
    $(".large").css("backgroundImage",`url(${imgs[0].md})`);
    //动态加载是否已收藏
    $.get("data/products/getCollection.php",{pid}).then(result=>{
      if(result==1){//判断是否已收藏
        $(".collection").html("收藏").removeClass("check")
      }else{
        $(".collection").html("已收藏").addClass("check");
      }
    })
  })
});
//产品预览
$(()=>{
  var $ul=$(".small_list");
  var LIWIDTH=110,moved=0;
  //产品轮播小按钮
  $(".preview>.small").on("click","a.backward,a.forward",e=>{
    var $tar=$(e.target);
    // console.log($tar);
    if($tar.is(".forward")&&!$tar.is(".disabled")){
      move(1);
    }
    if($tar.is(".backward")&&!$tar.is(".disabled")){
      move(-1);
    }
  });
  function move(dir){
   moved+=dir;
   var left=-LIWIDTH*moved+20;
   $ul.css("left",left+"px");
   checkA();
  }
  // console.log($ul);
  function checkA(){
    // console.log($ul.children().length);
    // console.log(moved);
   if(moved==0){
     $("a.backward").addClass("disabled");
   }else if($ul.children().length-moved==4){
     $("a.forward").addClass("disabled");
   }else{
     $("a.backward").removeClass("disabled");
     $("a.forward").removeClass("disabled");
   }
  }
  //产品预览图放大镜功能
  var $mImg=$(".mImg"),
    $large=$(".large"),
    $mask=$(".mask"),
    $btn=$(".btn-search"),
    $superMask=$(".superMask");
  $ul.mouseover(e=>{
    var $tar=$(e.target);
    if($tar.is("IMG")){
      $mImg.attr("src",$tar.data("md"));
      $large.css("backgroundImage",`url(${$tar.data("lg")})`);
    }
  });
  $superMask.mouseover(()=>{
    $mask.css("display","block");
    $large.css("display","block");
    $btn.css("backgroundPosition",0+'px '+(-900)+'px');
  });
  $superMask.mouseout(()=>{
    $mask.css("display","none");
    $large.css("display","none");
    $btn.css("backgroundPosition",0+'px '+(-850)+'px');
  });
  //var MAX=175;
  $superMask.mousemove(e=>{
    var offsetX=e.offsetX, offsetY=e.offsetY;
    var top=offsetY-175/2,
      left=offsetX-175/2;
    top=top<0?0:top>145?145:top;
    left=left<0?0:left>305?305:left;
    $mask.css("top",top+'px');
    $mask.css("left",left+'px');
    $large.css("backgroundPosition",-left/1.525+'px '+(-top/1220)+'px');
  });
});
//动态加载人气推荐
$(()=>{
  $.ajax({
    type:'get',
    url:'data/products/getProductBoutique.php',
    dataType:'json'
  }).then(data=>{
    //动态加载产品信息
    var html="";
    for(var p of data){
      html+=`<div class="details_demo lf">
                <a href="product_details.html?pid=${p.pid}">
                  <img src="${p.md}">
                </a>
                <a href="product_details.html?pid=${p.pid}">
                  <p>${p.title}</p>
                </a>
              </div>`;
    }
    $(".demo-content").html(html);
  });
});
//绑定单击事件
$(()=>{
  //动态绑定产品概要按键
  $(".outlines").on("click","span",e=>{
    // console.log($(e.target).prev());
    if($("[data-main=outlines]").is(".btn")){
      $(e.target).html("收起↑").prev().removeClass("btn");
    }else{
      $(e.target).html("显示更多详情...").prev().addClass("btn");
      }
    }
  );
  //动态绑定人数数量按键
  $(".account").on("click",".number-reduce,.number-add",e=>{
    var $tet=parseInt($(".number-content").val());
    var $tar=$(e.target);
    // console.log($tet);
    if($tar.is(".number-add")){
      $tet+=1;
      $(".number-content").val(`${$tet}`);
    }else if($tar.is(".number-reduce")&$tet!=1){
      $tet-=1;
      $(".number-content").val(`${$tet}`);
    }else{
      $tet=1;
      $(".number-content").val(`${$tet}`);
    }
  });
  //动态绑定购买部分按键
  $(".shops")
    //绑定定制行程按键
    .on("click",".cart",e=>{
      e.preventDefault();
      var pid=location.search.split('=')[1];
      var count=$(".number-content").val();
      $.get("data/users/isLogin.php").then(data=>{
        if(data.code==0){
          //alert("需要先登录");
          hiAlert("需要先登录","提示",function(){
            location="login.html?back="+location.href;
          });
        }else{
          $.get("data/cart/addCart.php",{pid,count}).then(result=>{
            if(result==1){
              //alert("添加成功");
              //hiOverAlert('添加成功',1000);
              hiAlert("添加成功", "提示");
            }
          })
        }
      })
    })
    //绑定收藏按键
    .on("click",".collection",e=>{
      e.preventDefault();
      var $tar=$(e.target);
      var pid=location.search.split('=')[1];
      $.get("data/users/isLogin.php").then(data=>{
        if(data.code==0){
          //alert("需要先登录");
          hiAlert("需要先登录","提示",function(){
            location="login.html?back="+location.href;
          });
        }else{
          $.get("data/cart/checkCollect.php",{pid}).then(result=>{
            if(result==1){//判断是否已收藏
              hiOverAlert('已添加收藏',800);
              $(".collection").html("已收藏").addClass("check")
            }else{
              hiOverAlert('已取消收藏',800);
              $(".collection").html("收藏").removeClass("check")
            }
          })
        }
      })
    })
});