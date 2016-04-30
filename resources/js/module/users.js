/**
 * Created by gewangjie on 16/4/6.
 */
$('.users_operation button').on('click', function () {
    var action = $(this).data('action');
    var mobile = $('#mobile').val();
    if (!/1\d{10}/.test(mobile)) {
        alert('请输入正确手机号！');
        return;
    }
    var password = $('#passward').val();
    if (!password || password.length < 6) {
        alert('请输入大于6位的密码！');
        return;
    }
    console.log('手机号', mobile, '密码：', password);
    var data = {
        mobile: mobile,
        password: password
    };
    console.log($(this).data('action'));
    if (action == 'register') {
        $.post('/users/register', data, function (e) {
            alert(e);
            location.href = '/index';
        });
    } else {
        $.post('/users/login', data, function (e) {
            alert(e.result);
            if (e.url) {
                location.href = e.url;
            }
        });
    }

});