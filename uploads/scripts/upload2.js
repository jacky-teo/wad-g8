import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
import {getDatabase, ref,set,child,update,remove,get, onValue} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js"

//get user ID from session storage
const id = sessionStorage.getItem('userID');

// Initiate Firebase Instance
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
let files,
    songTitle = document.getElementById('songTitle'),
    artist = document.getElementById('artist'),
    ext= document.getElementById('extension'),
    pbar = document.getElementById('pbar'),
    upload = document.getElementById('upload'),
    player = document.getElementById('music'),
    filename =document.getElementById('filename'),
    musicSelection = document.getElementById("musicList"),
    reader = new FileReader()


//////////////////////
// Drag and Drop JS //
//////////////////////
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
    e.preventDefault(); // Prevent Event's Auto
    const data = e.dataTransfer; //Save event's file
    files = data.files; // Assign data's files to file
    var extension = GetFileExt(files[0]) // Get File extension
    var name = GetFileName(files[0])
    filename.innerHTML=name // This functions actaully no need le is just to get extension
    ext.innerHTML =extension;
    reader.readAsDataURL(files[0])//Read the current file as a URL
  });
});
reader.onload = function(){
    music.src = reader.result;
}

///////////////////////
/// GET FILE NAMES ////
///////////////////////
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

///////////////////////
///// UPLOAD FILE /////
///////////////////////

function validateName(){
        var regex=/[\.#$\[]]/
        return !(regex.test(songTitle.value+ '-' +artist.value ));
    }

async function UploadProcess(){
    var fileToUpload = files[0]
    var fileToUploadName = songTitle.value + ' - ' +artist.value;
     if(!validateName()){
        alert('Name cannot contain "[.#$[]]" ')
        return;
    }
    const metaData = {
        contentType: fileToUpload.type
    }
    const storage = getStorage();
    const storageRef =sRef(storage, "users/" + id +"/"+ fileToUploadName);
    const UploadTask = uploadBytesResumable(storageRef,fileToUpload,metaData);
    UploadTask.on('state-changed',(snapshot)=>{
        var progress= (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        pbar.innerHTML ='Upload ' + progress.toFixed(2) +  "%"
        pbar.style.width= progress;+"%"
    },
    (error)=>{
        alert("Upload Failed Please Try Again"); // Failed to upload Errror
    },
    ()=>{
        getDownloadURL(UploadTask.snapshot.ref)
        .then((downloadURL)=>{
            SaveURLtoRealTimeDB(downloadURL);
            })
        .catch(err=>{
                alert("Upload Failed Please Try Again")
            })
            });
    }

/////////////////////////////////
///// SAVE FILE TO REALTIME /////
/////////////////////////////////
const realdb = getDatabase();
    // Function REALTIME DATABASE
    function SaveURLtoRealTimeDB(URL){
        var name = songTitle.value +  artist.value;
        var ext =extlab.innerHTML
        
        set(ref(realdb,"users/" + id  +"/"+ name),{
            musicName:(name + ext),
            musicURL:URL
        })
        .then(res=>{
            alert('Upload Complete')
        })
        .catch(err=>{
            alert('Upload Faile')
        })
    }
///////////////////////////////////////
///// RETRIEVE ALL FROM REALTIME //////
///////////////////////////////////////
function getAllData(){
        var dbRef =ref(realdb); // Refer to realtime DB
        get(child(dbRef,"users/" + id ))
        .then((snapshot)=>{
            var musicList = [];
            snapshot.forEach(childSnapshot=>{
                musicList.push(childSnapshot.val());
            });
            addToMusicList(musicList)
        })
        .catch(err=>{
            alert('Failed to retrieve information please try again')
        })
}
///////////////////////////////////////////
/////////// Create A DROPDOWN /////////////
///////////////////////////////////////////
function addToMusicList(musicData){
    for(let info of musicData){
        musicSelection.innerHTML += "<option value='" + info.musicURL+ "'>"+ info.musicName+"</option>"
    }
}