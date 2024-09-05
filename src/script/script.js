import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// Global declaration
let scene, camera, renderer, bloomComposer;
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// Scene setup
scene = new THREE.Scene();

const fov = 45;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(6, 8, 14);
scene.add(camera);

// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Grid and Axes Helpers
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// Sun Object
const sunColor = new THREE.Color("#FDB813");
const sunGeometry = new THREE.IcosahedronGeometry(1, 15);
const sunMaterial = new THREE.MeshBasicMaterial({ color: sunColor });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0);
sun.layers.set(1);
scene.add(sun);

// Galaxy / Stars background (Sphere)
const starGeometry = new THREE.SphereGeometry(80, 64, 64);
const starMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("texture/galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.layers.set(1);
scene.add(starMesh);

// Bloom effect
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // Strength of bloom
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2; // Intensity of the glow
bloomPass.radius = 0;
bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Resize event listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
});

/