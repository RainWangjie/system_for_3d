/**
 * Created by gewangjie on 16/4/9.
 */
var express = require('express');
var router = express.Router();
var isLogin = require('../routes/isLogin');
var http = require('http');
var fs = require('fs');
var qiniu = require("qiniu");

var UserEntity = require('../models/User').UserEntity;
var StyleEntity = require('../models/Style').StyleEntity;
var ModelEntity = require('../models/Model').ModelEntity;
var localFileEntity = require('../models/localFile').localFileEntity;


//上传页面
router.get('/upload', isLogin.authorize, function (req, res, next) {
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
            styleList: style
        });
    });
});
//上传接口
router.post('/upload', isLogin.authorize, function (req, res, next) {
    var newModel = new ModelEntity({
        name: req.body.modelName,//模型名
        descriptions: req.body.descriptions,//描述
        userId: req.session.user_id,//创建者ID
        typeId: req.body.typeId,//分类ID
        previewImg: req.body.previewImg,//模型预览图
        objUrl: req.body.objUrl,//obj文件七牛链接
        mtlUrl: req.body.mtlUrl//mtl文件七牛链接
    });
    var imgUrlList = req.body.imgUrl.split(',');
    var imgNameList = req.body.imgName.split(',');
    for (var i in imgUrlList) {
        newModel.imgUrl.push('http://7xs7nv.com1.z0.glb.clouddn.com/' + imgUrlList[i]);
    }
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
                    qiniuUrl: 'http://7xs7nv.com1.z0.glb.clouddn.com/' + imgUrlList[i]
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
            http.get(req.body.mtlUrl, function (response) {
                var filePath = '../tempMTL/up'+req.body.mtlName;
                var file = fs.createWriteStream(filePath);
                response.pipe(file);
                fs.readFile(filePath,function(err,data){
                    if(err) throw err;
                    console.log(data);
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
            if (model.userId == req.session.user_id) {
                UserEntity.findOne({_id: model.userId}, function (err, user) {
                    res.render('webPreview', {
                        title: model.name,
                        model: model,
                        model_user_name: user.name,
                        model_user_avatar: user.avatar,
                        model_user_sex: user.sex,
                        user_name: req.session.user_name,
                        user_avatar: req.session.user_avatar
                    });
                });
            } else {
                console.log('查看模型user不匹配重定向首页!');
                res.redirect('/index');
            }
        }
    });
});
module.exports = router;


