import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js';

import { scene1, animateboxes, scaleboxes, scaleBigBoxes, scaleSmallBoxes } from '../visuals/Boxes.js';
import { scene2, animateSphere, scaleSphere, scaleBigSphere, scaleSmallSphere, moveParticleLight } from '../visuals/Sphere.js'
import { scene3, animateSpace, scaleSpace, scaleBigSpace, scaleSmallSpace } from '../visuals/Space.js'
import { scene4, changeColors, spinCircle, boxScaling, scaleBigRotating, scaleSmallRotating } from '../visuals/RotatingBoxes.js'
import { scene5, scaleSpotify, scaleBigSpotify, scaleSmallSpotify } from '../visuals/spotify.js'
import { scene6, scaleSpotifyWording, scaleBigWording, scaleSmallWording } from '../visuals/spotifywordings.js'
import {musicObjArr,fName} from './upload.js'
//this is the most updated one 

feather.replace();

let s, camera, renderer, app, listener, sound, audioLoader, analyser, controls;

app = Vue.createApp({
    data() {
        return {
            isPlaying: false,
            volume: 0.5,
            currSong: "Way Back Home  - SHAUN feat. Conor Maynard",
            songs: [
                "Way Back Home  - SHAUN feat. Conor Maynard", 
                "Creative minds - Bensound", 
                "Never Gonna Give You Up - Rick Astley", 
                "Stay - The Kid LAROI, Justin Bieber",
                "Blackbird", 
                "Race Into The Night",
                "Kiss Me More - Doja Cat ft. SZA"
            ], 
            scenes: ["scene3", "scene4", "scene5", "scene6", "scene2", "scene1"],  
            userSongs:musicObjArr,
            currUserSong:''
        }
    },
    methods: {
         playUserSound(){
            if (listener == undefined) {
                console.log("Starting Player")
                let startVol = this.volume;
                let file = this.currUserSong
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
        changeUserSong(e) {
            if (sound != undefined) {
                sound.stop();
            }

            if (listener != undefined) {
                let startVol = this.volume;
                let file = e.target.value ;
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
            } else if (value == "scene4") {
                s = scene4;
            } else if (value == "scene5") {
                s = scene5;
            } else if (value == "scene6") {
                s = scene6;
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

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = false;
    controls.update();

    s = scene3;
	animate();
}

// var lastpause = Date.now();
// var totaltime = 0;

// function goFunction() {
//     totaltime += Date.now() - lastpause;
//     lastpause = Date.now();
// }

var toDecrease = 0;
function animate() {
    requestAnimationFrame( animate )
    animateboxes();
    animateSpace();
    animateSphere();
    moveParticleLight();
    spinCircle();

    if (analyser != undefined) {
        let sUnit = analyser.getAverageFrequency()/75;
        scaleSphere(sUnit);
        scaleSpace(sUnit);
        boxScaling(sUnit);
        changeColors();
        scaleSpotify(sUnit);
        scaleboxes(sUnit);
        scaleSpotifyWording(sUnit);
    }

    if (localStorage.getItem('analysis') != null) {
        let analysisData = JSON.parse(localStorage.getItem("analysis"))
        let progress = Number(localStorage.getItem("progress"))
        // console.log(analysisData)

        if (progress != null) {
            // console.log(progress)
            let beats = analysisData.beats
            for (let beat of beats) {
                let start = Math.round(beat.start * 1000)
                if (start > (progress - 50) && start <= (progress + 50) && toDecrease < 5){
                    // console.log("BUMTSS" + progress)
                    // console.log(progress, start)
                    scaleBigBoxes()
                    scaleBigSphere()
                    scaleBigSpace()
                    scaleBigRotating()
                    scaleBigSpotify()
                    scaleBigWording()
                    toDecrease++
                } else if (start > (progress + 150) && start <= (progress + 250) && toDecrease>0){
                    scaleSmallBoxes()
                    scaleSmallSphere()
                    scaleSmallSpace()
                    scaleSmallRotating()
                    scaleSmallSpotify()
                    scaleSmallWording()
                    toDecrease--
                }
            }
        }
    }

    // goFunction()
    // console.log(totaltime)

    controls.update();

    renderer.render( s, camera );
}
