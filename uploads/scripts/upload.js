import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
import {getDatabase, ref,set,child,update,remove,get, onValue} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js"

//get user ID from session storage
const id = sessionStorage.getItem('userID');


//VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE 
//VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE 
//VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE 

// const user = Vue.createApp({
//     data() {
//         return {

//         }
//     },
//     created() {
//         const firebaseConfig = {
//             apiKey: "AIzaSyDRVQ7r6TGsQhZGvVIXws7y5PTPqlvC2yo",
//             authDomain: "audiophile-eff2c.firebaseapp.com",
//             databaseURL: "https://audiophile-eff2c-default-rtdb.asia-southeast1.firebasedatabase.app",
//             projectId: "audiophile-eff2c",
//             storageBucket: "audiophile-eff2c.appspot.com",
//             messagingSenderId: "141435951049",
//             appId: "1:141435951049:web:6308bd4b9fe95fb49bba18",
//             measurementId: "G-LKVP0JH4YH"
//         };
//         const app = initializeApp(firebaseConfig);

//     }
// })

//VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE 
//VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE 
//VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE VUE 


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
// import {} from "../scripts/firebase.js"
let files
let nameBox = document.getElementById('songTitle'),
    upload = document.getElementById('upload'),
    pbar = document.getElementById('pbar'),
    retrieve = document.getElementById('retrieve'),
    player = document.getElementById('music'),
    extlab = document.getElementById('extlab'),
    reader = new FileReader()


// || DRAG AND DROP || DRAG AND DROP || DRAG AND DROP || //

document.querySelectorAll(".drop-input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");
  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });
  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
    }
  });
  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });
  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    const datatransfer = e.dataTransfer;
    files = datatransfer.files;
    var extention = GetFileExt(files[0])
    var name = GetFileName(files[0])
    nameBox.value=name
    extlab.innerHTML = extention;
    reader.readAsDataURL(files[0])
  });
});

// const initApp = () => {
//     const droparea = document.querySelector('.droparea');
//     const active = () => droparea.classList.add("green-border");
//     const inactive = () => droparea.classList.remove("green-border");
//     const prevents = (e) => e.preventDefault();
//     ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
//         droparea.addEventListener(evtName, prevents);
//     });
//     ['dragenter', 'dragover'].forEach(evtName => {
//         droparea.addEventListener(evtName, active);
//     });
//     ['dragleave', 'drop'].forEach(evtName => {
//         droparea.addEventListener(evtName, inactive);
//     });
//     droparea.addEventListener("drop", handleDrop);
    
//     droparea.addEventListener("click", (e) => {
//         ;
//     });

// }

// document.addEventListener("DOMContentLoaded", initApp);

// const handleDrop = (e) => {
//     const datatransfer = e.dataTransfer;
//     files = datatransfer.files;
//     var extention = GetFileExt(files[0])
//     var name = GetFileName(files[0])
//     nameBox.value=name
//     extlab.innerHTML = extention;
//     reader.readAsDataURL(files[0])
// }
// || DRAG AND DROP || DRAG AND DROP || DRAG AND DROP || //

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
    const storageRef =sRef(storage, "users/" + id +"/"+ fileToUploadName); // To be updated when i can dynamically get the userid (prolly PHP sessions)
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
        
        set(ref(realdb,"users/" + id  +"/"+ name),{
            musicName:(name + ext),
            musicURL:URL
        })
    }

function GetUrlfromRealTimeDB(){
        var name =nameBox.value; // Get name of file
        var dbRef =ref(realdb); // Refer to realtime DB
        get(child(dbRef, "users/" + id  +"/"+ name)) // Get the file link
        .then((snapshot)=>{
            if(snapshot.exists()){ // if such a file link exist
                var musicURL=snapshot.val().musicURL
                console.log('im in')
                var source = document.getElementById('source')
                console.log(source)
                source.src= musicURL // change the URL
                filesrc = musicURL
                player.load()}})
        .catch(err=>{
            console.log(err.message)
        })
    }
        
function validateName(){
        var regex=/[\.#$\[]]/
        return !(regex.test(nameBox.value));
    }
    retrieve.onclick=GetUrlfromRealTimeDB;
    upload.onclick=UploadProcess;
