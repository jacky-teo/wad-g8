import * as THREE from "./three.js-master/build/three.module.js";
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load('assets/dj.glb', function(glb){
    console.log(glb);
    const root = glb.scene;
    root.position.set(-3,0,1);
    root.scale.set(0.005,0.005,0.005);
    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded/xhr.total *100) + "% loaded")
}, function(error){
    console.log('An error has occured');
});

//const light = new THREE.DirectionalLight(0xffffff, 1);
const light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(0,2,5);
scene.add(light);
scene.background = new THREE.Color(0xcce0ff); //Background color

//Boiler Plate Code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.set(2,1,3);
scene.add(camera);

//Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOuput = true;

// Create Orbit Control
const controls = new OrbitControls( camera, renderer.domElement );

// Make sure the project is responsive based on window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
})

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();