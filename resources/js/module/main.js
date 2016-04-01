/**
 * Created by gewangjie on 16/4/1.
 */
require.config({
    baseUrl: '/js/',
    paths: {
        jquery: 'common/jquery.min',
        three: 'common/three.min',
        util:'common/util'
    },
    shim: {
    }
});

require(['jquery','util'], function () {
    console.log('jquery load success!!!');
});

var routes = [
    {url:'/index',module:'module/index'},
    {url:'/user',module:'module/users'},
    //管理员
    {url:'/admin/style',module:'admin/style'}
];

var href = location.pathname;

routes.forEach(function (item) {
    if ((new RegExp(item.url)).test(href)) {
        require([item.module], function () {
            console.log('module load success!!!');
        });
        return;
    }
});
