/**
 * Created by gewangjie on 16/8/2.
 */
var express = require('express');
var router = express.Router();

router.get('/test', function (req, res, next) {
    res.render('vue/test', {title: 'vue改造测试', layout: false});
});
module.exports = router;