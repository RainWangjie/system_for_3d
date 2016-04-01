/**
 * Created by gewangjie on 16/4/1.
 */
define([],function(){
    $('.users_button button').on('click',function(){
        var mobile = $('#mobile').val();
        if(!/1\d{10}/.test(mobile)){
            alert('请输入正确手机号！');
            return;
        }
        var password = $('#passward').val();
        if(!password || password.length < 6){
            alert('请输入大于6位的密码！');
            return;
        }
        console.log('手机号',mobile,'密码：',password);
        var data = {
            mobile:mobile,
            password:password
        };
        console.log($(this).data('action'));
        if($(this).data('action') == 'register'){
            $.post('/users/register',data,function(e){
                alert(e);
            });
        }else{
            $.post('/users/login',data,function(e){
                alert(e);
            });
        }

    });
});