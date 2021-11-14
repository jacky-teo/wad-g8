import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';

export let scene2 = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
scene2.background = new THREE.Color(0x30383a);

// scene2.background = textureLoader.load('assets/carbg.jpg' , function(texture)
//             {   
//                 scene2.background = texture;  
//             });

let geometry2 = new THREE.SphereGeometry(100, 32, 32);

// let material2 = new THREE.MeshBasicMaterial({wireframe: true});

// const texture = new THREE.TextureLoader().load( "assets/soccertexture.jpg" );
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );
// let material2 = new THREE.MeshBasicMaterial({map: texture});

// const textureLoader = new THREE.TextureLoader();
const diffuse = textureLoader.load( 'assets/Carbon.png' );
diffuse.encoding = THREE.sRGBEncoding;
diffuse.wrapS = THREE.RepeatWrapping;
diffuse.wrapT = THREE.RepeatWrapping;
diffuse.repeat.x = 10;
diffuse.repeat.y = 10;

const normalMap = textureLoader.load( 'assets/Carbon_Normal.png' );
normalMap.wrapS = THREE.RepeatWrapping;
normalMap.wrapT = THREE.RepeatWrapping;

let material2 = new THREE.MeshPhysicalMaterial( {
    roughness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    map: diffuse,
    normalMap: normalMap
} );

let mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0, 0, 0);
scene2.add(mesh2);

const light = new THREE.AmbientLight(); // soft white light
scene2.add( light );

let particleLight = new THREE.Mesh(
    new THREE.SphereGeometry( 4, 8, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
);
scene2.add( particleLight );

particleLight.add( new THREE.PointLight( 0xffffff, 3 ) );

export function moveParticleLight() {
    const timer = Date.now() * 0.00025;

    particleLight.position.x = Math.sin( timer * 7 ) * 300;
    particleLight.position.y = Math.cos( timer * 5 ) * 400;
    particleLight.position.z = Math.cos( timer * 3 ) * 300;

}

export function animateSphere() {
    mesh2.rotation.y += 0.01;
    mesh2.rotation.x += 0.01;
}

export function scaleSphere(scale) {
    if (scale > 1) {
        mesh2.scale.set (scale, scale, scale)
    }
}

export function scaleBigSphere() {
    // mesh2.scale.x += 0.1
    // mesh2.scale.y += 0.1
    // mesh2.scale.z += 0.1
    mesh2.position.y += 15
}

export function scaleSmallSphere() {
    // mesh2.scale.x -= 0.1
    // mesh2.scale.y -= 0.1
    // mesh2.scale.z -= 0.1
    mesh2.position.y -= 15
}