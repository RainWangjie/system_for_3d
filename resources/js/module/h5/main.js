/**
 * Created by gewangjie on 16/4/1.
 */
require.config({
    baseUrl: '/js/',
    paths: {
        zepto:'common/zepto',
        tplM: 'common/tpl',
        three: 'common/three.min',
        stat: 'common/stat.min',
        DDSLoader: 'common/DDSLoader',
        OBJLoader: 'common/OBJLoader',
        MTLLoader: 'common/MTLLoader',
        OBJMTLLoader: 'common/OBJMTLLoader',
        OrbitControls: 'common/OrbitControls',
    },
    shim: {
        'tplM':{
            deps:['zepto']
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
        'module/h5/webPreview': {
            deps: ['OrbitControls', 'OBJMTLLoader', 'stat']
        }
    }
});

var routes = [
    {url: '/h5/list', module: 'module/h5/modelList'},
    {url: '/h5/models/preview', module: 'module/h5/webPreview'},
    {url: '/h5/models/vr', module: 'module/h5/vr'}
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




