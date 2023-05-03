import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIIQJ0875NzTt64tPb0fo14sqzVdzXFkU",
  authDomain: "goit-react-native-hw-f86aa.firebaseapp.com",
  projectId: "goit-react-native-hw-f86aa",
  storageBucket: "goit-react-native-hw-f86aa.appspot.com",
  messagingSenderId: "543303237932",
  appId: "1:543303237932:web:b4283926727bcdaa6bac89",
};

// Initialize Firebas
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
