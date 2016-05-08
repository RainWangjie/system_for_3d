/**
 * Created by gewangjie on 16/4/2.
 */

var result = {
    authorize: function (req, res, next) {
        if (!req.session.user_id) {
            res.redirect('/users/login');
        } else {
            next();
        }
    },
    admin: function (req, res, next) {
        if (req.session.user_name !== '葛王杰') {
            res.render('error', {
                message: '您不是管理员',
                error: {
                    status: 404,
                    stack: '很危险啊！'
                }
            })
        } else {
            next();
        }
    },
    changeSex: function (sex) {
        if (sex == 1) {
            return '男';
        } else if (sex == 2) {
            return '女'
        } else if (sex == 3) {
            return '未设置'
        }
    }
};
module.exports = result;
