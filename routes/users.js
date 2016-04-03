var express = require('express');
var router = express.Router();

var isLogin = require('../routes/isLogin');

var UserEntity = require('../models/User').UserEntity;

/* GET user page. */
router.get('/', function (req, res, next) {
    console.log('注册登录页');
    res.render('users', {title: '注册登录页'});
});
/*个人信息页*/
router.get('/message', isLogin.authorize, function (req, res, next) {
    var restResult = '';
    UserEntity.findOne({_id: req.session.user_id},{name:1,mobile:1,sex:1,birthday:1,_id:0},function (err, user) {
        if (err) {//查询异常
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }

        if (user) {//手机号已注册
            user.sex = isLogin.changeSex(user.sex);
            console.log(user.sex);
            res.render('personCenter', {title: '个人信息', user: user});
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
    var restResult = '';
    var mobile = req.body.mobile;
    if (!/1\d{10}/.test(mobile)) {//手机号码格式校验
        restResult = "请填写真确的手机格式";
        res.status(501).send(restResult);
        return;
    }
    var password = req.body.password;
    if (!password) {
        restResult = "密码不能为空";
        res.status(501).send(restResult);
        return;
    }
    UserEntity.findOne({mobile: mobile, password: password}, {password: 0}, function (err, user) {
        if (err) {
            restResult = "服务器异常";
            res.send(restResult);
            return;
        }

        if (!user) {
            restResult = "用户名或密码错误";
            res.status(501).send(restResult);
            return;
        }
        restResult = user.mobile + '登录成功';
        req.session.user_id = user._id;
        req.session.user_name = user.name;
        res.send(restResult);

        //更新最后登陆时间
        UserEntity.update({_id: user._id}, {$set: {lastLoginTime: new Date()}}).exec();
    });

});
//用户退出
router.post('/logout', function (req, res, next) {

});

module.exports = router;
