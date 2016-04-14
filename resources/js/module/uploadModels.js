/**
 * Created by gewangjie on 16/4/12.
 */
define(['util'], function (util) {
    console.log('上传模块加载完成');
    var model = {
        modelName: '',
        descriptions: '',
        previewImg: '',
        typeId: 1,
        objUrl: '',
        objName: '',
        mtlUrl: '',
        mtlName: '',
        imgUrl: '',
        imgName: ''
    };
    var progress = $('#progress'),
        isPreview = true,
        isObj = true,
        isMtl = true,
        isImg = true;
    $.get('/qiniu/token', function (e) {
        util.initQiniu(e, 'btn_add_preview', '模型预览图', 'jpg,png', previewAdded, previewUploaded, progress);
        util.initQiniu(e, 'btn_add_obj', '模型obj文件', 'obj', objAdded, objUploaded, progress);
        util.initQiniu(e, 'btn_add_mtl', '模型mtl文件', 'mtl', mtlAdded, mtlUploaded, progress);
        util.initQiniu(e, 'btn_add_img', '模型贴图文件', 'jpg,png', imgAdded, imgUploaded, progress);

    });
    $('#upload-model').on('click', function () {
        model.modelName = $('#model_name').val();
        model.descriptions = $('#model_descriptions').val();
        model.typeId = $('#model_type').val();
        console.log(model);
        if (isPreview && isMtl && isObj && isImg) {
            if (!model.modelName) {
                util.shake('#model_name');
                return;
            }
            if (!model.previewImg) {
                util.shake('#btn_add_preview');
                return;
            }
            if (!model.objUrl) {
                util.shake('#btn_add_obj');
                return;
            }
            if (!model.mtlUrl) {
                util.shake('#btn_add_mtl');
                return;
            }
            if (!model.imgUrl) {
                util.shake('#btn_add_img');
                return;
            }
            model.imgUrl = model.imgUrl.substring(0, model.imgUrl.length - 1);
            model.imgName = model.imgName.substring(0, model.imgName.length - 1)

            $.post('/models/upload', model, function (e) {
                alert(e);
            });
        } else {
            alert('上传中稍等。。。')
        }
    });
    function previewAdded(up, files) {
        isPreview = false;
        plupload.each(files, function (file) {
            progress.show().html('加载中');
            up.start();
            var fileReader = new FileReader();
            fileReader.onload = function () {
                $('#previewImg').show().attr('src', this.result);
            };
            fileReader.readAsDataURL(file.getSource().getSource());
        });
    }

    function previewUploaded(up, file, info) {
        var res = JSON.parse(info);
        model.previewImg = 'http://7xs7nv.com1.z0.glb.clouddn.com/' + res.key;
        $('#progress').html(file.name + '上传成功！');
        isPreview = true;
    }

    function objAdded(up, files) {
        isObj = false;
        plupload.each(files, function (file) {
            progress.show().html('加载中');
            up.start();
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file.getSource().getSource());
        });
    }

    function objUploaded(up, file, info) {
        var res = JSON.parse(info);
        model.objUrl = 'http://7xs7nv.com1.z0.glb.clouddn.com/' + res.key;
        model.objName = file.name;
        $('#progress').html(file.name + '上传成功！');
        $('#obj-text').html(file.name);
        isObj = true;
    }

    function mtlAdded(up, files) {
        isMtl = false;
        plupload.each(files, function (file) {
            progress.show().html('加载中');
            up.start();
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file.getSource().getSource());
        });
    }

    function mtlUploaded(up, file, info) {
        var res = JSON.parse(info);
        model.mtlUrl = 'http://7xs7nv.com1.z0.glb.clouddn.com/' + res.key;
        model.mtlName = file.name;
        $('#progress').html(file.name + '上传成功！');
        $('#mtl-text').html(file.name);
        isMtl = true;
    }

    function imgAdded(up, files) {
        isImg = false;
        plupload.each(files, function (file) {
            progress.show().html('加载中');
            up.start();
            var fileReader = new FileReader();
            fileReader.onload = function () {
                $('.imgList').append('<img src="' + this.result + '" width="180px">');
            };
            fileReader.readAsDataURL(file.getSource().getSource());
        });
    }

    function imgUploaded(up, file, info) {
        var res = JSON.parse(info);
        model.imgUrl += res.key;
        model.imgUrl += ',';
        model.imgName += file.name;
        model.imgName += ',';
        $('#progress').html(file.name + '上传成功！');
        isImg = true;
    }

    //http://7xs7nv.com1.z0.glb.clouddn.com/
});