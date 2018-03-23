function getFocus(){
  var $tar=$(this)
  $tar.addClass("txt_focus")
  $tar.nextAll("span").removeClass("vali_info")
}
function getBlur(){
  var $tar=$(this)
  $tar.removeClass("txt_focus")
  $tar.nextAll("span").addClass("vali_info")
}
$(()=>{
  var $banner=$(".main>.banner")
  var $clientH=window.innerHeight
  $banner.children().css("height",$clientH)
  $banner.children().children().css("height",$clientH)
  //轮播图
  function task(){
    var $show=$(".main>.banner>.banImg.show");
    $show.removeClass();
    $show.addClass("banImg");
    if($show.next().is(".banImg")){
      $show.next().addClass("show")
    }else{
      $show.parent().find("#ban1").addClass("show")
    }
  }
  setInterval(task,12000)
});
