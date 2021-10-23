import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js';
import { scene2, scaleSphere } from './visuals/Sphere.js'
import { scene3 } from './visuals/Space.js'

feather.replace(); 

let s, camera, renderer, app, listener, sound, audioLoader, analyser;
let scene1, box;


app = Vue.createApp({
    data() {
        return {
            isPlaying: false,
            volume: 0.5,
            currSong: "Creativeminds - Bensound",
            songs: [
                "Creativeminds - Bensound", 
                "Never Gonna Give You Up - Rick Astley", 
                "Stay - The Kid LAROI, Justin Bieber",
                "Blackbird", 
                "Race Into The Night"
            ], 
            scenes: ["scene1", "scene2", "scene3"]
        }
    },
    methods: {
        playSound(){
            if (listener == undefined) {
                console.log("Starting Player")
                let startVol = this.volume;
                let file = "sounds/" + this.currSong + ".mp3";
                // create an AudioListener and add it to the camera
                listener = new THREE.AudioListener();
                camera.add( listener );

                // create a global audio source
                sound = new THREE.Audio( listener );

                // load a sound and set it as the Audio object's buffer
                audioLoader = new THREE.AudioLoader();

                audioLoader.load( file, function( buffer ) {
                    sound.setBuffer( buffer );
                    sound.setLoop( true );
                    sound.setVolume( startVol );
                    sound.play();
                });
                analyser = new THREE.AudioAnalyser( sound, 32 );
            } else {
                sound.play();
            }
            this.isPlaying = true;
        },
        pauseSound() {
            sound.pause();
            this.isPlaying = false;
        },
        stopSound() {
            if (sound != undefined) {
                sound.stop();
                this.isPlaying = false;
            }
        },
        setVolume() {
            if (sound != undefined) {
                sound.setVolume(this.volume);
            }
        }, 
        changeSong(e) {
            if (sound != undefined) {
                sound.stop();
            }

            if (listener != undefined) {
                let startVol = this.volume;
                let file = "sounds/" + e.target.value + ".mp3";
                let isPlaying = this.isPlaying;

                // load a sound and set it as the Audio object's buffer
                audioLoader = new THREE.AudioLoader();
                audioLoader.load( file, function( buffer ) {
                    sound.setBuffer( buffer );
                    sound.setLoop( true );
                    sound.setVolume( startVol );
                    if (isPlaying) {
                        sound.play();
                    }
                });
                analyser = new THREE.AudioAnalyser( sound, 32 );
            }
        }, 
        changeScene(value) {
            if (value == "scene1") {
                s = scene1;
            } else if (value == "scene2") {
                s = scene2;
            } else if (value == "scene3") {
                s = scene3;
            }
        }
    },
    mounted() {
        init();
    }
})

app.mount("#app");

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 500);
    renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#c"), antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    scene1 = new THREE.Scene();
    
    //Box
    let boxG = new THREE.BoxGeometry( 100, 100, 100 );
    let boxM = new THREE.MeshNormalMaterial();
    box = new THREE.Mesh(boxG, boxM);
    box.position.set(0, 0, 150);
    scene1.add(box);

    s = scene1;
	animate();
}

function animate() {
    requestAnimationFrame( animate )
    box.rotation.y += 0.01;
    box.rotation.x += 0.01;

    if (analyser != undefined) {
        let sUnit = analyser.getAverageFrequency()/75;
        box.scale.set( sUnit, sUnit, sUnit )
        scaleSphere(sUnit)
    }

    renderer.render( s, camera );
}
