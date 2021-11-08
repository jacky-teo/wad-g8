import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
import {getDatabase, ref,set,child,update,remove,get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js"


const firebaseConfig = {
    apiKey: "AIzaSyDRVQ7r6TGsQhZGvVIXws7y5PTPqlvC2yo",
    authDomain: "audiophile-eff2c.firebaseapp.com",
    databaseURL: "https://audiophile-eff2c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "audiophile-eff2c",
    storageBucket: "audiophile-eff2c.appspot.com",
    messagingSenderId: "141435951049",
    appId: "1:141435951049:web:6308bd4b9fe95fb49bba18",
    measurementId: "G-LKVP0JH4YH"
};
const app = initializeApp(firebaseConfig);

let files,fileArray

let nameBox = document.getElementById('fileName'),
    upload = document.getElementById('upload'),
    pbar = document.getElementById('pbar'),
    retrieve = document.getElementById('retrieve'),
    player = document.getElementById('music'),
    extlab = document.getElementById('extlab'),
    reader =new FileReader()


// || DRAG AND DROP || DRAG AND DROP || DRAG AND DROP || //
const initApp = () => {
    const droparea = document.querySelector('.droparea');
    const active = () => droparea.classList.add("green-border");
    const inactive = () => droparea.classList.remove("green-border");
    const prevents = (e) => e.preventDefault();
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, prevents);
    });
    ['dragenter', 'dragover'].forEach(evtName => {
        droparea.addEventListener(evtName, active);
    });
    ['dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, inactive);
    });
    droparea.addEventListener("drop", handleDrop);
}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (e) => {
    const datatransfer = e.dataTransfer;
    files = datatransfer.files;
    var extention = GetFileExt(files[0])
    var name = GetFileName(files[0])
    nameBox.value=name
    extlab.innerHTML = extention;
    reader.readAsDataURL(files[0])
}
reader.onload = function(){
    music.src = reader.result;
    }

// Dropped file and get info from file
    function GetFileExt(file){
        var temp = file.name.split('.');
        var ext = temp.slice(temp.length-1,temp.length);
        return '.'+ext[0]
    }
    function GetFileName(file){
        var temp = file.name.split('.');
        var fname = temp.slice(0,-1).join('.');
        return fname
    }

// Upload File
async function UploadProcess(){ 
    var fileToUpload =files[0];
    console.log(fileToUpload)
    var fileToUploadName = nameBox.value +  extlab.innerHTML;
    if(!validateName()){
        alert('Name cannot contain "[.#$[]]" ')
        return;
    }
    const metaData = {
        contentType: fileToUpload.type
    }
    const storage = getStorage();
    const storageRef =sRef(storage,"users/14Yw7cZuYYNPNXJCPlnyI6bQcit1/"+fileToUploadName); // To be updated when i can dynamically get the userid (prolly PHP sessions)
    
    const UploadTask = uploadBytesResumable(storageRef,fileToUpload,metaData);
    console.log(UploadTask)
    UploadTask.on('state-changed',(snapshot)=>{
        var progress= (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        pbar.innerHTML ='Upload' + progress + "%"
        pbar.style.width= progress+"%"
    },
    (error)=>{
        alert("error: File failed to upload");
    },
    ()=>{
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
            SaveURLtoRealTimeDB(downloadURL);
            console.log(downloadURL)})
            .catch(err=>{console.log("WHNY CANNOT UPLOAD")})
            });
    }
    
// Save to REALTIME DB
let filesrc = ''
const realdb = getDatabase();
    // Function REALTIME DATABASE
    function SaveURLtoRealTimeDB(URL){
        var name = nameBox.value;
        var ext =extlab.innerHTML
        
        set(ref(realdb,"users/14Yw7cZuYYNPNXJCPlnyI6bQcit1//"+ name),{
            musicName:(name+ext),
            musicURL:URL
        })
    }

function GetUrlfromRealTimeDB(){
        var name =nameBox.value; // Get name of file
        var dbRef =ref(realdb); // Refer to realtime DB
        get(child(dbRef,"users/14Yw7cZuYYNPNXJCPlnyI6bQcit1/"+ name)) // Get the file link
        .then((snapshot)=>{
            if(snapshot.exists()){ // if such a file link exist
                var musicURL=snapshot.val().musicURL
                console.log('im in')
                var source = document.getElementById('source')
                console.log(source)
                source.src= musicURL // change the URL
                filesrc = musicURL
                player.load()}})}

function validateName(){
        var regex=/[\.#$\[]]/
        return !(regex.test(nameBox.value));
    }
    retrieve.onclick=GetUrlfromRealTimeDB;
    upload.onclick=UploadProcess;
    
///////////////////////////////////////////////////////////////////////////////////
import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
            import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js';

            const canvas = document.getElementById('webgl')

            const sizes = {
                    width: window.innerWidth,
                    height: window.innerHeight
                    } // Objects storing the sizes
            // create scene, camera, renderer 
            const [scene,camera,renderer] = [new THREE.Scene(),
                                            new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 ),
                                            new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true})]
            

            // Set controls for objects
            const controls = new OrbitControls(camera, renderer.domElement)
            
            // WEBAUDIO
            const button = document.getElementById('button')
            //Add Event Listener to start Instance
            button.addEventListener( 'click', init );
            const fftSize = 128;
            const listener = new THREE.AudioListener();
            const audio = new THREE.Audio( listener );

            var file = 'https://firebasestorage.googleapis.com/v0/b/audiophile-eff2c.appspot.com/o/Music%2FNever%20Gonna%20Give%20You%20Up%20-%20Rick%20Astley.mp3?alt=media&token=60f9fb56-4303-4778-8ff3-b9dca202a2eb'; // Include directory to audio files

            const analyser = new THREE.AudioAnalyser(audio,fftSize) // Create THREE 3JS analyzer
            const loader = new THREE.AudioLoader(); // Create audio loader
            
            //set the size of renderer to the whole screen
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor('#A9A9A9') // Change color of background
            // Add the enterire renderer into the DOM
            // document.body.appendChild(renderer.domElement);
            
            //Allow for resizing 
            const colorsArr = ['#D90452', '#8C0F61', '#3D1773', '#03658C','#000000']
            const numBoxes = 3;
            const positions = [[0,0,1],[-3,0,1],[3,0,1]] // Initial positions of boxes

            //LINES
            const numLines = 4;
            const lineColor = '#000000'
            const POINTS =[
                            [new THREE.Vector3(-5,2,0),new THREE.Vector3(5,-2,0)],
                            [new THREE.Vector3(0,5,4),new THREE.Vector3(0,-5,4)],
                            [new THREE.Vector3(2,-2,-5),new THREE.Vector3(2,-2,5)],
                            [new THREE.Vector3(-2,3,-5),new THREE.Vector3(-2,3,5)]
                        ]
            // Creating 3 Boxes
            const boxArr = createBoxes(numBoxes)
            const materialArr =createMaterials(numBoxes)
            const BOXES = createObjects(numBoxes)
            const LINES = createLines(numLines)

            var circleGeo = new THREE.CircleGeometry( 4, 32 );
            var circleMat = new THREE.MeshNormalMaterial();
            var circle = new THREE.Mesh( circleGeo, circleMat );
            circle.position.set(0,0,0)
            scene.add( circle );    
            
            // WEBAUDIO
            function init(){
            loader.load(filesrc,function(buffer){
                audio.setBuffer(buffer);
                audio.play();
            })
            animate()
        }
            //Screen Resizing
            window.addEventListener('resize', () =>
            {
                // Update sizes
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight
                // Update camera
                camera.aspect = sizes.width / sizes.height
                camera.updateProjectionMatrix()
                // Update renderer
                renderer.setSize(sizes.width, sizes.height)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            })

            //Camera angle cahnge
            camera.position.z = 10// Depth
            scene.add(camera)

            // Conditions for boxes to bouce
            var [conditionX2,conditionY2,conditionX3,conditionY3, counter,index]= [false,false,false,false,0,0]
            
            //AUDIO REACTIONS
            function BoxScaling(data){
                for(let i=0;i<BOXES.length;i++){
                    if(data==0){
                        BOXES[i].scale.set(1,1,1)
                    }
                    BOXES[i].scale.set(0.5*0.01*data,0.5*0.01*data,0.5*0.01*data)
                }
                circle.scale.set(0.01*data,0.01*data)
            }

            const clock = new THREE.Clock()
            function render(){
                var data = analyser.getAverageFrequency();
                BoxScaling(data)
                renderer.render(scene,camera)
            }

            function createLines(numLines){
                var LINES = []
                for(let i=0;i<numLines;i++){
                    var lineMat = new THREE.LineBasicMaterial( { color: '#000000' } )
                    var lineGeo = new THREE.BufferGeometry().setFromPoints( POINTS[i] )
                    var line = new THREE.Line( lineGeo, lineMat )
                    scene.add(line)
                    LINES.push(line)
                }
                return LINES
            }
            // Creating Circles
  
            function createObjects(numBoxes){
                var BOXES =[]
                for(let i=0;i<numBoxes;i++){
                    var box = new THREE.Mesh(boxArr[i],materialArr[i]);
                    box.position.set(positions[i][0],positions[i][1],positions[i][2])
                    BOXES.push(box)
                    scene.add(box)
                }
                return BOXES
            }

            function createBoxes(numBoxes){
                var boxArr =[]
                for(let i=0;i<numBoxes;i++){
                    var box =new THREE.BoxGeometry(1, 1, 1);
                    // new THREE.CircleGeometry( 1, 32 )( 1, 1, 1 )
                    boxArr.push(box)
                }
                return boxArr
            }

            function createMaterials(numBoxes){
                var materialArr =[]
                for(let i=0;i<numBoxes;i++){
                    materialArr.push(new THREE.MeshBasicMaterial({color:colorsArr[i]}))
                }
                return materialArr
            }

            function changeColors(){
                counter +=1
                if(counter%100 == 0){
                    BOXES[0].material.color.set(colorsArr[index])
                    BOXES[1].material.color.set(colorsArr[index-2])
                    BOXES[2].material.color.set(colorsArr[index-2])
                    index += 1
                    if(index-1>=colorsArr.length){
                        index = 0;
                    }
                }
                
            }
            function spinBoxes(){
                if(BOXES[1].position.x<3 && conditionX2 == false){
                    BOXES[1].position.x += 0.01; // Move right 
                    if(BOXES[1].position.x>=3){
                        conditionX2 = true
                    }
                }
                else{
                    BOXES[1].position.x -= 0.01; 
                    if(BOXES[1].position.x<=-3){
                        conditionX2 = false
                    }
                }

                if(BOXES[1].position.y<3 && conditionY2 == false){
                    BOXES[1].position.y += 0.01; // Move up 
                    if(BOXES[1].position.y>=3){
                        conditionY2 = true
                    }
                }
                else{
                    BOXES[1].position.y -= 0.01; //bounce
                    if(BOXES[1].position.y<=-3){
                        conditionY2 = false
                    }
                }
                // Rotate Box 3 Around X and Y axis
                if(BOXES[2].position.x>-3 && conditionX3 == false){
                    BOXES[2].position.x -= 0.01; // Move left 
                    if(BOXES[2].position.x<=-3){
                        conditionX3 = true
                    }
                }
                else{
                    BOXES[2].position.x += 0.01;  //bounce
                    if(BOXES[2].position.x>=3){
                        conditionX3 = false
                    }
                }
                if(BOXES[2].position.y>-3 && conditionY3 == false){
                    BOXES[2].position.y -= 0.01; // Move down 
                    if(BOXES[2].position.y<=-3){
                        conditionY3 = true
                    }
                }
                else{
                    BOXES[2].position.y += 0.01;  //bounce
                    if(BOXES[2].position.y>=3){
                        conditionY3 = false
                    }
                }
            }

            function animate() {
                render();
                const elapsedTime = clock.getElapsedTime()
                requestAnimationFrame( animate );
                renderer.render( scene, camera );
                // rotate()
                changeColors()
                spinBoxes()
                
                

                // Rotate Box 2 around X and Y axis

                

            }