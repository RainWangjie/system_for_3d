/**
 * Created by gewangjie on 16/3/30.
 */
var express = require('express');
var router = express.Router();

var StyleEntity = require('../models/Style').StyleEntity;

router.get('/', function (req, res, next) {
    console.log('后台管理');
    res.render('admin/index', {title: '后台管理'});
});
//类型管理页面
router.get('/style', function (req, res, next) {
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
    StyleEntity.findOne({_id:id}, function (err, style) {
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
        StyleEntity.remove({_id:id},function (err, style) {
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

module.exports = router;
