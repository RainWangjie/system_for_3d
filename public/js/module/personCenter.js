define(["util","tplM"],function(e,s){function a(){$(".panel_reset_password input").val(""),$(".panel_reset_password").removeClass("show")}function o(e,s){t=!1,plupload.each(s,function(s){l.show().html("加载中"),e.start();var a=new FileReader;a.onload=function(){$("#user_avatar").attr("src",this.result)},a.readAsDataURL(s.getSource().getSource())})}function n(e,s,a){var o=JSON.parse(a);r.avatar="http://7xs7nv.com1.z0.glb.clouddn.com/"+o.key,$("#progress").html(s.name+"上传成功！"),t=!0,console.log(o)}var r=user,t=!0;$("#user_sex").val(r.sex),$("#btn_update_message").on("click",function(){var s=$("#user_name").val(),a=$("#user_mobile").val();return s?a?(r.name=r.name,r.mobile=a,r.sex=$("#user_sex").val(),r.birthday=$("#user_birthday").val(),console.log(r),t?$.post("/users/update",r,function(e){alert(e),location.reload()}):e.shake("#btn_update_message"),!1):void e.shake("#user_mobile"):void e.shake("#user_name")}),$("#btn_reset_password").on("click",function(){$(".panel_reset_password").addClass("show")}),$("#btn_reset_password_1").on("click",function(){console.log("重置");var s=$("#old_password").val(),o=$("#new_password_1").val(),n=$("#new_password_2").val();return s?!o||o.length<6?void e.shake("#new_password_1"):n?o!==n?(e.shake("#new_password_1"),void e.shake("#new_password_2")):void $.post("/users/resetPassword",{oldPassword:s,newPassword1:o,newPassword2:n},function(e){alert(e),a()}):void e.shake("#new_password_2"):void e.shake("#old_password")}),$("#btn_reset_password_2").on("click",function(){a()});var l=$("#progress");$.get("/qiniu/token",function(s){e.initQiniu(s,"btn_add_avatar","头像","jpg,png",o,n,l)}),$.get("/models/userfind",function(e){console.log(e);var s=$.tpl("tpl",{model:e});$(".user-model-list").html(s)})});