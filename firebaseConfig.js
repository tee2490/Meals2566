import { initializeApp } from 'firebase/app';
import * as auth from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBEISfN-iQdzVFPlWhI4lHTOmka-PIoZv4",
    authDomain: "mealstogo66-d8368.firebaseapp.com",
    projectId: "mealstogo66-d8368",
    storageBucket: "mealstogo66-d8368.appspot.com",
    messagingSenderId: "138100105754",
    appId: "1:138100105754:web:fc6d4c7c3d8da000fca7a3"
};

initializeApp(firebaseConfig);
const getAuth = auth.getAuth();

export const firebase = { auth,getAuth }

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
