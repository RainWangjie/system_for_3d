define(["fullscreen","VRControls"],function(o,e){function t(){g.render(d,E),v.render(d,p)}console.log("vr页面");var n=window.innerWidth,i=screen.availHeight,a=n/i;window.onorientationchange=function(){switch(console.log(window.orientation),window.orientation){case 90:$(".orientation").hide(),o.full(document.getElementsByClassName("model_show")[0]),$(".model_show").height(n);break;case-90:case 0:case 180:$(".orientation").show()}};var d=new THREE.Scene,l="";THREE.Loader.Handlers.add(/\.dds$/i,new THREE.DDSLoader);var r=new THREE.MTLLoader;r.setBaseUrl("http://7xs7nv.com1.z0.glb.clouddn.com/"),r.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),r.crossOrigin="*",r.load(mtlUrl,function(o){o.preload();var e=new THREE.OBJLoader;e.setMaterials(o),e.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),e.load(objUrl,function(o){l=o,l.scale.set(model_option[0],model_option[0],model_option[0]),l.rotation.x=model_option[1]/180*Math.PI,l.rotation.y=model_option[2]/180*Math.PI,l.rotation.z=model_option[3]/180*Math.PI,l.position.set(model_option[4]||0,model_option[5]||0,model_option[6]||0),d.add(l),$(".orientation").html("请旋转手机"),$(".model_show_left").append(g.domElement),$(".model_show_right").append(v.domElement)},R,u)});var s=new THREE.PointLight(16777215);s.position.set(-100,200,-100),d.add(s);var c=new THREE.DirectionalLight(16772829);c.position.set(0,0,1).normalize(),d.add(c);var h=new THREE.SpotLight(16777215);h.position.set(-353,-353,500),h.castShadow=!0,d.add(h);var m=new THREE.SpotLight(16777215);m.position.set(-130,483,300),m.castShadow=!0,d.add(m);var w=new THREE.SpotLight(16777215);w.position.set(483,-130,300),w.castShadow=!0,d.add(w),d.add(new THREE.AmbientLight(1052720));var E=new THREE.PerspectiveCamera(45,1/(2*a),.1,1e3);E.position.set(200,200,200),E.lookAt(d.position);var p=E.clone(),g=new THREE.WebGLRenderer({antialiasing:!0});g.setSize(i/2,n);var v=new THREE.WebGLRenderer({antialiasing:!0});v.setSize(i/2,n),e(E,d,p,d,t,200);var R=function(o){if(o.lengthComputable){var e=o.loaded/o.total*100;$(".orientation").html("模型加载"+Math.round(e,2)+"%"),console.log(Math.round(e,2)+"% downloaded")}},u=function(o){}});