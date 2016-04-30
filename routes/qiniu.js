var express = require('express');
var router = express.Router();

var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '1xLOwApwb7DxXxFtR9czJ33LvGPULks4xABiiAX5';
qiniu.conf.SECRET_KEY = '86YYdqGfUdXLDmro3R4yJKTyUBat4hrpXBraf2zD';
//要上传的空间
bucket = 'systemfor3d';
//上传到七牛后保存的文件名
//key = 'my-nodejs-logo.png';
//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket);
    return putPolicy.token();
}

//生成上传 Token
router.get('/token', function (req,res,next) {
    token = uptoken(bucket);
    res.send(token);
});
module.exports = router;

