        import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
        import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL,uploadString} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut,  } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js"
        import {getDatabase, ref,set,child,update,remove,get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"

        const app = Vue.createApp({

            data() {
                return {
                    islogin: true,
                    loginEmail: '',
                    loginPassword: '',
                    registerFirstName: '',
                    registerLastName: '',
                    registerFullName: '',
                    registerEmail: '',
                    registerPassword: '',
                    registerConfirmPassword: '',

                    isLoginSuccessful: true,
                    noEmptyFields: true,
                    loginErrorMsg: "Email and/or Password cannot be empty",
                    authFailMsg: "Incorrect email and/or password.",

                    isFirstNameEmpty: false,
                    isLastNameEmpty: false,
                    isEmailEmpty: false,
                    isEmailValid: true,
                    isPasswordEmpty: false,
                    isPasswordValid: true,
                    isConfirmPasswordEmpty: false,
                    
                    emptyFieldMsg: 'Required.',
                    emailMsg: 'Invalid email.',
                    passwordMsg: "Password must contain at least 6 characters",
                    confirmPasswordMsg: 'Confirm password must be the same as password.',
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
                        this.isLoginSuccessful = true;
                        this.noEmptyFields = false;
                        console.log('here yet?');
                
                    } else{
                        this.noEmptyFields = true;
                        let email = this.loginEmail,
                            password = this.loginPassword

                        const auth = getAuth();
                        signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in
                            this.isLoginSuccessful = true;
                            const user = userCredential.user;

                        })
                        .catch((error) => {
                            this.isLoginSuccessful = false;
                            const errorMessage = error.message;
                            console.log(errorMessage)
                        });
                    }
                },
                validateForm() {
                    this.isFirstNameEmpty = this.registerFirstName == '' ? true : false;
                    this.isLastNameEmpty = this.registerLastName == '' ? true : false;
                    this.isEmailEmpty = this.registerEmail == '' ? true : false;
                    this.isPasswordEmpty = this.registerPassword == '' ? true : false;
                    this.isConfirmPasswordEmpty = this.registerConfirmPassword == '' ? true : false;

                    let checks = [
                        this.isFirstNameEmpty,
                        this.isLastNameEmpty,
                        this.isEmailEmpty,
                        this.isPasswordEmpty,
                        this.isConfirmPasswordEmpty
                    ]

                    if (this.isEmailEmpty === false) {
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerEmail)) {
                            this.isEmailValid = true;
                        } else {
                            this.isEmailValid = false;
                        }

                    } else {
                        this.isEmailValid = true;
                    }

                    if (this.isPasswordEmpty === false) {
                        this.isPasswordValid = this.registerPassword.length >= 6 ? true : false;

                    } else {
                        this.isPasswordValid = true;

                    }

                    if (checks.every(check => check === false) && this.isEmailValid && this.isSamePassword && this.isPasswordValid) {
                        console.log('registering...');
                        this.register();

                    } else {
                        console.log('Registration form inputs are invalid.');
                    }

                },
                register() {
                let email = this.registerEmail,
                    password = this.registerPassword
                    const auth =getAuth();
                    createUserWithEmailAndPassword(auth,email,password)
                    .then((userCreds)=>{
                        const user = userCreds.user
                        console.log(user)
                        const storage = getStorage()
                        const storageRef =sRef(storage,"public/users/" + user.uid)
                        const message = this.registerFirstName +' '+this.registerLastName;
                        uploadString(storageRef, message).then((snapshot) => {
                            console.log(snapshot)
                        });
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                }
            },
            computed: {
                isSamePassword() {
                    return this.registerConfirmPassword == this.registerPassword;
                },

            }
        }).mount('#app')