        import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
        import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js"
        import {getDatabase, ref,set,child,update,remove,get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"

        const app = Vue.createApp({

            data() {
                return {
                    islogin: true,
                    loginEmail: '',
                    loginPassword: '',
                    loginErrorMsg: '',
                    registerFirstName: '',
                    registerLastName: '',
                    registerFullName: '',
                    registerEmail: '',
                    registerPassword: '',
                    registerConfirmPassword: '',
                    registerErrorMsg: ''
                }
            },
            created(){               
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
            },
            methods: {
                registerClick() {
                    this.islogin = false
                },
                returnLogin() {
                    this.islogin = true
                    this.loginErrorMsg = ''
                },
                login() {
                    if (this.loginEmail == '' || this.loginPassword == '') {
                        this.loginErrorMsg = "Email and/or Password cannot be empty"
                    }
                    else{
                        let email = this.loginEmail,
                            password = this.loginPassword
                        const auth = getAuth();
                        signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log(user)
                        })
                        .catch((error) => {
                            const errorMessage = error.message;
                            console.log(errorMessage)
                        });
                    }
                },
                register() {
                let email = this.registerEmail,
                    password = this.registerPassword

                    console.log(email)
                    console.log(password)
                    const auth =getAuth();
                    createUserWithEmailAndPassword(auth,email,password)
                    .then((userCreds)=>{
                        const user = userCreds.user
                    })
                    .catch((error)=>{
                        console.log(error.code)
                    })
                }
            },
            computed: {
                help() {
                    // helper function to see if the v-model works
                    // change the this.<whatever> to see if it pops up even
                    return this.registerFullName
                }
            }
        }).mount('#app')