import { create } from "domain";
import { initializeApp } from "firebase/app";
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
} from "firebase/auth";

// this is a demo-file created during Office Hours with Jeffrey on 2/1

// Replace the following with your app's Firebase project configuration

// this firebaseConfig is for the client-side, where users can activate it
// obtained from Firebase Console > Authentication > Project Settings > Scroll Down

const firebaseConfig = {
    apiKey: "AIzaSyCTCmU8Mg-eRQ1VGpB4Y4xmdLLyhs31VxA",
    authDomain: "st-and-guad.firebaseapp.com",
    projectId: "st-and-guad",
    storageBucket: "st-and-guad.appspot.com",
    messagingSenderId: "1051573330289",
    appId: "1:1051573330289:web:2e72d4d2e3cd1c8dbe16d0",
    measurementId: "G-6TBGGCZ8RK"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// given an email(doesn't have to be gmail) and password, adds user into database and
// returns a token in user.accessToken
// this token should be saved inside windows.localStorage and sent alongside API requests
export const createUser = (email, password) => {
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in : get token

    const user = userCredential.user;
    console.log(user);
    //console.log(user.accessToken);
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    });
};

// uses an email and password to check if the user is inside the database
// if so, you can return a user.accessToken
export const loginUser = (email, password) => {
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log(user.accessToken);
    console.log(user.email);
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });
};

// to test, insert the following line in package.json between "dependencies" and "scripts"
// "type": "module",
// and then run npm index.js in terminal, also uncomment line below
//loginUser("vincentvietdo@gmail.com", "password")