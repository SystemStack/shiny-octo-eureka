import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { centerCanvas } from "../utils";
//something like: https://threejs.org/examples/#webgl_lines_sphere

let camera, scene, renderer;
const parameters = [
  [0.25, 0xff7700, 1],
  [0.5, 0xff9900, 1],
  [0.75, 0xffaa00, 0.75],
  [1, 0xffaa00, 0.5],
  [1.25, 0x000833, 0.8],
  [3.0, 0xaaaaaa, 0.75],
  [3.5, 0xffffff, 0.5],
  [4.5, 0xffffff, 0.25],
  [5.5, 0xffffff, 0.125],
];

export function init_background(canvas) {
  camera = new PerspectiveCamera(80, canvas.width / canvas.height, 1, 3000);
  camera.position.z = 1000;
  scene = new Scene();

  const geometry = createGeometry();
  for (let i = 0; i < parameters.length; i++) {
    const material = new LineBasicMaterial({
      color: parameters[i][1],
      opacity: parameters[i][2],
    });
    const line = new LineSegments(geometry, material);
    line.scale.x = line.scale.y = line.scale.z = parameters[i][0];
    line.userData.originalScale = parameters[i][0];
    line.rotation.y = Math.random() * Math.PI;
    line.updateMatrix();
    scene.add(line);
  }
  renderer = new WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.width, canvas.height);
  centerCanvas(renderer.domElement);
  document.body.appendChild(renderer.domElement);
  scene.traverse(function (object) {
    if (object.isLine) {
      object.geometry.dispose();
      object.geometry = geometry;
    }
  });
  animate();
}

function createGeometry() {
  const geometry = new BufferGeometry();
  const vertices = [];
  const vertex = new Vector3();
  const numVertices = Math.floor(Math.random() * (50000 - 1000 + 1) + 1000);
  for (let i = 0; i < numVertices; i++) {
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    if (i % 10 !== 0) vertex.normalize();
    vertex.multiplyScalar(450);
    vertices.push(vertex.x, vertex.y, vertex.z);
    vertex.multiplyScalar(Math.random() * 0.09 + 1);
    vertices.push(vertex.x, vertex.y, vertex.z);
  }
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  return geometry;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.y += (200 - camera.position.y) * 1.55;
  renderer.render(scene, camera);
  const time = Date.now() * 0.0001;
  for (let i = 0; i < scene.children.length; i++) {
    const object = scene.children[i];
    if (object.isLine) {
      object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
      const scale =
        object.userData.originalScale *
        (i / 5 + 1) *
        (1 + 0.5 * Math.sin(7 * time));
      object.scale.x = object.scale.y = object.scale.z = scale;
    }
  }
}
