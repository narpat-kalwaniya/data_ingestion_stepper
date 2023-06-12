import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdDtrsnSx7NNYp5yAz2_XnRrQYNvm5eU0",
  authDomain: "data-ingestion-d42c4.firebaseapp.com",
  projectId: "data-ingestion-d42c4",
  storageBucket: "data-ingestion-d42c4.appspot.com",
  messagingSenderId: "511829500634",
  appId: "1:511829500634:web:3165e4e1a6be432aaffbe3",
  measurementId: "G-FFQWE1ZDFT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
