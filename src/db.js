// Vue 3 & Firebase 9 Tutorial (Cloud Firestore)
// https://www.youtube.com/watch?v=84mhLKUM04E
import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIE2zCgP1mCRrxXFf-UjqTn_dpoPeD-Ew",
  authDomain: "iaai-a4d22.firebaseapp.com",
  projectId: "iaai-a4d22",
  storageBucket: "iaai-a4d22.appspot.com",
  messagingSenderId: "452447997044",
  appId: "1:452447997044:web:c130d19379fc136101d521"
};

const firebaseApp = initializeApp(firebaseConfig);

// Same as `initializeFirestore(app, {localCache: persistentLocalCache(/*settings*/{})})`,
// but more explicit about tab management.
const db = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache(
    /*settings*/ { tabManager: persistentSingleTabManager() }
  )
});

// const db = getFirestore(firebaseApp);

export { firebaseApp, db };
