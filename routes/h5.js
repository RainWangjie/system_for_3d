var express = require('express');
var router = express.Router();

var ModelEntity = require('../models/Model').ModelEntity;
var UserEntity = require('../models/User').UserEntity;

//h5端分类展示
router.get('/list', function (req, res, next) {
    res.render('h5/modelList', {title: '模型列表', layout: false});
});
//h5端指定模型预览
router.get('/model/:modelid', function (req, res, next) {
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
                res.render('h5/webPreview', {
                    title: model.name,
                    model: model,
                    model_user_name: user.name,
                    model_user_avatar: user.avatar,
                    model_user_sex: user.sex,
                    user_name: req.session.user_name,
                    user_avatar: req.session.user_avatar
                });
            });
        }
    });
});
module.exports = router;