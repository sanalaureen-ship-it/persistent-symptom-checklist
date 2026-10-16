import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeuqsI79f9n_082-Hs6XGSorID5T0-D4E",
  authDomain: "persistent-symptom-check-66ce4.firebaseapp.com",
  projectId: "persistent-symptom-check-66ce4",
  storageBucket: "persistent-symptom-check-66ce4.firebasestorage.app",
  messagingSenderId: "934629081353",
  appId: "1:934629081353:web:5e4040a6fc531351e053d8",
  measurementId: "G-CH9V92RHSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export { db };