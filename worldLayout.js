// worldLayout.js

// Basic scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500); // Adjusted near and far planes
const renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true }); // Enabled logarithmicDepthBuffer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a plane
const planeGeometry = new THREE.PlaneGeometry(200, 200, 10, 10); // Increased plane size
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// Improved object placement with InstancedMesh for performance

const count = 50;
const gridSize = 10;
const spacing = 20;

// Add instanced cubes
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cubes = new THREE.InstancedMesh(cubeGeometry, cubeMaterial, count);
scene.add(cubes);

// Add instanced spheres
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16); // Reduced sphere complexity
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const spheres = new THREE.InstancedMesh(sphereGeometry, sphereMaterial, count);
scene.add(spheres);

const matrix = new THREE.Matrix4();
for (let i = 0; i < count; i++) {
    // Grid-based positioning to avoid overlap
    const x = (i % gridSize) * spacing - (gridSize * spacing) / 2;
    const z = Math.floor(i / gridSize) * spacing - (count / gridSize * spacing) / 2;

    // Cubes
    matrix.setPosition(x, 1, z); // Set y position to 1 to avoid z-fighting
    cubes.setMatrixAt(i, matrix);

    // Spheres (with an offset to avoid overlapping with cubes)
    matrix.setPosition(x + spacing / 2, 0.5, z + spacing / 2); // Set y position to 0.5
    spheres.setMatrixAt(i, matrix);
}

// Add an airplane model (placeholder)
const airplaneGeometry = new THREE.BoxGeometry(5, 1, 2);
const airplaneMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const airplane = new THREE.Mesh(airplaneGeometry, airplaneMaterial);
airplane.position.y = 10; // Raised airplane
scene.add(airplane);

camera.position.z = 40; // Adjusted camera position
camera.position.y = 40;
camera.lookAt(0, 0, 0);


function animate() {
  requestAnimationFrame(animate);

  // Airplane movement
  airplane.position.x += 0.05;
  if (airplane.position.x > 100) {
    airplane.position.x = -100;
  }


  renderer.render(scene, camera);
}

animate();