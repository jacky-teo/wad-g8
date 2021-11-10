import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';

export let  scene6 = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 100, 100, 100 );
const material = new THREE.MeshNormalMaterial();
const cubeMesh = new THREE.Mesh(geometry, material)
cubeMesh.position.set(0, 0, 150);
scene6.add(cubeMesh);

export function animateboxes() {
    cubeMesh.rotation.y += 0.01;
    cubeMesh.rotation.x += 0.01;
}

export function scaleboxes(scale) {
    cubeMesh.scale.set( scale, scale, scale )
}