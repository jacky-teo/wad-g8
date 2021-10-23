import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';

export let  scene3 = new THREE.Scene();

const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshLambertMaterial( { color: 0xF5F5DC } );
const sphere = new THREE.Mesh( geometry, material );
scene3.add( sphere );

const torusG = new THREE.TorusGeometry( 20, 1, 16, 100 );
const torusM = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torus = new THREE.Mesh( torusG, torusM );
scene3.add( torus );

const light = new THREE.PointLight( 0xffff00, 1, 100 );
light.position.set( 50, 50, 50 );
scene3.add( light );

const light1 = new THREE.PointLight( 0xffff00, 1, 100 );
light1.position.set( -50, -50, 50 );
scene3.add( light1 );

// controls = new OrbitControls(camera, renderer.domElement);

const createStar = function () {
    let g = new THREE.SphereGeometry(0.5, 32, 32);
    let m = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    let s = new THREE.Mesh(g, m);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500))
    s.position.set(x, y, z)
    scene3.add(s)

    stars.push(s)
}

let stars = [];

for (let i = 0; i < 300; i++){
    createStar()
}