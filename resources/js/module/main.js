/**
 * Created by gewangjie on 16/4/1.
 */
require.config({
    baseUrl: '/js/',
    paths: {
        jquery: 'common/jquery.min',
        bootstrap: 'common/bootstrap.min',
        three: 'common/three.min',
        stat: 'common/stat.min',
        DDSLoader: 'common/DDSLoader',
        OBJLoader: 'common/OBJLoader',
        MTLLoader: 'common/MTLLoader',
        OBJMTLLoader: 'common/OBJMTLLoader',
        OrbitControls: 'common/OrbitControls',
        util: 'common/util',
        plupload: 'common/plupload.full.min',
        qiniu: 'common/qiniu.min',
        tplM: 'common/tpl'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'tplM':{
          deps:['jquery']
        },
        'module/personCenter': {
            deps: ['plupload', 'qiniu']
        },
        'module/uploadModels': {
            deps: ['plupload', 'qiniu']
        },
        'OBJMTLLoader': {
            deps: ['OBJLoader', 'MTLLoader', 'DDSLoader']
        },
        'OBJLoader': {
            deps: ['three']
        },
        'MTLLoader': {
            deps: ['three']
        },
        'DDSLoader': {
            deps: ['three']
        },
        'OrbitControls': {
            deps: ['three']
        },
        'module/webPreview': {
            deps: ['OrbitControls', 'OBJMTLLoader', 'stat']
        }
    }
});

var routes = [
    {url: '/index', module: 'module/index'},
    {url: '/users/login', module: 'module/users'},
    {url: '/users/message', module: 'module/personCenter'},
    {url: '/users/webPreview', module: 'module/webPreview'},
    {url: '/models/list', module: 'module/modelList'},
    {url: '/models/upload', module: 'module/uploadModels'},
    {url: '/models/web', module: 'module/webPreview'},
    //管理员
    {url: '/admin/style', module: 'admin/style'},
    {url: '/admin/audit', module: 'admin/audit'},
    {url: '/admin/webPreview', module: 'module/webPreview'}

];

var href = location.pathname;
require(['bootstrap', 'util'], function () {
    console.log('jquery load success!!!');
    routes.forEach(function (item) {
        if ((new RegExp(item.url)).test(href)) {
            require([item.module], function () {
                console.log('module load success!!!');
            });
            return;
        }
    });
});




