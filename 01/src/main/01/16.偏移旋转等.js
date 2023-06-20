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

// for (let i = 0; i < 50; i++) {
//   // 没一个三角形需要三个顶点，每个顶点需要三个坐标
//   const Geometry = new THREE.BufferGeometry();
//   const positionArray = new Float32Array(9);
//   for (let j = 0; j < 9; j++) {
//     positionArray[j] = Math.random() * 5;
//   }
//   let color = new THREE.Color(Math.random(), Math.random(), Math.random());
//   Geometry.setAttribute(
//     "position",
//     new THREE.BufferAttribute(positionArray, 3)
//   );
//   const material = new THREE.MeshBasicMaterial({ color: color });
//   const mesh = new THREE.Mesh(Geometry, material);
//   scene.add(mesh);
// }

// 导入纹理
const textureLoader = new THREE.TextureLoader();
let doorColorTexture = textureLoader.load("./textures/1.jpg");
// 纹理偏移
// doorColorTexture.offset.x = 0.2;
// doorColorTexture.offset.y = 0.2;
// doorColorTexture.offset.set(0.5, 0.5);
// 纹理旋转
doorColorTexture.rotation = Math.PI / 4;
// 设置旋转原点
doorColorTexture.center.set(0.5, 0.5);
// 设置纹理的重复
doorColorTexture.repeat.set(2, 3);
// 设置纹理重复的模式
doorColorTexture.wrapS = THREE.RepeatWrapping;
console.log(doorColorTexture);
// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: doorColorTexture,
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);

scene.add(cube);
// 创建几何体对象

// const Geometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([
//   -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1,
// ]);

// Geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// 更具几何体额材质创建物体

// // 材质
// const Material = new THREE.MeshBasicMaterial({
//   color: 0xffff,
// });
// // 根据集合体和材质创建物体
// const mesh = new THREE.Mesh(Geometry, Material);

// scene.add(mesh);
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
