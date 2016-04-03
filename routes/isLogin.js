/**
 * Created by gewangjie on 16/4/2.
 */
module.exports = {
    authorize: function (req, res, next) {
        if (!req.session.user_id) {
            console.log('未登录，重定向到登录页！');
            res.redirect('/users');
        } else {
            next();
        }
    },
    changeSex: function (sex) {
        if (sex == 1) {
            return '男';
        }else if(sex == 2){
            return '女'
        }else if(sex == 3){
            return '未设置'
        }
    }
};
