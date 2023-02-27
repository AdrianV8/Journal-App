// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"

// Your web app's Firebase configuration
// Configuración Producción
// const firebaseConfig = {
//   apiKey: "AIzaSyDPQL9KEPkixBNn30YvzzU60_NmU58QLr4",
//   authDomain: "react-journal-2565f.firebaseapp.com",
//   projectId: "react-journal-2565f",
//   storageBucket: "react-journal-2565f.appspot.com",
//   messagingSenderId: "833705680210",
//   appId: "1:833705680210:web:f11ed0874d16ade677ee8b",
//   measurementId: "G-R139YJ9WJB"
// };



//test
const firebaseConfig = {
  apiKey: "AIzaSyCyXvYL4zLObS7Zt9b-pmNCofB1R8OXL4M",
  authDomain: "react-testing-a8423.firebaseapp.com",
  projectId: "react-testing-a8423",
  storageBucket: "react-testing-a8423.appspot.com",
  messagingSenderId: "969734804151",
  appId: "1:969734804151:web:35e43b96067d4a3938f332"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);


// const analytics = getAnalytics(FirebaseApp);