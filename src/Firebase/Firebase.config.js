// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsLT3AcvGgkEp-OFhGTTjUdOOdLNWfTYM",
    authDomain: "taskmanager-7465d.firebaseapp.com",
    projectId: "taskmanager-7465d",
    storageBucket: "taskmanager-7465d.appspot.com",
    messagingSenderId: "588060390454",
    appId: "1:588060390454:web:7e3d77ebd490522861d497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;