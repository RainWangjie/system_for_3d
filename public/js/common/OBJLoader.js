THREE.OBJLoader=function(e){this.manager=void 0!==e?e:THREE.DefaultLoadingManager,this.materials=null},THREE.OBJLoader.prototype={constructor:THREE.OBJLoader,load:function(e,t,a,r){var s=this,n=new THREE.XHRLoader(s.manager);n.setPath(this.path),n.load(e,function(e){t(s.parse(e))},a,r)},setPath:function(e){this.path=e},setMaterials:function(e){this.materials=e},parse:function(e){function t(e){var t={vertices:[],normals:[],uvs:[]},a={name:"",smooth:!0};d={name:e,geometry:t,material:a},u.push(d)}function a(e){var t=parseInt(e);return 3*(t>=0?t-1:t+f.length/3)}function r(e){var t=parseInt(e);return 3*(t>=0?t-1:t+h.length/3)}function s(e){var t=parseInt(e);return 2*(t>=0?t-1:t+E.length/2)}function n(e,t,a){d.geometry.vertices.push(f[e],f[e+1],f[e+2],f[t],f[t+1],f[t+2],f[a],f[a+1],f[a+2])}function o(e,t,a){d.geometry.normals.push(h[e],h[e+1],h[e+2],h[t],h[t+1],h[t+2],h[a],h[a+1],h[a+2])}function i(e,t,a){d.geometry.uvs.push(E[e],E[e+1],E[t],E[t+1],E[a],E[a+1])}function l(e,t,l,d,u,m,f,h,E,v,c,p){var g,H=a(e),R=a(t),T=a(l);void 0===d?n(H,R,T):(g=a(d),n(H,R,g),n(R,T,g)),void 0!==u&&(H=s(u),R=s(m),T=s(f),void 0===d?i(H,R,T):(g=s(h),i(H,R,g),i(R,T,g))),void 0!==E&&(H=r(E),R=r(v),T=r(c),void 0===d?o(H,R,T):(g=r(p),o(H,R,g),o(R,T,g)))}console.time("OBJLoader");var d,u=[],m=!1,f=[],h=[],E=[];t("");for(var v=/^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,c=/^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,p=/^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,g=/^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,H=/^f\s+((-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+))(?:\s+((-?\d+)\/(-?\d+)))?/,R=/^f\s+((-?\d+)\/(-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+)\/(-?\d+))(?:\s+((-?\d+)\/(-?\d+)\/(-?\d+)))?/,T=/^f\s+((-?\d+)\/\/(-?\d+))\s+((-?\d+)\/\/(-?\d+))\s+((-?\d+)\/\/(-?\d+))(?:\s+((-?\d+)\/\/(-?\d+)))?/,w=/^[og]\s*(.+)?/,F=/^s\s+(\d+|on|off)/,x=e.split("\n"),y=0;y<x.length;y++){var A=x[y];A=A.trim();var b;if(0!==A.length&&"#"!==A.charAt(0))if(null!==(b=v.exec(A)))f.push(parseFloat(b[1]),parseFloat(b[2]),parseFloat(b[3]));else if(null!==(b=c.exec(A)))h.push(parseFloat(b[1]),parseFloat(b[2]),parseFloat(b[3]));else if(null!==(b=p.exec(A)))E.push(parseFloat(b[1]),parseFloat(b[2]));else if(null!==(b=g.exec(A)))l(b[1],b[2],b[3],b[4]);else if(null!==(b=H.exec(A)))l(b[2],b[5],b[8],b[11],b[3],b[6],b[9],b[12]);else if(null!==(b=R.exec(A)))l(b[2],b[6],b[10],b[14],b[3],b[7],b[11],b[15],b[4],b[8],b[12],b[16]);else if(null!==(b=T.exec(A)))l(b[2],b[5],b[8],b[11],void 0,void 0,void 0,void 0,b[3],b[6],b[9],b[12]);else if(null!==(b=w.exec(A))){var B=b[0].substr(1).trim();m===!1?(m=!0,d.name=B):t(B)}else if(/^usemtl /.test(A))d.material.name=A.substring(7).trim();else if(/^mtllib /.test(A));else{if(null===(b=F.exec(A)))throw new Error("Unexpected line: "+A);d.material.smooth="1"===b[1]||"on"===b[1]}}for(var L=new THREE.Group,y=0,J=u.length;y<J;y++){d=u[y];var M=d.geometry,O=new THREE.BufferGeometry;O.addAttribute("position",new THREE.BufferAttribute(new Float32Array(M.vertices),3)),M.normals.length>0?O.addAttribute("normal",new THREE.BufferAttribute(new Float32Array(M.normals),3)):O.computeVertexNormals(),M.uvs.length>0&&O.addAttribute("uv",new THREE.BufferAttribute(new Float32Array(M.uvs),2));var I;null!==this.materials&&(I=this.materials.create(d.material.name)),I||(I=new THREE.MeshPhongMaterial,I.name=d.material.name),I.shading=d.material.smooth?THREE.SmoothShading:THREE.FlatShading;var P=new THREE.Mesh(O,I);P.name=d.name,L.add(P)}return console.timeEnd("OBJLoader"),L}};