// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcw5GKBGYC50tbub8kjlhM_wIcE0tqdIk",
  authDomain: "coride-app-dbd2b.firebaseapp.com",
  projectId: "coride-app-dbd2b",
  storageBucket: "coride-app-dbd2b.appspot.com",
  messagingSenderId: "75453118165",
  appId: "1:75453118165:web:13cf50f7b73bee5f93145c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default { auth, createUserWithEmailAndPassword };
