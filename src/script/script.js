import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import sunTexture from "../Images/sunmap.jpg";
import merTexture from "../Images/mercurymap.jpg";
import venusTexture from "../Images/venusmap.jpg";
import earthTexture from "../Images/earthmap1k.jpg";
import marsTexture from "../Images/marsmap1k.jpg";
import jupiterTexture from "../Images/jupitermap.jpg";
import saturnTexture from "../Images/saturnmap.jpg";
import saturnRingTexture from "../Images/saturnringcolor.jpg";
import uranusTexture from "../Images/uranusmap.jpg";
import uranusRingColorTexture from "../Images/uranusringcolour.jpg";
import neptuneTexture from "../Images/neptunemap.jpg";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the color of the background
renderer.setClearColor(0x000000); // black background for starfield effect

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

// Sets orbit control to move the camera around.
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning.
camera.position.set(6, 8, 14);
orbit.update();

// Creates a 12 by 12 grid helper.
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Creates an axes helper with an axis length of 4.
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// Stars array to hold the star objects
let stars = [];

// Add stars to the scene
function addStars() {
  for (let z = -1000; z < 1000; z += 20) {
    // Create a sphere for the stars
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);

    // Set random x and y positions for each star
    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;

    // Set the z position for each star
    sphere.position.z = z;

    // Scale up the star
    sphere.scale.x = sphere.scale.y = 2;

    // Add the star to the scene
    scene.add(sphere);

    // Store the star in the stars array
    stars.push(sphere);
  }
}
const textureLoader = new THREE.TextureLoader();

// Sun
const sunMap = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunMap, sunMat);
scene.add(sun);

// Planets and their orbits

// Mercury
const mercuryMap = new THREE.SphereGeometry(3.2, 30, 30);
const mercuryMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(merTexture),
});
const mercury = new THREE.Mesh(mercuryMap, mercuryMat);
const mercuryOrbitRadius = 30;
scene.add(mercury);

// Venus
const venusMap = new THREE.SphereGeometry(8, 30, 30);
const venusMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(venusTexture),
});
const venus = new THREE.Mesh(venusMap, venusMat);
const venusOrbitRadius = mercuryOrbitRadius * 1.87;
scene.add(venus);

// Earth
const earthMap = new THREE.SphereGeometry(8.5, 30, 30);
const earthMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(earthTexture),
});
const earth = new THREE.Mesh(earthMap, earthMat);
const earthOrbitRadius = mercuryOrbitRadius * 2.57;
scene.add(earth);

// Mars
const marsMap = new THREE.SphereGeometry(4.5, 30, 30);
const marsMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(marsTexture),
});
const mars = new THREE.Mesh(marsMap, marsMat);
const marsOrbitRadius = mercuryOrbitRadius * 3.88;
scene.add(mars);

// Jupiter
const jupiterMap = new THREE.SphereGeometry(10, 30, 30);
const jupiterMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(jupiterTexture),
});
const jupiter = new THREE.Mesh(jupiterMap, jupiterMat);
const jupiterOrbitRadius = mercuryOrbitRadius * 7.33;
scene.add(jupiter);

// Saturn
const saturnMap = new THREE.SphereGeometry(9, 30, 30);
const saturnMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(saturnTexture),
});
const saturn = new THREE.Mesh(saturnMap, saturnMat);
const saturnOrbitRadius = mercuryOrbitRadius * 10.47;
scene.add(saturn);

// Uranus
const uranusMap = new THREE.SphereGeometry(8.2, 30, 30);
const uranusMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(uranusTexture),
});
const uranus = new THREE.Mesh(uranusMap, uranusMat);
const uranusOrbitRadius = mercuryOrbitRadius * 12.26;
scene.add(uranus);

// Neptune
const neptuneMap = new THREE.SphereGeometry(7.9, 30, 30);
const neptuneMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(neptuneTexture),
});
const neptune = new THREE.Mesh(neptuneMap, neptuneMat);
const neptuneOrbitRadius = mercuryOrbitRadius * 14.27;
scene.add(neptune);

//RINGS
const saturnRingGeo = new THREE.RingGeometry(10, 20, 32); // Inner and outer radius of the ring
const saturnRingMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(saturnRingTexture),
  side: THREE.DoubleSide, // Ensure the texture is visible from both sides
  transparent: true, // Transparency for better visual
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnRing.rotation.x = Math.PI / 2; // Rotate to lie flat around the planet
saturnRing.position.set(
  saturn.position.x,
  saturn.position.y,
  saturn.position.z
); // Position it around Saturn
scene.add(saturnRing);

// Add rings to Uranus
const uranusRingGeo = new THREE.RingGeometry(8, 12, 32); // Adjust the inner and outer radius as needed
const uranusRingMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(uranusRingColorTexture),
  side: THREE.DoubleSide,
  transparent: true,
});
const uranusRing = new THREE.Mesh(uranusRingGeo, uranusRingMat);
uranusRing.rotation.x = Math.PI / 2; // Rotate to lie flat around Uranus
uranusRing.position.set(
  uranus.position.x,
  uranus.position.y,
  uranus.position.z
); // Position it around Uranus
scene.add(uranusRing);

// Variables for planet orbit animations
let mercuryAngle = 0;
let venusAngle = 0;
let earthAngle = 0;
let marsAngle = 0;
let jupiterAngle = 0;
let saturnAngle = 0;
let uranusAngle = 0;
let neptuneAngle = 0;

// Define speeds (in km/s) and calculate corresponding angular velocities
const mercurySpeed = 17.9;
const venusSpeed = 15.0;
const earthSpeed = 13.8;
const marsSpeed = 10.0;
const jupiterSpeed = 8.1;
const saturnSpeed = 7.69;
const uranusSpeed = 6.81;
const neptuneSpeed = 3.43;

const mercuryAngularSpeed = mercurySpeed / mercuryOrbitRadius;
const venusAngularSpeed = venusSpeed / venusOrbitRadius;
const earthAngularSpeed = earthSpeed / earthOrbitRadius;
const marsAngularSpeed = marsSpeed / marsOrbitRadius;
const jupiterAngularSpeed = jupiterSpeed / jupiterOrbitRadius;
const saturnAngularSpeed = saturnSpeed / saturnOrbitRadius;
const uranusAngularSpeed = uranusSpeed / uranusOrbitRadius;
const neptuneAngularSpeed = neptuneSpeed / neptuneOrbitRadius;

// Animate stars (move them forward to create the "moving" starfield effect)
function animateStars() {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];

    // Move the star forward
    star.position.z += i / 10;

    // Reset the star position if it comes too close
    if (star.position.z > 1000) star.position.z -= 2000;
  }
}

// The animation loop
function animate() {
  // Update the star positions
  animateStars();

  // Rotate the sun on its axis
  sun.rotation.y += 0.005;

  // Rotate planets on their axes and move them around the Sun
  mercury.rotation.y += 0.02;
  mercuryAngle += mercuryAngularSpeed;
  mercury.position.x = mercuryOrbitRadius * Math.cos(mercuryAngle);
  mercury.position.z = mercuryOrbitRadius * Math.sin(mercuryAngle);

  venus.rotation.y += 0.02;
  venusAngle += venusAngularSpeed;
  venus.position.x = venusOrbitRadius * Math.cos(venusAngle);
  venus.position.z = venusOrbitRadius * Math.sin(venusAngle);

  earth.rotation.y += 0.02;
  earthAngle += earthAngularSpeed;
  earth.position.x = earthOrbitRadius * Math.cos(earthAngle);
  earth.position.z = earthOrbitRadius * Math.sin(earthAngle);

  mars.rotation.y += 0.02;
  marsAngle += marsAngularSpeed;
  mars.position.x = marsOrbitRadius * Math.cos(marsAngle);
  mars.position.z = marsOrbitRadius * Math.sin(marsAngle);

  jupiter.rotation.y += 0.02;
  jupiterAngle += jupiterAngularSpeed;
  jupiter.position.x = jupiterOrbitRadius * Math.cos(jupiterAngle);
  jupiter.position.z = jupiterOrbitRadius * Math.sin(jupiterAngle);

  saturn.rotation.y += 0.02;
  saturnAngle += saturnAngularSpeed;
  saturn.position.x = saturnOrbitRadius * Math.cos(saturnAngle);
  saturn.position.z = saturnOrbitRadius * Math.sin(saturnAngle);

  uranus.rotation.y += 0.02;
  uranusAngle += uranusAngularSpeed;
  uranus.position.x = uranusOrbitRadius * Math.cos(uranusAngle);
  uranus.position.z = uranusOrbitRadius * Math.sin(uranusAngle);

  neptune.rotation.y += 0.02;
  neptuneAngle += neptuneAngularSpeed;
  neptune.position.x = neptuneOrbitRadius * Math.cos(neptuneAngle);
  neptune.position.z = neptuneOrbitRadius * Math.sin(neptuneAngle);

  saturnRing.position.x = saturn.position.x;
  saturnRing.position.z = saturn.position.z;

  // Move Uranus's rings with the planet
  uranusRing.position.x = uranus.position.x;
  uranusRing.position.z = uranus.position.z;

  // Render the scene
  renderer.render(scene, camera);
}

// Initialize stars and start the animation
addStars();
renderer.setAnimationLoop(animate);

// Handle window resizing
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
