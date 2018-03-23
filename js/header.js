//在当前页面加载header.html
$(()=>{
  $(".header").load(
    "header.html",
    ()=>{
      //检测登陆状态
      function isLogin(){
        $.get("data/users/isLogin.php")
          .then(data=>{
            if(data.code==0){
              $("[data-toggle=login]").show()
                .next().hide();
            }else{
              $("[data-toggle=login]").hide()
                .next().show()
                .find("[data-name=uname]")
                .html(data.uname);
            }
          })
      }
      isLogin();
      // console.log(location);
      $(document.body).on(//为登录按钮绑定事件
        "click",
        "[data-toggle=login]>a",
        (e)=>{
          var $tar=$(e.target);
          if($tar.html()=="登录"){
            location="login.html?back="+location.href;
          }else{
            location="register.html?back="+location.href;
          }
        }
      );
      $(document.body).on(
        "click",
        "[data-toggle=welcome]>a:last-child",
        ()=>{
          hiOverAlert('已退出登录状态', 1500);
          $.get("data/users/logout.php").then(isLogin)
        }
      );
      //设置搜索帮助
      $(document.body).on(
        "click",
        "[data-trigger=search]",
        function(){
          var $a=$(this);
          var $txtSearch=$a.prev(".txtSearch");
          if($txtSearch.val().trim()!=="")
            location="products.html?kw="+$txtSearch.val().trim();
          else
            location="products.html";
        }
      );
      $(document.body).on(
        "keyup",
        ".txtSearch",
          e=>{
          var $txtSearch=$(e.target);
          var $shelper=$txtSearch.prev();
          switch(e.keyCode){
            case 13://回车键
              $txtSearch.next().click();//模拟触发!
              break;
            case 38://方向键:上
              if(!$shelper.is(":has(.focus)"))
                $shelper.children().last()
                  .addClass("focus");
              else if($shelper.children().first().is(".focus"))
                $shelper.children().removeClass("focus")
                  .last().addClass("focus");
              else
                $shelper.children(".focus").removeClass("focus")
                  .prev().addClass("focus");
              $(".txtSearch").val(
                $shelper.children(".focus")
                  .children().children().first().html()
              );
              break;
            case 40://方向键:下
              if(!$shelper.is(":has(.focus)"))
                $shelper.children().first()
                  .addClass("focus");
              else if($shelper.children().last().is(".focus"))
                $shelper.children().removeClass("focus")
                  .first().addClass("focus");
              else
                $shelper.children(".focus").removeClass("focus")
                  .next().addClass("focus");
              $(".txtSearch").val(
                $shelper.children(".focus")
                  .children().children().first().html()
              );
              break;
            default:
              if($txtSearch.val().trim()!==""){
                $(".txtSearch").val($txtSearch.val());
                $.get(
                  "data/products/autocomplete.php",
                  {term:$txtSearch.val().trim()}
                ).then(data=>{
                    var html="";
                    for(var p of data){
                      html+=`<li>
                        <div class="search-item" title="${p.title}"><a href="product_details.html?pid=${p.pid}">${p.title}</a></div>
										</li>`;
                    }
                    $txtSearch.prev().html(html).show();
                  })
              }
          }
        }
      );
      //保留搜索触发后的搜索关键词
      var search=location.search;//?kw=mac i7 256g
      if(search.indexOf("kw")!=-1){
        $(".txtSearch").val(decodeURI(search.split("=")[1]));
      }
    }
  );
});