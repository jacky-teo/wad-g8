// FIREBASE COMPONENT //////

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
import { getDatabase, ref, set, child, update, remove, get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
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
export const app = initializeApp(firebaseConfig);
export var client_id, client_secret

/////////////////////////////////
//////// SPOTIFY FIREBASE ///////
//GET CLIENT ID & CLIENTSECRET//
////////////////////////////////
export const realdb = getDatabase(app);
var reference =ref(realdb); // Refer to realtime DB
    get(child(reference, "users/clientId" )) // Get the ClientId
    .then((snapshot)=>{
        if(snapshot.exists()){
            if(snapshot.exists()){
              client_id= snapshot.val()
            }
        }
    })
    .catch(err=>console.log(err.message))
    get(child(reference, "users/client_secret" )) // Get the ClientId
        .then((snapshot)=>{
            if(snapshot.exists()){
                if(snapshot.exists()){
                client_secret= snapshot.val()
                }
            }
        })
    .catch(err=>console.log(err.message))


