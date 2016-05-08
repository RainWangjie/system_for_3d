/**
 * Created by gewangjie on 16/4/13.
 */
define(['fullscreen'], function (fullscreen) {
    console.log('PC端模型预览改版!!!');
    var screen_width = window.outerWidth,
        screen_height = window.outerHeight,
        screeb_b = screen_width / screen_height;
    var scene_width = $('.col-md-9').width(),
        scene_height = scene_width / screeb_b;
    var scene = new THREE.Scene();
    //var clock = new THREE.Clock();
    var stat = null;
    var model = '';

    function init() {
        stat = new Stats();
        stat.domElement.style.position = 'absolute';
        stat.domElement.style.top = 'auto';
        document.getElementsByClassName('canvas')[0].appendChild(stat.domElement);
    }

    init();
    //坐标系
    console.log('是否支持配置:', is_model_option);
    if (is_model_option) {
        //var axisHelper = new THREE.AxisHelper(100);
        //scene.add(axisHelper);
    }
    //obj+mtl
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
    var mtlLorder = new THREE.MTLLoader();
    mtlLorder.setBaseUrl('http://7xs7nv.com1.z0.glb.clouddn.com/');
    mtlLorder.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
    mtlLorder.crossOrigin = '*';
    mtlLorder.setMaterialOptions({
        side: THREE.DoubleSide,
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
            model.scale.set(model_option[0], model_option[0], model_option[0]);
            model.rotation.x = model_option[1] / 180 * Math.PI;
            model.rotation.y = model_option[2] / 180 * Math.PI;
            model.rotation.z = model_option[3] / 180 * Math.PI;
            model.position.set(model_option[4] || 0, model_option[5] || 0, model_option[6] || 0);
            scene.add(model);
            $('.canvas-model-preview .preview-img').remove();
            $('.canvas-model-preview .progress').remove();
            render();
        }, onProgress, onError);
    });


    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, -100);
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    //3个聚光灯
    var spotLight_1 = new THREE.SpotLight(0xffffff, 1.75, 2000, Math.PI / 3);
    spotLight_1.position.set(0, 500, 500);
    spotLight_1.target.position.set(0, 0, 0);
    spotLight_1.castShadow = true;
    scene.add(spotLight_1);
    var spotLight_2 = new THREE.SpotLight(0xffffff, 1.75, 2000, Math.PI / 3);
    spotLight_2.position.set(500, 0, 300);
    spotLight_2.target.position.set(0, 0, 0);
    spotLight_2.castShadow = true;
    scene.add(spotLight_2);
    var spotLight_3 = new THREE.SpotLight(0xffffff, 1.75, 2000, Math.PI / 3);
    spotLight_3.position.set(-360, -360, 500);
    spotLight_3.target.position.set(0, 0, 0);
    spotLight_3.castShadow = true;
    scene.add(spotLight_3);


    scene.add(new THREE.AmbientLight(0x444444));

    var camera = new THREE.PerspectiveCamera(45, screeb_b, .1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer({antialiasing: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(scene_width, scene_height);
    renderer.domElement.id = 'canvas-model-preview';
    $('.canvas').append(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, document.querySelector('#canvas-model-preview'));
    controls.addEventListener('change', render);

    function render() {
        stat.begin();
        renderer.render(scene, camera);
        stat.end();
    }

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            $('.progress-bar').css('width', Math.round(percentComplete, 2) + '%');
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };

    animate();
    function animate() {
        window.requestAnimationFrame(animate);
        render();
    }

    function resize(w, h) {
        $('.canvas').css({
            width: w + 'px',
            height: h + 'px'
        });
        $('#canvas-model-preview').css({
            width: w + 'px',
            height: h + 'px'
        });
        renderer.setSize(w, h);
        render();
    }

    var isFull = false;
    $('.fullscreen').on('click', function () {
        if (isFull) {
            resize(scene_width, scene_height);
            fullscreen.exitFull();
        } else {
            console.log('full');
            fullscreen.full(document.getElementsByClassName('canvas')[0]);
            resize(screen_width, screen_height);
        }
        isFull = !isFull;
    });

    document.addEventListener('keydown', function (e) {
        if (e.which == 27) {
            console.log('退出全屏');
            resize(scene_width, scene_height);
        }
    });

    var model_option_new = model_option;
    for (var i in model_option_new) {
        $('.model_option_' + i).val(model_option_new[i] || 0);
    }
    $('.panel-body input').on('change', function () {
        console.log('模型配置');
        for (var i in model_option_new) {
            model_option_new[i] = $('.model_option_' + i).val();
        }
        model.scale.set(model_option_new[0], model_option_new[0], model_option_new[0]);
        //obj_model.position.y = -50;
        model.rotation.x = model_option_new[1] / 180 * Math.PI;
        model.rotation.y = model_option_new[2] / 180 * Math.PI;
        model.rotation.z = model_option_new[3] / 180 * Math.PI;
        model.position.set(model_option_new[4], model_option_new[5], model_option_new[6]);
    });
    var updateUrl = '', editUrl = '';
    if (new RegExp(location.pathname).test('admin')) {
        updateUrl = '/admin/update_model_option';
        editUrl = '/admin/edit_model_message';
    } else {
        updateUrl = '/models/web/update_model_option';
        editUrl = '/models/web/edit_model_message';
    }
    $('#update_model_option').on('click', function () {
        if (confirm('确认更新配置')) {
            var data = {
                model_id: model_id,
                model_option: JSON.stringify(model_option_new)
            };
            $.post(updateUrl, data, function (e) {
                alert(e);
            });
        }
    });

    $('.btn-edit').on('click', function () {
        $('.panel_popup').addClass('show');
        $('#edit-typeId').val(model_typeId);
    });
    $('.btn-model-save').on('click', function () {
        var data = {
            model_id:model_id,
            name: $('#edit-name').val(),
            descriptions: $('#edit-descriptions').val(),
            typeId: $('#edit-typeId').val()
        };
        $.post(editUrl, data, function (e) {
            alert(e);
            $('#model_name').html(data.name);
            $('#model_descriptions').html(data.descriptions);
            $('.panel_popup').removeClass('show');
        });
    });
    $('.btn-model-cancel').on('click', function () {
        $('.panel_popup').removeClass('show');
    });
});