/**
 * Created by gewangjie on 16/4/1.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var ModelScheme = new base.Schema({
    name: String,//模型名
    descriptions: {type: String, default: '太懒了，这人啥都没说'},//描述
    userId: String,//创建者ID
    typeId: String,//分类ID
    isPass: {type: Boolean, default: false},//是否通过审核
    isTranslate: {type: Boolean, default: false},//mtl文件字符串替换
    createTime: {type: Date, default: Date.now},//创建时间
    previewImg: String,//模型预览图
    objUrl: String,//obj文件七牛链接
    mtlUrl: String,//mtl文件七牛链接
    imgUrl: Array,//贴图文件七牛链接
    modelOption: {type: Array, default: [1, 0, 0, 0]}//model基本配置属性，作为保留参数
});

var ModelEntity = base.mongoose.model('ModelEntity', ModelScheme, 'model');//指定在数据库中的collection名称为style
exports.ModelEntity = ModelEntity;//导出实体