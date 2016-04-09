/**
 * Created by gewangjie on 16/4/1.
 */
define(['jquery'], function ($) {
    $.ajaxSetup({
        error: function (e) {
            console.log(arguments);
            alert(e.responseText)
        }
    });
    function shake_input(e) {
        $(e).addClass('shake');
        setTimeout(function () {
            $(e).removeClass('shake')
        }, 1000);
    }
    /*
    token上传凭证,btn触发按钮,title文件旋转面板标题,extensions文件类型,fileAdded上传前方法,fileUploaded文件上传完成,progress进度条,maxSize文件体积限制
     */
    function initQiniu(token,btn,title,extensions,fileAdded,fileUploaded,progress,maxSize) {
        var uploader =new QiniuJsSDK().uploader({
            runtimes       : 'html5,flash,html4',    //上传模式,依次退化
            browse_button  : btn,       //上传选择的点选按钮，**必需**
            uptoken        : token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
            unique_names   : true, // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
            save_key       : true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
            domain         : 'http://7xj86j.com2.z0.glb.qiniucdn.com/',   //bucket 域名，下载资源时用到，**必需**
            // container      : 'uploader',           //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size  : maxSize || '100mb',           //最大文件体积限制
            flash_swf_url  : '/js/upload/Moxie.swf',  //引入flash,相对路径
            max_retries    : 3,                   //上传失败最大重试次数
            dragdrop       : true,              //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size     : '4mb',                //分块上传时，每片的体积
            auto_start     : false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            filters        : [
                {title: title, extensions: extensions}
            ],
            multi_selection: true,
            init           : {
                'FilesAdded'  : fileAdded,
                'UploadProgress': function (up, file) {
                    progress.html(file.percent + "%");
                },
                'FileUploaded'  : fileUploaded,
                'Error'         : function (up, err, errTip) {
                    //上传出错时,处理相关的事情
                },
                'UploadComplete': function () {
                    //队列文件处理完毕后,处理相关的事情
                }
            }
        });
    }



    return {
        shake: shake_input,
        initQiniu:initQiniu
    }
});