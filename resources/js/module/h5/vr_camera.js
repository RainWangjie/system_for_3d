/**
 * Created by GeWangjie on 2016/4/30.
 */
define([], function () {
    function VRControls(camera_left, scene_left, camera_right, scene_right, render, radius) {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function (event) {
                device.alpha = Math.round(event.alpha, 2);
                device.beta = Math.round(event.beta, 2);
                device.gamma = Math.round(event.gamma, 2);
                //document.getElementById("alpha").innerHTML = device.alpha;
                //document.getElementById("beta").innerHTML = device.beta;
                //document.getElementById("gamma").innerHTML = device.gamma;
            }, false);
        } else {
            alert('您的设备不支持');
        }
        var device = {
            radius: radius,
            alpha: 0,
            beta: 0,
            gamma: 90,
            left_x: 0,
            left_y: 200,
            left_z: 0,
            right_x: 0,
            right_y: 200,
            right_z: 0
        };

        function angleToRadian(angle) {
            return angle / 180 * Math.PI;
        }

        function myRender() {
            move();
            //document.getElementById("camera_left").innerHTML = '(' + device.left_x + ',' + device.left_y + ',' + device.left_z + ')';
            //document.getElementById("camera_right").innerHTML = '(' + device.right_x + ',' + device.right_y + ',' + device.right_z + ')';

            camera_left.position.set(device.left_x, device.left_y, device.left_z);
            camera_right.position.set(device.right_x, device.right_y, device.right_z);

            camera_left.lookAt(scene_left.position);
            camera_right.lookAt(scene_right.position);

            render();

            window.requestAnimationFrame(myRender);
        }

        myRender();

        function move() {
            //y轴坐标
            if (device.gamma < 0) {
                /* y = R * cos(gamma);gamma转弧度*/
                device.left_y = device.radius * Math.cos(angleToRadian(device.gamma));
            } else {
                /* y = -R * cos(gamma);gamma转弧度*/
                device.left_y = -1 * device.radius * Math.cos(angleToRadian(device.gamma));
            }
            device.right_y = device.left_y;

            //球形比例 (R-|y|)/R
            var scale = (device.radius - Math.abs(device.left_y)) / device.radius;
            //gamma -90～90过渡
            if (device.gamma < 0) {
                device.alpha = device.alpha - 180;
            }
            device.alpha = (device.alpha + 360) % 360;

            //左屏
            /* x = R * cos(alpha) * scale */
            device.left_x = device.radius * Math.cos(angleToRadian(device.alpha)) * scale;
            /* z = -R * sin(alpha) * scale */
            device.left_z = -1 * device.radius * Math.sin(angleToRadian(device.alpha)) * scale;
            device.left_x = Math.round(device.left_x);
            device.left_y = Math.round(device.left_y);
            device.left_z = Math.round(device.left_z);

            //右屏
            var right_alpha = (device.alpha + 15 + 360) % 360;
            /* x = R * cos(alpha) * scale */
            device.right_x = device.radius * Math.cos(angleToRadian(right_alpha)) * scale;
            /* z = -R * sin(alpha) * scale */
            device.right_z = -1 * device.radius * Math.sin(angleToRadian(right_alpha)) * scale;
            device.right_x = Math.round(device.right_x);
            device.right_y = Math.round(device.right_y);
            device.right_z = Math.round(device.right_z);
        }
    }

    return VRControls;
});