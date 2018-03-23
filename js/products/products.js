//动态加载产品列表
function loadPage(pageNo=1,pageSize=5){
  // var pageNo=1;    //当前页面
  // var pageSize=10; //单页显示数量
  // var pageShow=5;  //显示分页数
  //拼查询字符串
  var query={pageNo,pageSize};
  var search=location.search;//?kw 搜索关键字
  if(search!==""){
    query.kw=decodeURI(search.split("=")[1]);
  }
  //console.log(query);
  var keys=form_check()
  if(keys!==""){
    query.theme=keys.theme;
    query.destination=keys.destination;
    query.origin=keys.origin;
    query.days=keys.days;
  }
  // console.log(keys)
  // console.log(query)
  $.get("data/products/getProductsByKw.php",query)
    .then(result=>{
      var {pageNo, pageCount,data}=result;
      var html="";
      // console.log(result);
      pageNo=parseInt(pageNo);
      pageCount=parseInt(pageCount);
      // console.log(pageNo);
      // console.log(pageCount);
      // console.log(data);
      for(var p of data){
        html+=`<div class="product-box">
        <div class="product-left">
          <a href="product_details.html?pid=${p.pid}">
            <img src="${p.md}" alt=""/>
          </a>
        </div>
        <div class="product-content">
          <div class="title">
            <a href="product_details.html?pid=${p.pid}">${p.title}</a>
          </div>
          <div class="theme">`;
        var theme=p.theme;
        if(theme==1){
          html+=`<span>精品推荐</span>`;
        }else{
          var the=theme.split(" ");
          //console.log(the);
          for(var i=0;i<the.length;i++){
            html+=`<span>${the[i]}</span>`;
          }
        }
          html+=`</div>
          <div class="origin">${p.origin}</div>
          <span>|</span>
          <div class="destination">${p.destination}</div>
        </div>
        <div class="product-right">
          <div class="price">¥${p.price}起</div>
          <div class="a">
            <span>出游</span>
            <span>100</span>
          </div>
          <div class="a">
            <span>评论</span>
            <span>100</span>
          </div>
        </div>
      </div>`;
      }
      $(".pages").attr({
        "count":pageCount,
        "pageSize":pageSize
      })
      // console.log(pageCount)
      $(".products").html(html);
      //动态加载分页
      $(".pages").pagination({
        css: 'css-2',
        totalPage: pageCount,
        isResetPage: true,
        callBack: function (currPage, pageSize) {
          console.log('currPage:' + currPage + '     pageSize:' + pageSize+'     pageCount:' + pageCount);
          loadPage(currPage,pageSize);
        }
      });
    })
}
function loadPagination(){
  var pageCount=$(".pages").attr("count");
  $(".pages").pagination({
    css: 'css-2',
    totalPage: pageCount,
    isResetPage: true,
    callBack: function (currPage, pageSize) {
      console.log('currPage:' + currPage + '     pageSize:' + pageSize+'     pageCount:' + pageCount);
      loadPage(currPage,pageSize);
    }
  });
}


//解析路径所包含的各个筛选项
function form_check(){
  var result={};
  $(".selected_sucaihuo").each(function(){
    var $parent=$(this).parent().parent().parent()
    // console.log($parent);
    if($parent.is(".theme")){
      result.theme=$(this).text()
    }
    if($parent.is(".destination")){
      result.destination=$(this).text()
    }
    if($parent.is(".origin")){
      result.origin=$(this).text()
    }
    if($parent.is(".days")){
      result.days=$(this).text()
    }
  });
  return result;
}

//动态加载产品选项
function loadSelect(){
  $.get("data/products/getProductsBySelect.php").then(result=>{
    // console.log(result);
    var {theme,days,origin,destination}=result;
    var html="";
    for(var d of days){
      // console.log(d.days)
      html+=`<li>
              <span>${d.days}<i></i></span>
            </li>`;
    }
    $(".select-list>.days>ul").html(html);
    html="";
    for(var o of origin){
      // console.log(o.origin)
      html+=`<li>
              <span>${o.origin}<i></i></span>
            </li>`;
    }
    $(".select-list>.origin>ul").html(html);
    //html="";
    //var des;
    //for(var e of destination){
      // console.log(e.destination)
      //des=e.destination.split("-");
      //console.log(des)
      // html+=`<li>
      //         <span>${e.destination}<i></i></span>
      //       </li>`;
    //}
    // $(".select-list>.destination>ul").html(html);
    // html="";
    // for(var t of theme){
    //   console.log(t.theme)
    //   html+=`<li>
    //           <span>${t.theme}<i></i></span>
    //         </li>`;
    // }
    // $(".select-list>.theme>ul").html(html)
  })
}
//预加载产品列表
$(()=>{
  loadPage();
  loadSelect();
  //loadPagination();
});
//动态绑定筛选产品
$(()=>{
  $(".select")
    //动态绑定热门推荐
    .on("click",".theme>ul>li>span",e=>{
      var $tar=$(e.target);
      if(!$tar.is(".selected_sucaihuo")){
        $tar.addClass("selected_sucaihuo").parent().siblings().children("span").removeClass("selected_sucaihuo");
      }else{
        $tar.removeClass("selected_sucaihuo");
      }
      // console.log($tar.text());
      loadPage();
      var currPage = 1
      var totalPage = $(".pages").attr("count");
      $(".pages").pagination('setPage', currPage, totalPage);
      console.log($(".pages").pagination('getPage'));
    })
    //动态绑定游玩线路
    .on("click",".destination>ul>li>span",e=>{
      var $tar=$(e.target);
      if(!$tar.is(".selected_sucaihuo")){
        $tar.addClass("selected_sucaihuo").parent().siblings().children("span").removeClass("selected_sucaihuo");
      }else{
        $tar.removeClass("selected_sucaihuo");
      }
      // console.log($tar.text());
      loadPage();
    })
    //动态绑定出发地
    .on("click",".origin>ul>li>span",e=>{
      var $tar=$(e.target);
      if(!$tar.is(".selected_sucaihuo")){
        $tar.addClass("selected_sucaihuo").parent().siblings().children("span").removeClass("selected_sucaihuo");
      }else{
        $tar.removeClass("selected_sucaihuo");
      }
      // console.log($tar.text());
      loadPage();
    })
    //动态绑定行程天数
    .on("click",".days>ul>li>span",e=>{
      var $tar=$(e.target);
      if(!$tar.is(".selected_sucaihuo")){
        $tar.addClass("selected_sucaihuo").parent().siblings().children("span").removeClass("selected_sucaihuo");
      }else{
        $tar.removeClass("selected_sucaihuo");
      }
      // console.log($tar.text());
      loadPage();
    })
});