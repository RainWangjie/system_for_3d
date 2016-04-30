/**
 * Created by gewangjie on 16/3/30.
 */
var express = require('express');
var isLogin = require('../routes/isLogin');
var router = express.Router();

var UserEntity = require('../models/User').UserEntity;
var StyleEntity = require('../models/Style').StyleEntity;
var ModelEntity = require('../models/Model').ModelEntity;
var localFileEntity = require('../models/localFile').localFileEntity;

router.get('/', isLogin.admin, function (req, res, next) {
    console.log('后台管理');
    res.render('admin/index', {title: '后台管理', user_name: req.session.user_name, user_avatar: req.session.user_avatar});
});

//类型管理页面
router.get('/style', isLogin.admin, function (req, res, next) {
    console.log('后台管理-类型管理');
    StyleEntity.find(function (err, style) {
        var restResult = '';
        if (err) {//查询异常
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }
        res.render('admin/style', {title: '后台管理-类型管理', styleList: style});
    });
});
//增加类型接口
router.post('/addStyle', function (req, res, next) {
    var restResult = '';
    var name = req.body.name;
    console.log(name);
    StyleEntity.findOne({styleName: name}, '_id', function (err, style) {
        if (err) {//查询异常
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }

        if (style) {//手机号已注册
            restResult = "类型已存在";
            res.status(501).send(restResult);
            return;
        }

        var registerStyle = new StyleEntity({styleName: name});
        //调用实体的实例的保存方法
        registerStyle.save(function (err, row) {
            if (err) {//服务器保存异常
                restResult = "服务器异常";
                res.send(restResult);
                return;
            }
            restResult = '添加成功';
            res.send(restResult);//返回成功结果

        });

    });

});
//删除类型接口
router.post('/deleteStyle', function (req, res, next) {
    var restResult = '';
    var id = req.body.id;
    console.log(id);
    StyleEntity.findOne({_id: id}, function (err, style) {
        if (err) {//查询异常
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }

        if (!style) {//手机号已注册
            restResult = "类型不存在或已删除";
            res.status(501).send(restResult);
            return;
        }

        //调用实体的实例的保存方法
        StyleEntity.remove({_id: id}, function (err, style) {
            if (err) {//服务器保存异常
                restResult = "服务器异常";
                res.send(restResult);
                return;
            }
            restResult = '删除成功';
            res.send(restResult);//返回成功结果
        });

    });

});
//模型审核页面
router.get('/audit', isLogin.admin, function (req, res, next) {
    console.log('后台管理-模型审核');
    ModelEntity.find({isPass: false}, function (err, model) {
        var restResult = '';
        if (err) {//查询异常
            restResult = "服务器异常";
            console.log(err);
            res.send(restResult);
            return;
        }

        if (model) {//model存在
            res.render('admin/audit', {
                title: '后台管理-模型审核',
                user_name: req.session.user_name,
                user_avatar: req.session.user_avatar,
                models: model
            });
        }
    });
});
//模型审核预览页面
router.get('/webPreview/:modelid', isLogin.admin, function (req, res, next) {
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
                    is_model_option:true
                });
            });
        }
    });
});
//模型审核通过接口
router.post('/audit/pass/:modelid', function (req, res, next) {
    ModelEntity.update({'_id': req.params.modelid}, {isPass: true}, function (err) {
        var restResult = '';
        if (err) {
            restResult = "服务器异常";
            res.status(500).send(restResult);
            return;
        } else {
            res.send('审核成功');
        }
    });
});
//模型审核下架接口
router.post('/audit/failed/:modelid', function (req, res, next) {
    ModelEntity.remove({'_id': req.params.modelid}, function (err) {
        var restResult = '';
        if (err) {
            restResult = "服务器异常";
            res.status(500).send(restResult);
            return;
        } else {
            localFileEntity.remove({modelId: req.params.modelid}, function (err) {
                if (err) {
                    restResult = "服务器异常";
                    res.status(500).send(restResult);
                    return;
                } else {
                    res.send('下架成功');
                }
            });
        }
    });
});

module.exports = router;
