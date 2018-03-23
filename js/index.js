//轮播图
$(()=>{
  $.get("data/index/getCarousel.php").then(data=>{
    var LIWIDTH=1280,
      timer=null,
      moved=0,
      duration=500,
      wait=3500;
    var html1="";
    var html2="";
    for(var p of data){
      html1+=`<li>
								<a href="${p.href}" title="${p.title}">
								  <div>${p.title}</div>
									<img src="${p.img}">
								</a>
							</li>`
    }
    var p0=data[0];
    html1+=`<li>
								<a href="${p0.href}" title="${p0.title}">
									<img src="${p0.img}">
								</a>
							</li>`;
    for(var r of data){
      html2+=`<li>
								<a href="${r.href}" title="${r.title}">
									<img src="${r.img}">
								</a>
							</li>`
    }
    var $ul=$("[data-load=bannerImgs]");
    $ul.html(html1).css("width",LIWIDTH*(data.length+1));
    var $ulInds=$("[data-load=bannerInds]");
    $ulInds.html(html2)
      .children().first().addClass("hover");

    function move(){
      $ul.animate({
        left:-LIWIDTH*moved
      },duration,function(){
        if(moved==5){
          moved=0;
          $ul.css("left",0);
        }
        $ulInds.children(`:eq(${moved})`).addClass("hover")
          .siblings().removeClass("hover");
      })
    }

    timer=setInterval(()=>{
      moved++;
      move();
    },wait+duration);
    $ul.on("mouseenter","img",e=>{
      var $li=$(e.target);
      moved=$li.parent().parent().index();
      //console.log(e);
      //console.log(moved);
      //防动画/定时器叠加
      $ul.stop(true);
      move()
    });
    $ulInds.on("mouseenter","img",e=>{
      var $li=$(e.target);
      moved=$li.parent().parent().index();
      //console.log(e);
      //console.log(moved);
      //防动画/定时器叠加
      $ul.stop(true);
      move()
    });
    $(".banner").hover(
      ()=>clearInterval(timer),
      ()=>timer=setInterval(()=>{
        moved++;
        move()
      },wait+duration)
    );
    $("[data-move=right]").click(()=>{
      if(!$ul.is(":animated")){
        moved++;
        move()
      }
    });
    $("[data-move=left]").click(()=>{
      if(!$ul.is(":animated")){
        if(moved==0){
          $ul.css("left",-LIWIDTH*data.length);
          moved=5
        }
        moved--;
        move()
      }
    });
  })
});
//动态加载精品介绍
$(()=>{
  var des="日本";//关键字 destination 目的地
  //绑定单击事件
  $(".boutique-top").on(
    "click",
    "li>a",
    e=>{
      des=$(e.target).html();
      $(e.target).parent().addClass("active").siblings().removeClass("active");
      //console.log(des);
      boutique(des);
    });
  //console.log(des);
  function boutique(des){
    var html="";
    $.ajax({
      type:"post",
      url:"data/index/getBoutique.php",
      data:{des:des}
    }).then(data=>{
      //console.log(data);
      //console.log(data[0].md);
      for(var i=0;i<data.length;i++){
        //console.log(data[i]);
        html+=`<div class="content-box">
          <div class="content-img">
            <a href="product_details.html?pid=${data[i].pid}">
              <img src="${data[i].md}" alt=""/>
              <div>
                <div>
                  ${data[i].title}
                </div>
              </div>
            </a>
          </div>
          <div class="content-tit">
            <div class="content-lf">
              ¥<span>${data[i].price}</span>起
            </div>
            <div class="content-rt">
              出发地:<span>${data[i].origin}</span>
            </div>
          </div>
        </div>`;
      }
      $(".boutique-content").html(html);
    });
  }
  boutique(des);
});
//动态加载前十榜
$(()=>{
  var area="亚洲";//关键字 area 区域
  //绑定单击事件
  $(".topTen-top").on(
    "click",
    "div>a",
      e=>{
        area=$(e.target).html();
      $(e.target).parent().addClass("active").siblings().removeClass("active");
      // console.log(area);
      topTen(area);
    });
  function topTen(area){
    var html="";
    $.ajax({
      type:"post",
      url:"data/index/getTopTen.php",
      data:{area:area}
    }).then(data=>{
      //console.log(data);
      for(var i=0;i<data.length;i++){
        //console.log(data[i]);
        html+=`<div class="content-box">
          <div class="content-img">
            <a href="javascript:;" data-kw="${data[i].country}">
              <img src="${data[i].img}" alt=""/>
              <div>Top${data[i].ranking}</div>
            </a>
          </div>
          <div class="content-tit">
            <div class="content-lf">
              <span>${data[i].country}</span>|<span>${data[i].place}</span>
            </div>
            <div class="content-rt">
              <span class="c-lf"><a href="javascript:;">游记</a></span>
              <span class="c-rt"><a href="javascript:;">指南</a></span>
            </div>
          </div>
        </div>`;
      }
      $(".topTen-content").html(html);
    });
  }
  topTen(area);
  // console.log(area);
});
//动态加载人气指南
$(()=>{
  var html="";
  $.post("data/index/getGuide.php")
    .then(data=>{
    //console.log(data);
    //console.log(data[0].md);
    for(var i=0;i<data.length;i++){
    //  console.log(data);
      html+=`<li>
          <a href="guide.html?gid=${data[i].gid}">
            <img src="${data[i].sm}" alt="">
            <span class="btn-dnld"></span>
          </a>
          <div class="guide-info">
            <a href="guide.html?gid=${data[i].gid}">${data[i].title}</a>
            <div class="date-and-size">
              <div class="update-date">${data[i].update_date}</div>
              <div class="file-size">${data[i].file_size}M</div>
            </div>
          </div>
        </li>`;
    }
    $(".guide-content>ul").html(html);
  });
});
//动态加载旅行者游记
$(()=>{
  var html="";
  $.post("data/index/getTravelNotes.php")
    .then(data=>{
      // console.log(data);
      //console.log(data[0].md);
      for(var i=0;i<data.length;i++){
        //  console.log(data);
        html+=`<div class="content-box">
          <div class="content-img">
            <a href="travel_notes.html?nid=${data[i].nid}">
              <img src="${data[i].header_pic}" alt=""/>
            </a>
          </div>
          <div class="content-tit">
            <a href="travel_notes.html?nid=${data[i].nid}">
              <div class="title">${data[i].title}</div>
            </a>
            <div class="dest-info">
              <span class="dest-icon"></span>
              <span class="dest-name">${data[i].dest_name}</span>
            </div>
            <div class="text-brief">${data[i].text_brief} </div>
            <div class="author-info">
              <span class="writer">${data[i].writer}</span>
              <span class="publish-date">${data[i].publish_date}</span>
            </div>
          </div>
        </div>`;
      }
      $(".notes-content").html(html);
    });
});