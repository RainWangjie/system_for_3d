/**
 * Created by gewangjie on 16/4/13.
 */
define([], function () {
    console.log('PC端模型预览改版!!!');
    var scene_width = $('.col-md-9').width(),
        scene_height = scene_width / 1.5;
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();
    var stat = null;
    var model = '';

    function init() {
        stat = new Stats();
        stat.domElement.style.position = 'absolute';
        stat.domElement.style.top = 'auto';
        document.body.appendChild(stat.domElement);
    }

    init();
    //坐标系
    var axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);
    //obj+mtl
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
    var mtlLorder = new THREE.MTLLoader();
    mtlLorder.setBaseUrl('http://7xs7nv.com1.z0.glb.clouddn.com/');
    mtlLorder.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
    mtlLorder.crossOrigin = '*';
    mtlLorder.load(mtlUrl, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
        objLoader.load(objUrl, function (obj_model) {
            model = obj_model;
            model.scale.set(model_option[0], model_option[0], model_option[0]);
            //obj_model.position.y = -50;
            model.rotation.x = model_option[1] / 180 * Math.PI;
            model.rotation.y = model_option[2] / 180 * Math.PI;
            model.rotation.z = model_option[3] / 180 * Math.PI;
            scene.add(model);
            $('.canvas-model-preview .preview-img').remove();
            $('.canvas-model-preview .progress').remove();
        }, onProgress, onError);
    });


    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, -100);
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.z = 70;
    spotLight.castShadow = true;
    scene.add(spotLight);

    scene.add(new THREE.AmbientLight(0x101030));

    var camera = new THREE.PerspectiveCamera(45, scene_width / scene_height, .1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer({antialiasing: true});
    renderer.setSize(scene_width, scene_height);

    $('.canvas-model-preview').append(renderer.domElement);

    var controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);

    function render() {
        stat.begin();
        renderer.render(scene, camera);
        stat.end();
    }

    animate();

    function animate() {
//        var d = clock.getDelta();
//        controls.update(d);
        window.requestAnimationFrame(animate);
        render()
    }

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            $('.progress-bar').css('witdh', Math.round(percentComplete, 2) + '%');
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };


    //模型配置
    $()
});