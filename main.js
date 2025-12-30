import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


const a1 = new Audio('./happy-birthday-155461.mp3');
a1.loop = true; 
a1.play();

a1.play().catch(() => {
  document.body.addEventListener('click', () => {
    a1.play();
  }, { once: true });
});

const scene = new THREE.Scene();
const loader = new GLTFLoader();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
loader.load( './dannypt3.glb', function ( glb ) {

  console.log(glb.scene.children[0].name)
  scene.add( glb.scene );

}, undefined, function ( error ) {

  console.error( error );

} );





window.addEventListener('resize', onWindowResize, false);
const light = new THREE.AmbientLight(0xffe7ba, 1.2)
scene.add(light);

const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
hemi.color.set(0xffddaa); // warm sunlight
hemi.groundColor.set(0x403020); // darker, earthy tone
hemi.intensity = 0.6;
scene.add(hemi);



const aspect = sizes.width / sizes.height;

const camera = new THREE.OrthographicCamera(
    -aspect * 50, 
    aspect * 50, 
    50, 
    -50, 
    1, 
    1000,
);
camera.zoom = 25;
camera.position.set(
  -2.926337236690186,   // x
   2.78981291293474798, // y
  -3.300818310395008    // z
);



const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color("#8a9cab"); 
function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  const aspect = newWidth / newHeight;
  camera.left = -aspect * 50;
  camera.right = aspect * 50;
  camera.top = 50;
  camera.bottom = -50;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}


const controls = new OrbitControls( camera, renderer.domElement );



controls.update();
camera.updateProjectionMatrix();



function animate(){
   
    console.log(camera.position)
    renderer.render(scene, camera)
}


renderer.setAnimationLoop(animate);
