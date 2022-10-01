import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2HX-eBxj9n_pUIQukAnczmTXNz6HUc0I",
  authDomain: "guardian-dispatch.firebaseapp.com",
  projectId: "guardian-dispatch",
  storageBucket: "guardian-dispatch.appspot.com",
  messagingSenderId: "274478063685",
  appId: "1:274478063685:web:b465ba80718dd65c42032c",
  measurementId: "G-TLDSLESBT4",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
