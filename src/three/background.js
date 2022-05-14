import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
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
  // const spiderGeometry = createSpider();
  // scene.add(spiderGeometry);
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
  // renderer.domElement.style.top = 0;
  // renderer.domElement.style.left = 0;

  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.zIndex = 0;
  const gameSection = document.body.getElementsByClassName("Game_Section")[0];
  gameSection.prepend(renderer.domElement);
  scene.traverse(function (object) {
    if (object.isLine) {
      object.geometry.dispose();
      object.geometry = geometry;
    }
  });
  animate();
}

function createSpiderLeg() {}

function createSpider() {
  // a spider model has 8 legs, each leg has 2 bones, and each bone has 2 vertices
  // the vertices are stored in an array of length 24
  // the first 8 vertices are the first leg, the next 8 are the second leg, and so on
  // the first 4 vertices are the first bone, the next 4 are the second bone, and so on
  // the first 2 vertices are the first vertex, the next 2 are the second vertex, and so on
  // the first vertex is the top of the first bone, the second vertex is the bottom of the first bone,
  // the third vertex is the top of the second bone, and so on
  // the first vertex is the top of the first leg, the second vertex is the bottom of the first leg,
  // the third vertex is the top of the second leg, and so on
  var vertices = [
    // leg 1
    -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
    // leg 2
    -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
    // leg 3
    -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
    // leg 4
    -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
    // leg 5
    -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
    // leg 6
    -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
    // leg 7
    -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
    // leg 8
    -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
    // spine
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    // head
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    // eye
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    // mouth
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  ];
  var indices = [
    // leg 1
    0, 1, 2, 0, 2, 3,
    // leg 2
    4, 5, 6, 4, 6, 7,
    // leg 3
    8, 9, 10, 8, 10, 11,
    // leg 4
    12, 13, 14, 12, 14, 15,
    // leg 5
    16, 17, 18, 16, 18, 19,
    // leg 6
    20, 21, 22, 20, 22, 23,
    // leg 7
    24, 25, 26, 24, 26, 27,
    // leg 8
    28, 29, 30, 28, 30, 31,
    // spine
    32, 33, 34, 32, 34, 35,
    // head
    36, 37, 38, 36, 38, 39,
    // eye
    40, 41, 42, 40, 42, 43,
    // mouth
    44, 45, 46, 44, 46, 47,
  ];
  var geometry = new BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.computeBoundingSphere();
  var material = new MeshBasicMaterial({
    color: "white",
    wireframe: false,
  });
  var mesh = new Mesh(geometry, material);
  // mesh.scale.set(0.1, 0.1, 0.1);
  mesh.scale.set(1, 1, 1);
  mesh.updateMatrix();
  return mesh;
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
