/**
 * Created by gewangjie on 16/4/1.
 */
define([],function(){
    $.ajaxSetup({
        error: function(e){
            console.log(arguments);
            alert(e.responseText)
        }
    });
   function shake_input(e){
       $(e).addClass('shake');
       setTimeout(function(){
           $(e).removeClass('shake')
       },1000);
   }
    return {
        shake:shake_input
    }
});