import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useState } from "react";

let AuthContext = createContext();
export { AuthContext as default };

const firebaseConfig = {
  apiKey: "AIzaSyCTCmU8Mg-eRQ1VGpB4Y4xmdLLyhs31VxA",
  authDomain: "st-and-guad.firebaseapp.com",
  projectId: "st-and-guad",
  storageBucket: "st-and-guad.appspot.com",
  messagingSenderId: "1051573330289",
  appId: "1:1051573330289:web:2e72d4d2e3cd1c8dbe16d0",
  measurementId: "G-6TBGGCZ8RK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// exports this AuthContext with authentication functions such as createUser, loginUser
export function useProvideAuth() {
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("loggedIn") === "true"
  );
  // given an email and password, adds user into database and returns a token in user.accessToken
  // this token should be saved inside windows.localStorage and sent alongside API requests
  const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in : get token
          const user = userCredential.user;
          console.log(user.accessToken);
          console.log("Token successfully stored!");
          setLoggedIn(true);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("username", user.email);
          window.localStorage.setItem("token", user.accessToken); // Should be sent upon subsequent requests
          resolve();
        })
        .catch((error) => {
          console.log(error.message);
          reject(error.message);
        });
    });
  };

  // uses an email and password to check if the user is inside the database
  // if so, you can return a user.accessToken
  const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.accessToken);
          console.log("Token successfully stored!");
          setLoggedIn(true);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("username", user.email);
          window.localStorage.setItem("token", user.accessToken); // Should be sent upon subsequent requests
          resolve();
        })
        .catch((error) => {
          console.log(error.message);
          reject(error.message);
        });
    });
  };

  function logout() {
    window.localStorage.clear();
    setLoggedIn(false);
  }

  return {
    createUser,
    loggedIn,
    loginUser,
    logout,
  };
}
