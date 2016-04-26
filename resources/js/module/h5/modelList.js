define(['tplM'], function () {
    console.log('H5模型列表页');
    $('.choosePanel').on('tap', function () {
        var t = $('.panel-style');
        console.log(t.hasClass('show'));
        if (t.hasClass('show')) {
            t.removeClass('show');
        } else {
            t.addClass('show');
        }
        return false;
    });
    $('body').on('tap', '.img', function () {
        var id = $(this).data('id');
        location.href = '/h5/models/preview/' + id;
        return false;
    });
    var width = $(window).width() / 2 - 10;
    $('.panel-style li').on('tap', function () {
        var style = $(this).data('style');
        console.log(style);
        var choosePanel = '.panel-' + style;
        var isStyle = $('body').find(choosePanel);
        if (isStyle.length == 0) {
            $('body').append('<div class="panel panel-' + style + '"></div>');
            $.get('/models/list/style/' + style, function (e) {
                console.log(e);
                if (e.length == 0) {
                    $(choosePanel).html('该分类' + style + '暂时没有模型');
                } else {
                    var dest = $.tpl('model-list', {list: e, width: width});
                    $(choosePanel).append(dest);
                }
                $('.panel').removeClass('show');
                $(choosePanel).addClass('show');
            });
        } else {
            $('.panel').removeClass('show');
            $(choosePanel).addClass('show');
        }
        return false;

    })
});