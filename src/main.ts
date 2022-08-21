import { createApp } from "vue";
import "./assets/css/style.css";
import "./assets/css/tailwind/tailwind.css";
import App from "./App.vue";

import {
  Booleanish,
  Numberish,
  Stringish,
} from "./assets/css/typescript/types";
export type { Booleanish, Numberish, Stringish };

createApp(App).mount("#app");

// Imports firebase components
// Todo, import only needed components
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  Database,
} from "firebase/database";

/* Firebase realtime database link:
https://console.firebase.google.com/u/2/project/vue-chitchat-cd15a/database/vue-chitchat-cd15a-default-rtdb/data
*/

// Firebase config
const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
} = {
  apiKey: "AIzaSyBiHxmybptga0MyBc5Vk9JWojFCRKrQZ9k",
  authDomain: "vue-chitchat-cd15a.firebaseapp.com",
  databaseURL: "https://vue-chitchat-cd15a-default-rtdb.firebaseio.com",
  projectId: "vue-chitchat-cd15a",
  storageBucket: "vue-chitchat-cd15a.appspot.com",
  messagingSenderId: "372968490071",
  appId: "1:372968490071:web:3c3b1b7bce01d2b8670f12",
};
// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
// Assigns the realtime database to the variable "database"
const database: Database = getDatabase(app);
// Assigns the authentication to the variable "auth"
const auth: Auth = getAuth(app);

// set(ref(database, "Testing"), {
//     test: "Lets Go!",
//   });

export {
  app,
  database,
  auth,
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
