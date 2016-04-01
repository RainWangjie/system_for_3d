/**
 * Created by gewangjie on 16/4/1.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var ModelScheme = new base.Schema({

});

var ModelEntity = base.mongoose.model('ModelEntity', ModelScheme, 'model');//指定在数据库中的collection名称为style
exports.ModelEntity = ModelEntity;//导出实体