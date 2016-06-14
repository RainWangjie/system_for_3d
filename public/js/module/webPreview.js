define(["fullscreen"],function(e){function o(){c=new Stats,c.domElement.style.position="absolute",c.domElement.style.top="auto",document.getElementsByClassName("canvas")[0].appendChild(c.domElement)}function t(){c.begin(),E.render(m,g),c.end()}function n(){window.requestAnimationFrame(n),t()}function i(e,o){$(".canvas").css({width:e+"px",height:o+"px"}),$("#canvas-model-preview").css({width:e+"px",height:o+"px"}),E.setSize(e,o),t()}console.log("PC端模型预览改版!!!");var a=window.outerWidth,d=window.outerHeight,l=a/d,s=$(".col-md-9").width(),r=s/l,m=new THREE.Scene,c=null,p="";o(),console.log("是否支持配置:",is_model_option),is_model_option,THREE.Loader.Handlers.add(/\.dds$/i,new THREE.DDSLoader);var h=new THREE.MTLLoader;h.setBaseUrl("http://7xs7nv.com1.z0.glb.clouddn.com/"),h.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),h.crossOrigin="*",h.setMaterialOptions({side:THREE.DoubleSide}),h.load(mtlUrl,function(e){e.preload(),materials_wireframe=e.materials.initialShadingGroup;var o=new THREE.OBJLoader;o.setMaterials(e),o.setPath("http://7xs7nv.com1.z0.glb.clouddn.com/"),o.load(objUrl,function(e){p=e,p.scale.set(model_option[0],model_option[0],model_option[0]),p.rotation.x=model_option[1]/180*Math.PI,p.rotation.y=model_option[2]/180*Math.PI,p.rotation.z=model_option[3]/180*Math.PI,p.position.set(model_option[4]||0,model_option[5]||0,model_option[6]||0),m.add(p),$(".canvas-model-preview .preview-img").remove(),$(".canvas-model-preview .progress").remove(),t()},R,L)});var v=new THREE.PointLight(16777215);v.position.set(-100,200,-100),m.add(v);var w=new THREE.DirectionalLight(16772829);w.position.set(0,0,1).normalize(),m.add(w);var u=new THREE.HemisphereLight(16777215,16777215,.6);u.color.setHSL(.6,1,.6),u.groundColor.setHSL(.095,1,.75),u.position.set(-200,500,0),m.add(u);var f=new THREE.DirectionalLight(16777215,1);f.color.setHSL(.1,1,.95),f.position.set(-1,1.75,1),f.position.multiplyScalar(50),f.castShadow=!0,f.shadowMapWidth=2048,f.shadowMapHeight=2048;var _=50;f.shadowCameraLeft=-_,f.shadowCameraRight=_,f.shadowCameraTop=_,f.shadowCameraBottom=-_,f.shadowCameraFar=3500,f.shadowBias=-1e-4,m.add(f),m.add(new THREE.AmbientLight(4473924));var g=new THREE.PerspectiveCamera(45,l,.1,1e3);g.position.set(200,200,200),g.lookAt(m.position);var E=new THREE.WebGLRenderer({antialiasing:!0,alpha:!0});E.setPixelRatio(window.devicePixelRatio),E.setSize(s,r),E.domElement.id="canvas-model-preview",$(".canvas").append(E.domElement);var H=new THREE.OrbitControls(g,document.querySelector("#canvas-model-preview"));H.addEventListener("change",t);var R=function(e){if(e.lengthComputable){var o=e.loaded/e.total*100;$(".progress-bar").css("width",Math.round(o,2)+"%"),console.log(Math.round(o,2)+"% downloaded")}},L=function(e){};n();var C=!1;$(".fullscreen").on("click",function(){C?(i(s,r),e.exitFull()):(console.log("full"),e.full(document.getElementsByClassName("canvas")[0]),i(a,d)),C=!C}),document.addEventListener("keydown",function(e){27==e.which&&(console.log("退出全屏"),i(s,r))});var b=model_option;for(var T in b)$(".model_option_"+T).val(b[T]||0);$(".panel-body input").on("change",function(){console.log("模型配置");for(var e in b)b[e]=$(".model_option_"+e).val();p.scale.set(b[0],b[0],b[0]),p.rotation.x=b[1]/180*Math.PI,p.rotation.y=b[2]/180*Math.PI,p.rotation.z=b[3]/180*Math.PI,p.position.set(b[4],b[5],b[6])}),$("#wireframe").on("change",function(){console.log(p);for(var e in p.children)p.children[e].material.wireframe=!p.children[e].material.wireframe});var y="",x="";new RegExp(location.pathname).test("admin")?(y="/admin/update_model_option",x="/admin/edit_model_message"):(y="/models/web/update_model_option",x="/models/web/edit_model_message"),$("#update_model_option").on("click",function(){if(confirm("确认更新配置")){var e={model_id:model_id,model_option:JSON.stringify(b)};$.post(y,e,function(e){alert(e)})}}),$(".btn-edit").on("click",function(){$(".panel_popup").addClass("show"),$("#edit-typeId").val(model_typeId)}),$(".btn-model-save").on("click",function(){var e={model_id:model_id,name:$("#edit-name").val(),descriptions:$("#edit-descriptions").val(),typeId:$("#edit-typeId").val()};$.post(x,e,function(o){alert(o),$("#model_name").html(e.name),$("#model_descriptions").html(e.descriptions),$(".panel_popup").removeClass("show")})}),$(".btn-model-cancel").on("click",function(){$(".panel_popup").removeClass("show")}),new QRCode("qrcode",{text:"http://3dworld.duapp.com/h5/models/preview/"+model_id,width:180,height:180,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H})});