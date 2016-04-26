var express = require('express');
var router = express.Router();

var ModelEntity = require('../models/Model').ModelEntity;
var UserEntity = require('../models/User').UserEntity;

//h5端分类展示页面
router.get('/list', function (req, res, next) {
    res.render('h5/modelList', {title: '模型列表', layout: false});
});
//h5端指定模型预览页面
router.get('/models/preview/:modelid', function (req, res, next) {
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
                var date = new Date(model.createTime);
                res.render('h5/webPreview', {
                    layout: false,
                    title: model.name,
                    model: model,
                    created_at: date.toLocaleDateString(),
                    model_user_name: user.name,
                    model_user_avatar: user.avatar,
                    model_user_sex: user.sex
                });
            });
        }
    });
});
//h5端VR页面
router.get('/models/vr/:modelid', function (req, res, next) {
    ModelEntity.findOne({_id: req.params.modelid}, function (err, model) {
        var restResult = '';
        if (err) {//查询异常
            restResult = "服务器异常";
            console.log(err);
            res.send(restResult);
            return;
        }
        if (model) {//model存在
            res.render('h5/vr', {
                layout: false,
                title: model.name,
                model: model
            });
        }
    });
});

module.exports = router;