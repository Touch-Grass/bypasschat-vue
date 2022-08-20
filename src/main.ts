import { createApp } from "vue";
import "./assets/css/style.css";
import "./assets/css/tailwind/tailwind.css";
import App from "./App.vue";

createApp(App).mount("#app");

// Imports firebase components
// Todo, import only needed components
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  Database,
} from "firebase/database";

export {
  // Auth
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  // Database
  getDatabase,
  ref,
  set,
  push,
  onValue,
  Database,
};

/* Firebase realtime database link:
    https://console.firebase.google.com/u/2/project/vue-chitchat-cd15a/database/vue-chitchat-cd15a-default-rtdb/data
*/

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBiHxmybptga0MyBc5Vk9JWojFCRKrQZ9k",
  authDomain: "vue-chitchat-cd15a.firebaseapp.com",
  databaseURL: "https://vue-chitchat-cd15a-default-rtdb.firebaseio.com",
  projectId: "vue-chitchat-cd15a",
  storageBucket: "vue-chitchat-cd15a.appspot.com",
  messagingSenderId: "372968490071",
  appId: "1:372968490071:web:3c3b1b7bce01d2b8670f12",
};
// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
// Assigns the realtime database to the variable "database"
export const database: Database = getDatabase(app);
// Assigns the authentication to the variable "auth"
export const auth = getAuth(app);

// set(ref(database, "Testing"), {
//     test: "Lets Go!",
//   });
