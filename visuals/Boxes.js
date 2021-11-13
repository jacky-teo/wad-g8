import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';

export let  scene1 = new THREE.Scene();
scene1.background = new THREE.Color(0xff9100);

const geometry = new THREE.BoxGeometry( 100, 100, 100 );
const material = new THREE.MeshNormalMaterial();
const cubeMesh = new THREE.Mesh(geometry, material)
cubeMesh.position.set(0, 0, 0);
scene1.add(cubeMesh);

export function animateboxes() {
    cubeMesh.rotation.y += 0.01;
    cubeMesh.rotation.x += 0.01;
}

export function scaleboxes(scale) {
    if (scale > 1) {
        cubeMesh.scale.set( scale, scale, scale )
    }
}

export function scaleBigBoxes() {
    cubeMesh.scale.x += 0.1
    cubeMesh.scale.y += 0.1
    cubeMesh.scale.z += 0.1
}

export function scaleSmallBoxes() {
    cubeMesh.scale.x -= 0.1
    cubeMesh.scale.y -= 0.1
    cubeMesh.scale.z -= 0.1
}