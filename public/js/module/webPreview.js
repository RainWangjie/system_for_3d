define(["fullscreen"],function(o){function e(){m=new Stats,m.domElement.style.position="absolute",m.domElement.style.top="auto",document.getElementsByClassName("canvas")[0].appendChild(m.domElement)}function t(){m.begin(),H.render(c,_),m.end()}function n(){window.requestAnimationFrame(n),t()}function i(o,e){$(".canvas").css({width:o+"px",height:e+"px"}),$("#canvas-model-preview").css({width:o+"px",height:e+"px"}),H.setSize(o,e)}console.log("PC端模型预览改版!!!");var a=window.outerWidth,d=window.outerHeight,l=a/d,s=$(".col-md-9").width(),r=s/l,c=new THREE.Scene,m=(new THREE.Clock,null),p="";if(e(),console.log("是否支持配置:",is_model_option),is_model_option){var v=new THREE.AxisHelper(100);c.add(v)}THREE.Loader.Handlers.add(/\.dds$/i,new THREE.DDSLoader);var E=new THREE.MTLLoader;E.setBaseUrl("http://7xs7nv.com1.z0.glb.clouddn.com/"),E.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),E.crossOrigin="*",E.load(mtlUrl,function(o){o.preload();var e=new THREE.OBJLoader;e.setMaterials(o),e.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),e.load(objUrl,function(o){p=o,p.scale.set(model_option[0],model_option[0],model_option[0]),p.rotation.x=model_option[1]/180*Math.PI,p.rotation.y=model_option[2]/180*Math.PI,p.rotation.z=model_option[3]/180*Math.PI,p.position.set(model_option[4]||0,model_option[5]||0,model_option[6]||0),c.add(p),$(".canvas-model-preview .preview-img").remove(),$(".canvas-model-preview .progress").remove()},T,L)});var u=new THREE.PointLight(16777215);u.position.set(-100,200,-100),c.add(u);var w=new THREE.DirectionalLight(16772829);w.position.set(0,0,1).normalize(),c.add(w);var h=new THREE.SpotLight(16777215);h.position.set(-353,-353,500),h.castShadow=!0,c.add(h);var g=new THREE.SpotLight(16777215);g.position.set(-130,483,300),g.castShadow=!0,c.add(g);var f=new THREE.SpotLight(16777215);f.position.set(483,-130,300),f.castShadow=!0,c.add(f),c.add(new THREE.AmbientLight(1052720));var _=new THREE.PerspectiveCamera(45,l,.1,1e3);_.position.set(200,200,200),_.lookAt(c.position);var H=new THREE.WebGLRenderer({antialiasing:!0});H.setSize(s,r),H.domElement.id="canvas-model-preview",$(".canvas").append(H.domElement);var R=new THREE.OrbitControls(_,document.querySelector("#canvas-model-preview"));R.addEventListener("change",t),n();var T=function(o){if(o.lengthComputable){var e=o.loaded/o.total*100;$(".progress-bar").css("width",Math.round(e,2)+"%"),console.log(Math.round(e,2)+"% downloaded")}},L=function(o){},b=model_option;for(var S in b)$(".model_option_"+S).val(b[S]||0);$(".panel-body input").on("change",function(){console.log("模型配置");for(var o in b)b[o]=$(".model_option_"+o).val();p.scale.set(b[0],b[0],b[0]),p.rotation.x=b[1]/180*Math.PI,p.rotation.y=b[2]/180*Math.PI,p.rotation.z=b[3]/180*Math.PI,p.position.set(b[4],b[5],b[6])}),$("#update_model_option").on("click",function(){if(confirm("确认更新配置")){var o={model_id:model_id,model_option:JSON.stringify(b)};$.post("/models/web/update_model_option",o,function(o){alert(o)})}});var x=!1;$(".fullscreen").on("click",function(){x?(i(s,r),o.exitFull()):(console.log("full"),o.full(document.getElementsByClassName("canvas")[0]),i(a,d)),x=!x}),document.addEventListener("keydown",function(o){27==o.which&&(console.log("退出全屏"),i(s,r))})});