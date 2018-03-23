/*需要先加载jQuery*/
if(typeof jQuery!=="function")
  throw new Error(
    "dong-boot依赖于jquery,请先引入jquery.js");
else{
/*****自定义插件只允许添加在本行之后*****/
/*表单自定义验证(需要先加载jquery.validate.js)*/
  /*表单验证*/
  $(()=>{
    // 手机号码验证
    $.validator.addMethod(
      "phone",
      function(val){//val接收将来要验证的数据
        if(val.length>0)
          return /^(\+86|0086)?\s*1[34578]\d{9}$/.test(val);
        else
          return true
      },
      "手机号码格式不正确!"
    );
    // 性别验证
    $.validator.addMethod(
      "gender",
      function(val){
        if(val==1||val==2){
          return true
        }else{
          return false
        }
      },
      "请选择性别!"
    );
    // 字符验证
    $.validator.addMethod(
      "string",
      function(val){
        return /^[\u0391-\uFFE5\w]+$/.test(val);
      },
      "不允许包含特殊符号!"
    );
    // 字母数字
    $.validator.addMethod(
      "alnum",
      function(val){
        return /^[a-zA-Z0-9]+$/.test(val);
      },
      "只能包括英文字母和数字!"
    );
  });

  /*****自定义插件只允许添加在本行之前*****/
}