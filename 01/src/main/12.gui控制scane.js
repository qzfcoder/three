import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 导入动画库
import gsap from "gsap";
// console.log(THREE);

// 导入dat.gui库
import * as dat from "dat.gui";

// 创建一个场景
const scene = new THREE.Scene();

// 创建相机  --- 透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// x y z轴
camera.position.set(0, 0, 10);

scene.add(camera);

// 添加物体
// 创建几何体对象
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff,
});
// 根据集合体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体的位置
cube.position.set(1, 0, 0);
// 设置缩放位置
cube.scale.set(3, 2, 1);
// 旋转
cube.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 2);

const gui = new dat.GUI();
gui
  .add(cube.position, "y")
  .min(0)
  .max(5)
  .name("11")
  .onChange((e) => {
    console.log("修改的值", e);
  })
  .onFinishChange((e) => {
    console.log("结束", e);
  });
// 修改物体的颜色
const params = {
  color: "#ffff00",
  fn: () => {
    let animation;
    if (animation) {
      animation = null;
    } else {
      // 让立方图运动起来
      animation = gsap.to(cube.position, {
        x: 5,
        duration: 5,
        repeat: -1, // -1 无限次循环
        yoyo: true, // 往返运动
        // delay: 2, // 延迟2s运动
        ease: "power1.inOut",
        onComplete: () => {
          console.log("动画完成--position");
        },
        onStart: () => {
          console.log("动画开始--position");
        },
      });
    }
  },
};
gui.addColor(params, "color").onChange((e) => {
  console.log("e", e);
  cube.material.color.set(e);
});
// 控制显示隐藏
gui.add(cube, "visible").name("显示隐藏");
// 点击触发摸个事件
gui.add(params, "fn").name("点击");

let folder = gui.addFolder("设置立方体");
folder.add(cube.material, "wireframe").name("是否显示线框");
// 添加到场景中
scene.add(cube);

// 渲染出啦
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webGlrendr渲染到body上
document.body.appendChild(renderer.domElement);

// 通过相机使用渲染器，将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 设置控制器阻尼，让控制器更加真实,必须在动画循环中update
controls.enableDamping = true;
// camera.position.set()

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置动画
// var animate1 =
gsap.to(cube.rotation, { x: Math.PI, duration: 5, ease: "power1.inOut" });
// 控制全屏控制
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    // 双击进入全屏/退出全屏
    renderer.domElement.requestFullscreen();
  } else {
    console.log(document);
    document.exitFullscreen();
  }
});

function render() {
  controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧的时候
  requestAnimationFrame(render);
}

render();

// 监听画面的变化，更新渲染画面
window.addEventListener("resize", () => {
  console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影居正
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
});
