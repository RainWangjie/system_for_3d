/**
 * Created by gewangjie on 16/4/5.
 */
define(['util', 'tplM'], function (util) {
    var user_data = user,
        isAvatar = true;
    $('#user_sex').val(user_data.sex);
    $('#btn_update_message').on('click', function () {
        var name = $('#user_name').val();
        var mobile = $('#user_mobile').val();
        if (!name) {
            util.shake('#user_name');
            return;
        }
        if (!mobile) {
            util.shake('#user_mobile');
            return;
        }
        user_data.name = name;
        user_data.mobile = mobile;
        user_data.sex = $('#user_sex').val();
        user_data.birthday = $('#user_birthday').val();

        console.log(user_data);
        if (isAvatar) {
            $.post('/users/update', user_data, function (e) {
                alert(e);
                location.reload();
            });
        } else {
            util.shake('#btn_update_message');
        }

        return false;
    });
    $('#btn_reset_password').on('click', function () {
        $('.panel_reset_password').addClass('show');
    });
    $('#btn_reset_password_1').on('click', function () {
        console.log('重置');
        var old_password = $('#old_password').val();
        var new_password_1 = $('#new_password_1').val();
        var new_password_2 = $('#new_password_2').val();
        if (!old_password) {
            util.shake('#old_password');
            return;
        }
        if (!new_password_1 || new_password_1.length < 6) {
            util.shake('#new_password_1');
            return;
        }
        if (!new_password_2) {
            util.shake('#new_password_2');
            return;
        }
        if (new_password_1 !== new_password_2) {
            util.shake('#new_password_1');
            util.shake('#new_password_2');
            return;
        }
        $.post('/users/resetPassword', {
            oldPassword: old_password,
            newPassword1: new_password_1,
            newPassword2: new_password_2
        }, function (e) {
            alert(e);
            removePasswordPanel();
        });
    });
    $('#btn_reset_password_2').on('click', function () {
        removePasswordPanel();
    });
    function removePasswordPanel() {
        $('.panel_reset_password input').val('');
        $('.panel_reset_password').removeClass('show');
    }

    var progress = $('#progress');
    $.get('/qiniu/token', function (e) {
        util.initQiniu(e, 'btn_add_avatar', '头像', 'jpg,png', avatarAdded, avatarUploaded, progress);
    });
    function avatarAdded(up, files) {
        isAvatar = false;
        plupload.each(files, function (file) {
            progress.show().html('加载中');
            up.start();
            var fileReader = new FileReader();
            fileReader.onload = function () {
                $('#user_avatar').attr('src', this.result);
            };
            fileReader.readAsDataURL(file.getSource().getSource());
        });
    }

    function avatarUploaded(up, file, info) {
        var res = JSON.parse(info);
        user_data.avatar = 'http://7xs7nv.com1.z0.glb.clouddn.com/' + res.key;
        $('#progress').html(file.name + '上传成功！');
        isAvatar = true;
        console.log(res);
    }

    $.get('/models/userfind', function (e) {
        console.log(e);
        if (e.length !== 0) {
            var dest = $.tpl('tpl', {model: e});
            $('.user-model-list').html(dest);
        } else {
            $('.user-model-list').html('您还没上传作品');
        }
    });

    $('body').on('click','.model-delete',function(){
        var id = $(this).data('id'),
            name = $(this).data('name');
        if(confirm('确认删除模型【'+name+'】')){
            $.post('/web/delete_model/'+id,function(e){
                alert(name+e);
            });
        }
    })
});