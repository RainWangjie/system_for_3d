/**
 * Created by gewangjie on 16/4/1.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var StyleScheme = new base.Schema({
    styleName: String,
    createTime: {type: Date, default: Date.now},//创建时间
    creator: {type: String, default: 'admin'},//创建时间
    isExist:{type: Boolean, default: true},
    deleteTime:Date
});

var StyleEntity = base.mongoose.model('StyleEntity', StyleScheme, 'style');//指定在数据库中的collection名称为style
exports.StyleEntity = StyleEntity;//导出实体