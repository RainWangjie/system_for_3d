define([],function(){function t(t,a,i,r,h,n){function e(t){return t/180*Math.PI}function o(){_(),t.position.set(l.left_x,l.left_y,l.left_z),i.position.set(l.right_x,l.right_y,l.right_z),t.lookAt(a.position),i.lookAt(r.position),h(),window.requestAnimationFrame(o)}function _(){l.gamma<0?l.left_y=l.radius*Math.cos(e(l.gamma)):l.left_y=-1*l.radius*Math.cos(e(l.gamma)),l.right_y=l.left_y;var t=(l.radius-Math.abs(l.left_y))/l.radius;l.gamma<0&&(l.alpha=l.alpha-180),l.alpha=(l.alpha+360)%360,l.left_x=l.radius*Math.cos(e(l.alpha))*t,l.left_z=-1*l.radius*Math.sin(e(l.alpha))*t,l.left_x=Math.round(l.left_x),l.left_y=Math.round(l.left_y),l.left_z=Math.round(l.left_z);var a=(l.alpha+15+360)%360;l.right_x=l.radius*Math.cos(e(a))*t,l.right_z=-1*l.radius*Math.sin(e(a))*t,l.right_x=Math.round(l.right_x),l.right_y=Math.round(l.right_y),l.right_z=Math.round(l.right_z)}window.DeviceOrientationEvent?window.addEventListener("deviceorientation",function(t){l.alpha=Math.round(t.alpha,2),l.beta=Math.round(t.beta,2),l.gamma=Math.round(t.gamma,2)},!1):alert("您的设备不支持");var l={radius:n,alpha:0,beta:0,gamma:90,left_x:0,left_y:200,left_z:0,right_x:0,right_y:200,right_z:0};o()}return t});