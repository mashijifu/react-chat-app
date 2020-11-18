import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTOufAJpc1WHshxUPFykLCror5etsjt9k",
    authDomain: "react-chat-app-38309.firebaseapp.com",
    databaseURL: "https://react-chat-app-38309.firebaseio.com",
    projectId: "react-chat-app-38309",
    storageBucket: "react-chat-app-38309.appspot.com",
    messagingSenderId: "229093240835",
    appId: "1:229093240835:web:e3dd2e9e2a6035d75c1e36"
  };

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default firebase; 