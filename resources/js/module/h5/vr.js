/**
 * Created by gewangjie on 16/4/29.
 */
define(['fullscreen', 'VRControls'], function (fs, vr) {
    console.log('vr页面');
    var screen_width = window.innerWidth * 2,
        screen_height = screen.availHeight * 2,
        screen_b = screen_width / screen_height;
    window.onorientationchange = function () {
        console.log(window.orientation);
        switch (window.orientation) {
            case 90:
                $('.orientation').hide();
                fs.full(document.getElementsByClassName('model_show')[0]);
                $('.model_show').height(screen_width / 2);
                break;
            case -90:
            case 0:
            case 180:
                $('.orientation').show();
                break;
        }
    };

    var scene = new THREE.Scene();
    var model = '';
    //坐标系
    //var axisHelper = new THREE.AxisHelper(100);
    //scene.add(axisHelper);
    //obj+mtl
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
    var mtlLorder = new THREE.MTLLoader();
    mtlLorder.setBaseUrl('http://7xs7nv.com1.z0.glb.clouddn.com/');
    mtlLorder.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
    mtlLorder.crossOrigin = '*';
    mtlLorder.setMaterialOptions({
        side: THREE.DoubleSide
//        wrap: THREE.MirroredRepeatWrapping,
//        normalizeRGB: true
    });
    mtlLorder.load(mtlUrl, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
        objLoader.load(objUrl, function (obj_model) {
            model = obj_model;
            model.scale.set(model_option[0] * .6, model_option[0] * .6, model_option[0] * .6);
            model.rotation.x = model_option[1] / 180 * Math.PI;
            model.rotation.y = model_option[2] / 180 * Math.PI;
            model.rotation.z = model_option[3] / 180 * Math.PI;
            model.position.set((model_option[4] * .6) || 0, (model_option[5] * .6) || 0, (model_option[6] * .6) || 0);
            scene.add(model);
            $('.orientation').html('请旋转手机，并放入cardboard');
            $('.model_show_left').append(renderer_left.domElement);
            $('.model_show_right').append(renderer_right.domElement);
        }, onProgress, onError);
    });


    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, -100);
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);
    //3个聚光灯
    var spotLight_1 = new THREE.SpotLight(0xffffff);
    spotLight_1.position.set(-353, -353, 500);
    spotLight_1.castShadow = true;
    scene.add(spotLight_1);
    var spotLight_2 = new THREE.SpotLight(0xffffff);
    spotLight_2.position.set(-130, 483, 300);
    spotLight_2.castShadow = true;
    scene.add(spotLight_2);
    var spotLight_3 = new THREE.SpotLight(0xffffff);
    spotLight_3.position.set(483, -130, 300);
    spotLight_3.castShadow = true;
    scene.add(spotLight_3);


    scene.add(new THREE.AmbientLight(0x101030));

    var camera_left = new THREE.PerspectiveCamera(45, 1 / (screen_b * 2), .1, 1000);
    camera_left.position.set(200, 200, 200);
    camera_left.lookAt(scene.position);
    var camera_right = camera_left.clone();

    var renderer_left = new THREE.WebGLRenderer({antialiasing: true, alpha: true});
    renderer_left.setSize(screen_height / 2, screen_width);

    var renderer_right = new THREE.WebGLRenderer({antialiasing: true, alpha: true});
    renderer_right.setSize(screen_height / 2, screen_width);


    vr(camera_left, scene, camera_right, scene, render, 200);

    function render() {
        renderer_left.render(scene, camera_left);
        renderer_right.render(scene, camera_right);
    }

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            $('.orientation').html('模型加载' + Math.round(percentComplete, 2) + '%');
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };
});