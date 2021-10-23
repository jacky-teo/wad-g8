import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';

export let  scene2 = new THREE.Scene();

let geometry2 = new THREE.SphereGeometry(100, 10, 10);
let material2 = new THREE.MeshNormalMaterial();

let mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0, 0, 150);
scene2.add(mesh2);

export function scaleSphere(scale) {
    mesh2.scale.set (scale, scale, scale)
}