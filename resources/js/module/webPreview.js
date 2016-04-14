/**
 * Created by gewangjie on 16/4/13.
 */
define([], function () {
    console.log('PC端模型预览!!!');
    var scene_width = $('.col-md-9').width(),
        scene_height = scene_width / 1.5;
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();


    //obj+mtl
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
    var mtlLorder = new THREE.MTLLoader();
    mtlLorder.setBaseUrl('http://7xs7nv.com1.z0.glb.clouddn.com/');
    mtlLorder.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
    mtlLorder.crossOrigin = '*';
    mtlLorder.load('RB-OptimusBoss.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
        objLoader.load('RB-OptimusBoss.obj', function (jingang) {
            jingang.scale.set(.1, .1, .1);
            jingang.position.x = 30;
            jingang.rotation.x = -.5 * Math.PI;
            jingang.rotation.z = -.25 * Math.PI;
            scene.add(jingang);
        })
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

    var camera = new THREE.PerspectiveCamera(45, scene_width/scene_height, .1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer({antialiasing: true});
    renderer.setSize(scene_width, scene_height);

    $('.canvas-model-preview').html(renderer.domElement);

    var controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);

    function render() {
        renderer.render(scene, camera);
    }

    animate();

    function animate() {
//        var d = clock.getDelta();
//        controls.update(d);
        window.requestAnimationFrame(animate);
        render()
    }
});