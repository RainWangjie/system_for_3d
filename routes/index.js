/**
 * Created by gewangjie on 16/3/25.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '首页-3d model system',user_name:req.session.user_name,user_avatar:req.session.user_avatar});
});

module.exports = router;
