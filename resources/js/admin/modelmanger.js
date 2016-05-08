/**
 * Created by gewangjie on 16/5/6.
 */
define(['tplM'], function () {
    $('.model-type').on('change', function () {
        get_model($(this).val());
    });
    function get_model(style) {
        $.get('/models/list/style/' + style, function (e) {
            console.log(e);
            if (e.length !== 0) {
                var dest = $.tpl('tpl', {model: e});
                $('.model-list').html(dest);
            } else {
                $('.model-list').html('此分类暂无作品');
            }
        });
    }

    get_model(0);
    $('.model-list').on('click', '.model-audit-failed', function () {
        var model_id = $(this).data('id');
        var el = $(this);
        $.post('/admin/audit/failed/' + model_id, function (e) {
            alert(e);
            el.parents('.col-md-4').remove();
        });
    });
});