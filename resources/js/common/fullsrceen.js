/**
 * Created by gewangjie on 16/4/28.
 */
define([], function () {
    //判断是否全屏
    function fullscreen() {
        return document.fullscreen ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            false;
    }

    //全屏
    function requestFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.webkitRequestFullScreen) {
            // 对 Chrome 特殊处理，
            // 参数 Element.ALLOW_KEYBOARD_INPUT 使全屏状态中可以键盘输入。
            if (window.navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            // Safari 浏览器中，如果方法内有参数，则 Fullscreen 功能不可用。
            else {
                elem.webkitRequestFullScreen();
            }
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
    }

    //退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }

    return {
        full: requestFullscreen,
        exitFull: exitFullscreen
    };
});