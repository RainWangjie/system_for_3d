var express = require('express');
var router = express.Router();

var wj_util = require('../routes/wj_util');

var UserEntity = require('../models/User').UserEntity;
var ModelEntity = require('../models/Model').ModelEntity;

/* GET user page. */
router.get('/login', function (req, res, next) {
    console.log('注册登录页');
    res.render('users', {
        title: '注册登录页',
        user_name: req.session.user_name,
        user_avatar: req.session.user_avatar
    });
});
/*个人信息页*/
router.get('/message', wj_util.authorize, function (req, res, next) {
    var restResult = '';
    UserEntity.findOne({_id: req.session.user_id}, {
        name: 1,
        mobile: 1,
        sex: 1,
        birthday: 1,
        avatar: 1,
        _id: 0
    }, function (err, user) {
        if (err) {//查询异常
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }

        if (user) {//手机号已注册
            res.render('personCenter', {
                title: '个人信息',
                user: user,
                user_name: req.session.user_name,
                user_avatar: req.session.user_avatar
            });
        }
    });
});
//注册路由
router.post('/register', function (req, res, next) {
    var restResult = '';
    var mobile = req.body.mobile;
    if (!/1\d{10}/.test(mobile)) {//手机号码格式校验
        restResult = "请填写真确的手机格式";
        res.status(501).send(restResult);
        return;
    }
    var password = req.body.password;
    if (!password || password.length < 6) {//密码长度校验
        restResult = "密码长度不能少于6位";
        res.status(501).send(restResult);
        return;
    }

    //findOne方法,第一个参数数条件,第二个参数是字段投影,第三那个参数是回调函数
    UserEntity.findOne({mobile: mobile}, '_id', function (err, user) {
        if (err) {//查询异常
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }

        if (user) {//手机号已注册
            restResult = "手机号已注册";
            res.status(501).send(restResult);
            return;
        }

        var registerUser = new UserEntity({mobile: mobile, password: password});
        //调用实体的实例的保存方法
        registerUser.save(function (err, row) {
            if (err) {//服务器保存异常
                restResult = "服务器异常";
                res.send(restResult);
                return;
            }
            restResult = '注册成功';
            res.send(restResult);//返回成功结果
        });

    });
});
//登陆路由
router.post('/login', function (req, res, next) {
    var restResult = {
        result: '',
        url: ''
    };
    var mobile = req.body.mobile;
    if (!/1\d{10}/.test(mobile)) {//手机号码格式校验
        restResult.result = "请填写真确的手机格式";
        res.status(501).send(restResult.result);
        return;
    }
    var password = req.body.password;
    if (!password) {
        restResult.result = "密码不能为空";
        res.status(501).send(restResult.result);
        return;
    }
    UserEntity.findOne({mobile: mobile, password: password}, {password: 0}, function (err, user) {
        if (err) {
            restResult.result = "服务器异常";
            res.status(500).send(restResult.result);
            return;
        }

        if (!user) {
            restResult.result = "用户名或密码错误";
            res.status(501).send(restResult.result);
            return;
        }
        restResult.result = user.mobile + '登录成功';
        req.session.user_id = user._id;
        req.session.user_name = user.name;
        req.session.user_avatar = user.avatar;

        restResult.url = '/index';
        res.send(restResult);

        //更新最后登陆时间
        UserEntity.update({_id: user._id}, {$set: {lastLoginTime: new Date()}}).exec();
    });

});
//用户退出路由
router.get('/logout', function (req, res, next) {
    delete  req.session.user_id;
    delete  req.session.user_name;
    delete  req.session.user_avatar;
    res.redirect('/index');
});
//更新个人信息接口
router.post('/update', wj_util.authorize, function (req, res, next) {
    console.log(req.body);
    if (!req.body.name) {
        res.status(501).send('参数错误');
        return;
    }
    if (!req.body.mobile) {
        res.status(501).send('参数错误');
        return;
    }
    if (!req.body.sex) {
        res.status(501).send('参数错误');
        return;
    }
    if (!req.body.birthday) {
        res.status(501).send('参数错误');
        return;
    }
    UserEntity.update({'_id': req.session.user_id}, req.body, function (err, user) {
        var restResult = '';
        if (err) {
            restResult = "服务器异常";
            res.status(500).send(restResult);
            return;
        } else {
            req.session.user_id = user._id;
            req.session.user_name = user.name;
            req.session.user_avatar = user.avatar;
            res.send('更新成功');
        }
    });
});
//重置密码接口
router.post('/resetPassword', wj_util.authorize, function (req, res, next) {
    var restResult = '';
    UserEntity.findOne({_id: req.session.user_id}, {password: 1}, function (err, user) {
        if (err) {//查询异常
            restResult = "服务器异常";
            res.status(500).send(restResult);
            return;
        }
        if (user.password !== req.body.oldPassword) {
            restResult = "密码错误";
            res.status(501).send(restResult);
            return;
        } else {
            if (req.body.newPassword1 === req.body.newPassword2) {
                UserEntity.update({'_id': req.session.user_id}, {password: req.body.newPassword1}, function (err, user) {
                    var restResult = '';
                    if (err) {
                        restResult = "服务器异常";
                        res.status(500).send(restResult);
                    } else {
                        res.send('更新成功');
                    }
                });
            } else {
                restResult = '两次密码不一致';
                res.status(501).send(restResult);
            }
        }
    });
});
//个人模型预览页
router.get('/webPreview/:modelid', wj_util.authorize, function (req, res, next) {
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
                        user_avatar: req.session.user_avatar,
                        is_model_option: true
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
