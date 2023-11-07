import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.FIREBASE_APP_ID,
    // measurementId: process.env.FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyCzvNwE341il6aEmEzw2ySE6B50VyD2Lko",
    authDomain: "tutoringcenterfilin.firebaseapp.com",
    projectId: "tutoringcenterfilin",
    storageBucket: "tutoringcenterfilin.appspot.com",
    messagingSenderId: "751548748819",
    appId: "1:751548748819:web:ba838f601bd58242cf1be6",
    measurementId: "G-M4QWBFVSH5"
};

const app = initializeApp(firebaseConfig);
export const googleAuthProvider = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);