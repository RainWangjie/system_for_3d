/**
 * Created by gewangjie on 16/4/21.
 */
define(['tplM'],function(){
    var style = location.search.split('=')[1];
    $.get('/models/list/style/'+style,function(e){
        console.log(e);
        if (e.length !== 0) {
            var dest = $.tpl('tpl', {model: e});
            $('.style-model-list').html(dest);
        } else {
            $('.style-model-list').html('该分类暂时没有模型可以查看');
        }
    })
});