import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxzXpgIrRwmfuV3EqJDHxnLC0GKFjW-S0",
  authDomain: "goit-react-native-hw-1c7c1.firebaseapp.com",
  projectId: "goit-react-native-hw-1c7c1",
  storageBucket: "goit-react-native-hw-1c7c1.appspot.com",
  messagingSenderId: "576734454478",
  appId: "1:576734454478:web:4e7ed1f7f5c4b3f889269f",
};

// Initialize Firebas
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
