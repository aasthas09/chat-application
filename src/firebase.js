import firebase from "firebase/app";
import "firebase/auth";



export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDwAvQk26fKvKltaF7kD5kQ0I5BEdxbjq8",
    authDomain: "mychatapp-2021.firebaseapp.com",
    projectId: "mychatapp-2021",
    storageBucket: "mychatapp-2021.appspot.com",
    messagingSenderId: "1020708978262",
    appId: "1:1020708978262:web:b37bc0e8b245e6c2da45f7"
  }).auth();
