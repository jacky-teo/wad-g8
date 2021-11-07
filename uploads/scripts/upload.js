import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
import {getDatabase, ref,set,child,update,remove,get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js"



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
    music = document.getElementById('music'),
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
const realdb= getDatabase();
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
                var source = document.getElementById('source')
                source.src=musicURL // change the URL
                player.load()}})}

function validateName(){
        var regex=/[\.#$\[]]/
        return !(regex.test(nameBox.value));
    }
    retrieve.onclick=GetUrlfromRealTimeDB;
    upload.onclick=UploadProcess;
