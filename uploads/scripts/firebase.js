import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
import {getDatabase, ref,set,child,update,remove,get, onValue} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js"

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