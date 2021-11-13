import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL, uploadString } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onIdTokenChanged } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js"
import { getDatabase, ref, set, child, update, remove, get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"

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
            authFailMsg: "Incorrect email and/or password",

            isFirstNameEmpty: false,
            isLastNameEmpty: false,
            isEmailEmpty: false,
            isEmailValid: true,
            isPasswordEmpty: false,
            isPasswordValid: true,
            isConfirmPasswordEmpty: false,

            emptyFieldMsg: 'Required',
            emailMsg: 'Invalid email',
            passwordMsg: "Password must contain at least 6 characters",
            regFailMsg: '',
            confirmPasswordMsg: 'Confirm password must be the same as password',
            auth: ''
        }
    },
    created() {
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

        //create auth instance
        this.auth = getAuth();

        // listens to change in token status
        onIdTokenChanged(this.auth, function (user) {
            if (user) {
                // User is signed in or token was refreshed.
                sessionStorage.setItem('userID', user.uid);
                if (!window.location.href.includes("upload")) {
                    window.location.href = './upload';
                }

            } else {
                sessionStorage.removeItem('userID')
                if (!window.location.href.includes("login")) {
                    console.log('user must login again');
                    window.location.href = './login'
                }
            }
        });

    },
    methods: {
        registerClick() {
            this.islogin = false
        },
        returnLogin() {
            this.islogin = true
            this.isLoginSuccessful = true;
            //refresh login error message and input fields
            this.noEmptyFields = true;
            this.loginEmail = '';
            this.loginPassword = '';
            
            //refresh registration error messages 
            this.isFirstNameEmpty = false;
            this.registerFirstName = '';
            this.isLastNameEmpty = false;
            this.registerLastName = '';
            this.isEmailEmpty = false;
            this.registerEmail = '';
            this.isPasswordEmpty = false;
            this.registerPassword = '';
            this.isConfirmPasswordEmpty = false;
            this.registerConfirmPassword = '';

            this.isEmailValid = true;
            this.isPasswordValid = true;

        },
        login() {
            if (this.loginEmail == '' || this.loginPassword == '') {
                this.isLoginSuccessful = true;
                this.noEmptyFields = false;

            } else {
                this.noEmptyFields = true;
                let email = this.loginEmail,
                    password = this.loginPassword

                signInWithEmailAndPassword(this.auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        this.isLoginSuccessful = true;
                        this.user = userCredential.user;

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
            createUserWithEmailAndPassword(this.auth, email, password)
                .then((userCreds) => {
                    const user = userCreds.user
                    console.log(user)
                    this.regFailMsg = ''
                    const storage = getStorage()
                    const storageRef = sRef(storage, "public/users/" + user.uid)
                    const message = this.registerFirstName + ' ' + this.registerLastName;
                    uploadString(storageRef, message).then((snapshot) => {
                        console.log(snapshot)
                    });
                })
                .catch((error) => {
                    this.regFailMsg = 'Email already exists.';
                })
        },
        signout() {
            signOut(this.auth)
                .then(() => {
                    // Sign-out successful.
                })
                .catch((error) => {
                    // An error happened.
                    console.log(error);
                });
        }
    },
    computed: {
        isSamePassword() {
            return this.registerConfirmPassword == this.registerPassword;
        },

    }
}).mount('#appLogin')
