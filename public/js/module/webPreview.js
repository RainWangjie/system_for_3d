define([],function(){function e(){E.render(a,l)}function n(){window.requestAnimationFrame(n),e()}console.log("PC端模型预览!!!");var o=$(".col-md-9").width(),t=o/1.5,a=new THREE.Scene;new THREE.Clock;THREE.Loader.Handlers.add(/\.dds$/i,new THREE.DDSLoader);var i=new THREE.MTLLoader;i.setBaseUrl("http://7xs7nv.com1.z0.glb.clouddn.com/"),i.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),i.crossOrigin="*",i.load(mtlUrl,function(e){e.preload();var n=new THREE.OBJLoader;n.setMaterials(e),n.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),n.load(objUrl,function(e){e.scale.set(.1,.1,.1),e.position.x=30,e.rotation.x=-.5*Math.PI,e.rotation.z=-.25*Math.PI,a.add(e)})});var d=new THREE.PointLight(16777215);d.position.set(-100,200,-100),a.add(d);var r=new THREE.DirectionalLight(16772829);r.position.set(0,0,1).normalize(),a.add(r);var s=new THREE.SpotLight(16777215);s.position.z=70,s.castShadow=!0,a.add(s),a.add(new THREE.AmbientLight(1052720));var l=new THREE.PerspectiveCamera(45,o/t,.1,1e3);l.position.set(200,200,200),l.lookAt(a.position);var E=new THREE.WebGLRenderer({antialiasing:!0});E.setSize(o,t),$(".canvas-model-preview").html(E.domElement);var c=new THREE.OrbitControls(l);c.addEventListener("change",e),n()});