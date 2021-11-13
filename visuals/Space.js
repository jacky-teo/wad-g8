import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';

export let  scene3 = new THREE.Scene();

const loader = new THREE.TextureLoader();
// let bgTexture = loader.load('assets/starfield.jpg' , function(texture)
//             {   
//                 scene3.background = texture;  
//             });

const geometry = new THREE.SphereGeometry( 75, 32, 16 );
const material = new THREE.MeshLambertMaterial( { color: 0xF5F5DC } );
const sphere = new THREE.Mesh( geometry, material );
scene3.add( sphere );

const torusG = new THREE.TorusGeometry( 100, 1, 16, 100 );
const torusM = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torus = new THREE.Mesh( torusG, torusM );
scene3.add( torus );

const light = new THREE.PointLight( 0xffff00, 2, 500 );
light.position.set( 150, 150, 150 );
scene3.add( light );

const light1 = new THREE.PointLight( 0xffff00, 0.5, 500 );
light1.position.set( -150, -150, 150 );
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

export function animateSpace() {
    for(var i=0; i<stars.length; i++) {
                    
        let star = stars[i]; 
            
        // and move it forward dependent on the mouseY position. 
        star.position.z +=  i/50;
            
        // if the particle is too close move it to the back
        if(star.position.z>1000) star.position.z-=2000; 
        
    }
    
    torus.rotation.x += 0.01
    torus.rotation.y += 0.02
    torus.rotation.z += 0.01
}

export function scaleSpace(scale) {
    if (scale > 1) {
        torus.scale.set(scale, scale, scale);
    }
}

export function scaleBigSpace() {
    sphere.scale.x += 0.025
    sphere.scale.y += 0.025
    sphere.scale.z += 0.025
    torus.scale.x += 0.1
    torus.scale.y += 0.1
    torus.scale.z += 0.1
}

export function scaleSmallSpace() {
    sphere.scale.x -= 0.025
    sphere.scale.y -= 0.025
    sphere.scale.z -= 0.025
    torus.scale.x -= 0.1
    torus.scale.y -= 0.1
    torus.scale.z -= 0.1
}