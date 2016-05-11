/**
 * Created by gewangjie on 16/5/11.
 */
define([], function () {
    var camera, scene, renderer, dirLight, hemiLight, controls;
    var mixers = [];
    var clock = new THREE.Clock();
    init();
    function init() {
        var banner = document.getElementById('banner');
        camera = new THREE.PerspectiveCamera(30, 2.5, 1, 5000);
        camera.position.set(0, 0, 900);
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 1, 5000);
        scene.fog.color.setHSL(0.6, 0, 1);
        controls = new THREE.TrackballControls(camera);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.15;

        // LIGHTS
        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(-100, 700, 0);
        scene.add(hemiLight);
        //
        dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(50);
        dirLight.castShadow = true;
        dirLight.shadowMapWidth = 2048;
        dirLight.shadowMapHeight = 2048;
        var d = 50;
        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;
        dirLight.shadowCameraFar = 3500;
        dirLight.shadowBias = -0.0001;
        scene.add(dirLight);

        //dirLight.shadowCameraVisible = true;
        // GROUND
        var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
        var groundMat = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x050505});
        groundMat.color.setHSL(0.095, 1, 0.75);
        var ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -33;
        scene.add(ground);
        ground.receiveShadow = true;
        // SKYDOME
        var vertexShader = document.getElementById('vertexShader').textContent;
        var fragmentShader = document.getElementById('fragmentShader').textContent;
        var uniforms = {
            topColor: {type: "c", value: new THREE.Color(0x0077ff)},
            bottomColor: {type: "c", value: new THREE.Color(0xffffff)},
            offset: {type: "f", value: 33},
            exponent: {type: "f", value: 0.6}
        };
        uniforms.topColor.value.copy(hemiLight.color);
        scene.fog.color.copy(uniforms.bottomColor.value);
        var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
        var skyMat = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms,
            side: THREE.BackSide
        });
        var sky = new THREE.Mesh(skyGeo, skyMat);
        scene.add(sky);
        // MODEL
        var loader_1 = new THREE.JSONLoader();
        loader_1.load('http://7xs7nv.com1.z0.glb.clouddn.com/horse.js', function (geometry) {
            var material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                morphTargets: true,
                vertexColors: THREE.FaceColors,
                shading: THREE.FlatShading
            });
            var mesh = new THREE.Mesh(geometry, material);
            var s = 0.35;
            mesh.scale.set(s, s, s);
            mesh.position.set(30, -36, 0);
            mesh.rotation.y = -1;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
            var mixer = new THREE.AnimationMixer(mesh);
            mixer.clipAction(geometry.animations[0]).setDuration(1).play();
            mixers.push(mixer);
        });
        var loader_2 = new THREE.JSONLoader();
        loader_2.load('http://7xs7nv.com1.z0.glb.clouddn.com/parrot.js', function (geometry) {
            var material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                morphTargets: true,
                vertexColors: THREE.FaceColors,
                shading: THREE.FlatShading
            });
            var mesh = new THREE.Mesh(geometry, material);
            var s = 0.35;
            mesh.scale.set(s, s, s);
            mesh.position.set(-40, 30, 0);
            mesh.rotation.y = -0.9;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
            var mixer = new THREE.AnimationMixer(mesh);
            mixer.clipAction(geometry.animations[0]).setDuration(1).play();
            mixers.push(mixer);
        });

        //FONT
        initFont();

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize($('#banner').width(), $('#banner').width() * .4);
        banner.appendChild(renderer.domElement);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.cullFace = THREE.CullFaceBack;
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        var delta = clock.getDelta();
        controls.update();
        for (var i = 0; i < mixers.length; i++) {
            mixers[i].update(delta);
        }
        renderer.render(scene, camera);
    }


    //FONT
    var text = "Welcome to 3D model system",
        height = 20,
        size = 60,
    //hover = 30,
        curveSegments = 4,
        bevelThickness = 2,
        bevelSize = 1.5,
        bevelSegments = 3,
        bevelEnabled = true,
        font = '',
        fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
        fontWeight = "bold"; // normal bold
    var group, textMesh1, textGeo, material;

    var fontMap = {
        "helvetiker": 0,
        "optimer": 1,
        "gentilis": 2,
        "droid_sans": 3,
        "droid_serif": 4
    };
    var weightMap = {
        "regular": 0,
        "bold": 1
    };

    function initFont() {
        material = new THREE.MultiMaterial([
            new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading}), // front
            new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.SmoothShading}) // side
        ]);
        group = new THREE.Group();
        group.position.y = 100;
        scene.add(group);
        loadFont();
    }

    function createText() {
        textGeo = new THREE.TextGeometry(text, {
            font: font,
            size: size,
            height: height,
            curveSegments: curveSegments,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled,
            material: 0,
            extrudeMaterial: 1
        });
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
        // "fix" side normals by removing z-component of normals for side faces
        // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
        if (bevelEnabled) {
            var triangleAreaHeuristics = 0.1 * ( height * size );
            for (var i = 0; i < textGeo.faces.length; i++) {
                var face = textGeo.faces[i];
                if (face.materialIndex == 1) {
                    for (var j = 0; j < face.vertexNormals.length; j++) {
                        face.vertexNormals[j].z = 0;
                        face.vertexNormals[j].normalize();
                    }
                    var va = textGeo.vertices[face.a];
                    var vb = textGeo.vertices[face.b];
                    var vc = textGeo.vertices[face.c];
                    var s = THREE.GeometryUtils.triangleArea(va, vb, vc);
                    if (s > triangleAreaHeuristics) {
                        for (var j = 0; j < face.vertexNormals.length; j++) {
                            face.vertexNormals[j].copy(face.normal);
                        }
                    }
                }
            }
        }
        //var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
        textMesh1 = new THREE.Mesh(textGeo, material);
        textMesh1.position.set(-550, -130, -60);
        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;

        group.add(textMesh1);
    }

    function loadFont() {
        var loader = new THREE.FontLoader();
        loader.load('/font/' + 'optimer' + '_' + 'bold' + '.typeface.js', function (response) {
            font = response;
            refreshText();
        });
    }

    function refreshText() {
        //updatePermalink();
        group.remove(textMesh1);
        if (!text) return;
        createText();
    }
    
});