/**
 * Created by gewangjie on 16/4/14.
 */
define([], function () {
    $('.model-audit-pass').on('click', function () {
        var model_id = $(this).data('id');
        var el = $(this);
        $.post('/admin/audit/pass/' + model_id, function (e) {
            alert(e);
            el.parents('.col-md-4').remove();
        });
    });
    $('.model-audit-failed').on('click', function () {
        var model_id = $(this).data('id');
        var el = $(this);
        $.post('/admin/audit/failed/' + model_id, function (e) {
            alert(e);
            el.parents('.col-md-4').remove();
        });
    });
});