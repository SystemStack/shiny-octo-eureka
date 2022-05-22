import {
  AmbientLight,
  AnimationMixer,
  PerspectiveCamera,
  PointLight,
  ReinhardToneMapping,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import octopath from "../../assets/models/octopus.3mf";

let camera, stats, composer, renderer, mixer, clock;
const params = {
  exposure: 1,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 0,
};

export function init_weaponeffect() {
  let container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);

  renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = ReinhardToneMapping;
  container.appendChild(renderer.domElement);

  const scene = new Scene();

  camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
  camera.position.set(-5, 2.5, -3.5);
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.5;
  controls.minDistance = 1;
  controls.maxDistance = 10;

  scene.add(new AmbientLight(0x404040));

  const pointLight = new PointLight(0xffffff, 1);
  camera.add(pointLight);

  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;

  composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  new ThreeMFLoader().load(octopath, function (tmf) {
    // const model = tmf.;

    scene.add(tmf);

    mixer = new AnimationMixer(tmf);
    // const clip = tmf.animations[0];
    // mixer.clipAction(clip.optimize()).play();

    animate();
  });

  const gui = new GUI();

  gui.add(params, "exposure", 0.1, 2).onChange(function (value) {
    renderer.toneMappingExposure = Math.pow(value, 4.0);
  });

  gui.add(params, "bloomThreshold", 0.0, 1.0).onChange(function (value) {
    bloomPass.threshold = Number(value);
  });

  gui.add(params, "bloomStrength", 0.0, 3.0).onChange(function (value) {
    bloomPass.strength = Number(value);
  });

  gui
    .add(params, "bloomRadius", 0.0, 1.0)
    .step(0.01)
    .onChange(function (value) {
      bloomPass.radius = Number(value);
    });

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  mixer.update(delta);

  stats.update();

  composer.render();
}
