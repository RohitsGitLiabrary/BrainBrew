// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyDrppM1Z-SPoGbP8oetl2BzaPOfg_cOjX8",
    authDomain: "brainbrew-c953c.firebaseapp.com",
    projectId: "brainbrew-c953c",
    storageBucket: "brainbrew-c953c.firebasestorage.app",
    messagingSenderId: "534636808176",
    appId: "1:534636808176:web:64eed59c6c8025e1ea7f35",
    measurementId: "G-V0YSGS0YQC",
    databaseURL: "https://brainbrew-c953c-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp)
// const analytics = getAnalytics(firebaseApp);