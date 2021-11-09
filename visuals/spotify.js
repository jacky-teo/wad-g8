import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js";

export var scene5 = new THREE.Scene();
const loader = new GLTFLoader();
var obj;
loader.load("../objects/spotifylogo.gltf", function(gltf){
    obj = gltf.scene;
    var material = new THREE.MeshBasicMaterial( {color: 0x33ff4e} );
    obj = new THREE.Mesh(obj, material);
    scene5.add(gltf.scene);
});
scene5.background = new THREE.Color(0xBDF7C5);

var light = new THREE.DirectionalLight(0xffffff, 3.0);
light.position.set(2, 6, 1);
light.target.position.set(0, 0, 0);
scene5.add(light);
scene5.add(light.target);

export function scaleSpotify(scale) {
    scene5.scale.set (scale, scale, scale)
}