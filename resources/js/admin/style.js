/**
 * Created by gewangjie on 16/4/1.
 */
define(['util'], function (util) {
    $('#add_style').on('click', function () {
        var name = $('#style_name').val();
        if (!name) {
            util.shake('#style_name');
            return;
        }
        if (confirm('确认添加类型［' + name + '］')) {
            $.post('/admin/addStyle', {name: name}, function (e) {
                alert(e);
            });
        }
        return false;
    });

    $('.delete_style').on('click', function () {
           var name = $(this).data('name'),
               id = $(this).data('id');
        if(confirm('确认删除'+name+'?')){
            $.post('/admin/deleteStyle',{id:id},function(){
                alert(name+'删除成功');
            });
        }
    });
});