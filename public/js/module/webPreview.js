define(["fullscreen"],function(o){function e(){c=new Stats,c.domElement.style.position="absolute",c.domElement.style.top="auto",document.getElementsByClassName("canvas")[0].appendChild(c.domElement)}function t(){c.begin(),_.render(r,g),c.end()}function n(o,e){$(".canvas").css({width:o+"px",height:e+"px"}),$("#canvas-model-preview").css({width:o+"px",height:e+"px"}),_.setSize(o,e)}console.log("PC端模型预览改版!!!");var i=window.outerWidth,a=window.outerHeight,d=i/a,l=$(".col-md-9").width(),s=l/d,r=new THREE.Scene,c=(new THREE.Clock,null),p="";e(),console.log("是否支持配置:",is_model_option),is_model_option,THREE.Loader.Handlers.add(/\.dds$/i,new THREE.DDSLoader);var m=new THREE.MTLLoader;m.setBaseUrl("http://7xs7nv.com1.z0.glb.clouddn.com/"),m.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),m.crossOrigin="*",m.load(mtlUrl,function(o){o.preload();var e=new THREE.OBJLoader;e.setMaterials(o),e.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),e.load(objUrl,function(o){p=o,p.scale.set(model_option[0],model_option[0],model_option[0]),p.rotation.x=model_option[1]/180*Math.PI,p.rotation.y=model_option[2]/180*Math.PI,p.rotation.z=model_option[3]/180*Math.PI,p.position.set(model_option[4]||0,model_option[5]||0,model_option[6]||0),r.add(p),$(".canvas-model-preview .preview-img").remove(),$(".canvas-model-preview .progress").remove(),t()},H,R)});var v=new THREE.PointLight(16777215);v.position.set(-100,200,-100),r.add(v);var h=new THREE.DirectionalLight(16772829);h.position.set(0,0,1).normalize(),r.add(h);var E=new THREE.SpotLight(16777215);E.position.set(0,500,500),E.target.position.set(0,0,0),E.castShadow=!0,r.add(E);var u=new THREE.SpotLight(16777215);u.position.set(500,0,300),u.target.position.set(0,0,0),u.castShadow=!0,r.add(u);var w=new THREE.SpotLight(16777215);w.position.set(-360,-360,500),w.target.position.set(0,0,0),w.castShadow=!0,r.add(w),r.add(new THREE.AmbientLight(16777215));var g=new THREE.PerspectiveCamera(45,d,.1,1e3);g.position.set(200,200,200),g.lookAt(r.position);var _=new THREE.WebGLRenderer({antialiasing:!0,alpha:!0});_.setSize(l,s),_.domElement.id="canvas-model-preview",$(".canvas").append(_.domElement);var f=new THREE.OrbitControls(g,document.querySelector("#canvas-model-preview"));f.addEventListener("change",t);var H=function(o){if(o.lengthComputable){var e=o.loaded/o.total*100;$(".progress-bar").css("width",Math.round(e,2)+"%"),console.log(Math.round(e,2)+"% downloaded")}},R=function(o){},T=model_option;for(var L in T)$(".model_option_"+L).val(T[L]||0);$(".panel-body input").on("change",function(){console.log("模型配置");for(var o in T)T[o]=$(".model_option_"+o).val();p.scale.set(T[0],T[0],T[0]),p.rotation.x=T[1]/180*Math.PI,p.rotation.y=T[2]/180*Math.PI,p.rotation.z=T[3]/180*Math.PI,p.position.set(T[4],T[5],T[6])}),$("#update_model_option").on("click",function(){if(confirm("确认更新配置")){var o={model_id:model_id,model_option:JSON.stringify(T)};$.post("/models/web/update_model_option",o,function(o){alert(o)})}});var b=!1;$(".fullscreen").on("click",function(){b?(n(l,s),o.exitFull()):(console.log("full"),o.full(document.getElementsByClassName("canvas")[0]),n(i,a)),b=!b}),document.addEventListener("keydown",function(o){27==o.which&&(console.log("退出全屏"),n(l,s))})});