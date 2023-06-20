import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// console.log(THREE);

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

// camera.position.set()

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

function render() {
  // 获取时钟运行总时长
  let time = clock.getElapsedTime();
  // let deltaTime = clock.getDelta();
  // console.log("时钟运行的总时长：", time);
  // console.log("两次获取时间的间隔：", deltaTime);
  let t = time % 5;
  cube.position.x = t * 1;
  cube.rotation.x = t * 1;
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }
  renderer.render(scene, camera);
  // 渲染下一帧的时候
  requestAnimationFrame(render);
}

render();
