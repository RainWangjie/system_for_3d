/**
 * Created by gewangjie on 16/4/9.
 */
var express = require('express');
var router = express.Router();
var wj_util = require('../routes/wj_util');
//var qiniu_mySelf = require('../routes/qiniu');
var http = require('http');
var fs = require('fs');
var qiniu = require("qiniu");

var UserEntity = require('../models/User').UserEntity;
var StyleEntity = require('../models/Style').StyleEntity;
var ModelEntity = require('../models/Model').ModelEntity;
var localFileEntity = require('../models/localFile').localFileEntity;


//上传页面
router.get('/upload', wj_util.authorize, function (req, res, next) {
    StyleEntity.find(function (err, style) {
        var restResult = '';
        if (err) {//查询异常
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }
        res.render('uploadModels', {
            title: '上传模型',
            user_name: req.session.user_name,
            user_avatar: req.session.user_avatar,
            styleList:style
        });
    });
});
//上传接口
router.post('/upload', wj_util.authorize, function (req, res, next) {
    var imgUrlList = JSON.parse(req.body.imgUrl);
    var imgNameList = JSON.parse(req.body.imgName);

    var newModel = new ModelEntity({
        name: req.body.modelName,//模型名
        descriptions: req.body.descriptions,//描述
        userId: req.session.user_id,//创建者ID
        typeId: req.body.typeId,//分类ID
        previewImg: req.body.previewImg,//模型预览图
        objUrl: req.body.objUrl,//obj文件七牛链接
        mtlUrl: req.body.mtlUrl,//mtl文件七牛链接
        imgUrl: imgUrlList//贴图文件七牛链接
    });

    newModel.save(function (err, model) {
        var restResult = '';
        if (err) {//服务器保存异常
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }
        if (model) {
            var objFile = new localFileEntity({
                modelId: model._id,
                fileName: req.body.objName,
                qiniuUrl: req.body.objUrl
            });
            objFile.save(function (err) {
                var restResult = '';
                if (err) {//服务器保存异常
                    restResult = "服务器异常";
                    res.send(restResult);
                    return;
                }
            });
            var mtlFile = new localFileEntity({
                modelId: model._id,
                fileName: req.body.mtlName,
                qiniuUrl: req.body.mtlUrl
            });
            mtlFile.save(function (err) {
                var restResult = '';
                if (err) {//服务器保存异常
                    restResult = "服务器异常";
                    res.send(restResult);
                    return;
                }
            });
            for (var i in imgNameList) {
                var imgFile = new localFileEntity({
                    modelId: model._id,
                    fileName: imgNameList[i],
                    qiniuUrl: imgUrlList[i]
                });
                imgFile.save(function (err) {
                    var restResult = '';
                    if (err) {//服务器保存异常
                        restResult = "服务器异常";
                        res.send(restResult);
                        return;
                    }
                });
            }
            restResult = '上传成功';
            res.send(restResult);//返回成功结果
            http.get('http://7xs7nv.com1.z0.glb.clouddn.com/' + req.body.mtlUrl, function (response) {
                var filePath_download = './tempMTL/download_' + req.body.mtlName;
                var filePath_upload = './tempMTL/upload_' + req.body.mtlName;
                var file = fs.createWriteStream(filePath_download);
                response.pipe(file);
                response.on('end', function () {
                    fs.readFile(filePath_download, 'utf-8', function (err, data) {
                        if (err) throw err;
                        console.log("读取数据成功！");
                        var fileContent = data.toString();
                        console.log("--------我是分割线-------------");
                        for (var i in imgNameList) {
                            var reg = new RegExp(imgNameList[i], "g");
                            console.log(imgNameList[i], reg.test(imgNameList[i]));
                            console.log(imgNameList[i] + '替换成' + imgUrlList[i]);
                            fileContent = fileContent.replace(reg, imgUrlList[i]);
                        }
                        console.log("--------我是分割线-------------");
                        fs.writeFile(filePath_upload, fileContent, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                            console.log("--------我是分割线-------------");
                            console.log("数据写入成功！");
                            console.log("上传qiniu...");

                            //构造上传函数
                            function uploadFile(uptoken, localFile) {
                                var extra = new qiniu.io.PutExtra();
                                qiniu.io.putFile(uptoken, '', localFile, extra, function (err, ret) {
                                    if (!err) {
                                        // 上传成功， 处理返回值
                                        //console.log(ret.hash, ret.key, ret.persistentId);
                                        console.log("上传qiniu success");
                                        ModelEntity.update({'_id': model._id}, {
                                            mtlUrl: ret.key,
                                            isTranslate: true
                                        }, function (err, model) {
                                            if (err) {//服务器保存异常
                                                console.log(err);
                                                return;
                                            }
                                            console.log("MongoDB updata success!!!");
                                        })
                                    } else {
                                        // 上传失败， 处理返回代码
                                        console.log(err);
                                    }
                                });
                            }

                            //调用uploadFile上传
                            uploadFile(uptoken(bucket), filePath_upload);
                        });
                    });
                });
            });
        }
    });

});
//用户模型列表接口
router.get('/userfind', function (req, res, next) {
    ModelEntity.find({userId: req.session.user_id}, function (err, model) {
        var restResult = '';
        if (err) {//查询异常
            restResult = "服务器异常";
            console.log(err);
            res.send(restResult);
            return;
        }

        if (model) {//model存在
            restResult = model;
            res.send(restResult);
        }
    });
});
//分类模型页面
router.get('/list', function (req, res, next) {
    res.render('modelList', {
        title: '模型列表',
        user_name: req.session.user_name,
        user_avatar: req.session.user_avatar
    });
});
//分类模型接口
router.get('/list/style/:modelstyle', function (req, res, next) {
    if(req.params.modelstyle == 0){
        ModelEntity.find(function (err, model) {
            var restResult = '';
            if (err) {//查询异常
                restResult = "服务器异常";
                console.log(err);
                res.send(restResult);
                return;
            }
            if (model) {//model存在
                restResult = [];
                for (var i in model) {
                    restResult.push({
                        id: model[i]._id,
                        name: model[i].name,
                        previewImg: model[i].previewImg
                    })
                }
                res.send(restResult);
            }
        });
    }else{
        ModelEntity.find({isPass: true, typeId: req.params.modelstyle}, function (err, model) {
            var restResult = '';
            if (err) {//查询异常
                restResult = "服务器异常";
                console.log(err);
                res.send(restResult);
                return;
            }
            if (model) {//model存在
                restResult = [];
                for (var i in model) {
                    restResult.push({
                        id: model[i]._id,
                        name: model[i].name,
                        previewImg: model[i].previewImg
                    })
                }
                res.send(restResult);
            }
        });
    }
});
//web端指定模型预览
router.get('/web/:modelid', function (req, res, next) {
    ModelEntity.findOne({_id: req.params.modelid}, function (err, model) {
        var restResult = '';
        if (err) {//查询异常
            restResult = "服务器异常";
            console.log(err);
            res.send(restResult);
            return;
        }
        if (model) {//model存在
            UserEntity.findOne({_id: model.userId}, function (err, user) {
                res.render('webPreview', {
                    title: model.name,
                    model: model,
                    model_user_name: user.name,
                    model_user_avatar: user.avatar,
                    model_user_sex: user.sex,
                    user_name: req.session.user_name,
                    user_avatar: req.session.user_avatar,
                    is_model_option: false
                });
            });

        }
    });
});
//web端model_option更新
router.post('/web/update_model_option', function (req, res, next) {
    ModelEntity.findOne({_id: req.body.model_id}, function (err, model) {
        var restResult = '';
        if (err) {//查询异常
            restResult = "服务器异常";
            console.log(err);
            res.send(restResult);
            return;
        }
        if (model.userId == req.session.user_id) {
            update_model_option(req, res);
        }
    });
});
//web端模型基本信息编辑
router.post('/web/edit_model_message', function (req, res, next) {
    ModelEntity.findOne({_id: req.body.model_id}, function (err, model) {
        var restResult = '';
        if (err) {//查询异常
            restResult = "服务器异常";
            console.log(err);
            res.send(restResult);
            return;
        }
        if (model.userId == req.session.user_id) {
            edit_model_message(req, res);
        }
    });
});

function update_model_option(req, res) {
    ModelEntity.update({'_id': req.body.model_id}, {modelOption: JSON.parse(req.body.model_option)}, function (err, model) {
        var restResult = '';
        if (err) {
            restResult = "服务器异常";
            res.status(500).send(restResult);
            return;
        } else {
            res.send('更新成功');
        }
    });
}

function edit_model_message(req, res) {
    ModelEntity.update({'_id': req.body.model_id}, {
        name: req.body.name,
        descriptions: req.body.descriptions,
        typeId: req.body.typeId
    }, function (err, model) {
        var restResult = '';
        if (err) {
            restResult = "服务器异常";
            res.status(500).send(restResult);
            return;
        }
        if (model) {
            res.send('更新成功');
        }
    });
}

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '1xLOwApwb7DxXxFtR9czJ33LvGPULks4xABiiAX5';
qiniu.conf.SECRET_KEY = '86YYdqGfUdXLDmro3R4yJKTyUBat4hrpXBraf2zD';
//要上传的空间
bucket = 'systemfor3d';
//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket);
    return putPolicy.token();
}

module.exports = router;


