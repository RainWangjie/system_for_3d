/**
 * Created by gewangjie on 16/4/14.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var localFileScheme = new base.Schema({
    modelId:String,
    fileName:String,
    qiniuUrl:String,
});

//指定在数据库中的collection名称为localFile
var localFileEntity = base.mongoose.model('localFileEntity', localFileScheme, 'localFile');
exports.localFileEntity = localFileEntity;//导出实体