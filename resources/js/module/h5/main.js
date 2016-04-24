/**
 * Created by gewangjie on 16/4/1.
 */
require.config({
    baseUrl: '/js/',
    paths: {
        zepto:'common/zepto',
        three: 'common/three.min',
        stat: 'common/stat.min',
        DDSLoader: 'common/DDSLoader',
        OBJLoader: 'common/OBJLoader',
        MTLLoader: 'common/MTLLoader',
        OBJMTLLoader: 'common/OBJMTLLoader',
        OrbitControls: 'common/OrbitControls',
    },
    shim: {

    }
});

var routes = [
    {url: '/h5/list', module: 'module/h5/modelList'}
];

var href = location.pathname;
require(['zepto'], function () {
    console.log('zepto load success!!!');
    routes.forEach(function (item) {
        if ((new RegExp(item.url)).test(href)) {
            require([item.module], function () {
                console.log('h5 module load success!!!');
            });
            return;
        }
    });
});




