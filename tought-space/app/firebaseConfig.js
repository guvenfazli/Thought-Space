import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAgTHuVKOqAToVC4jsAyqfLSwAipmMDFhE",
  authDomain: "blog-poster-nextjs.firebaseapp.com",
  projectId: "blog-poster-nextjs",
  storageBucket: "blog-poster-nextjs.appspot.com",
  messagingSenderId: "608850822080",
  appId: "1:608850822080:web:1a731d84f35d77a2eebe25"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app)

export { db, auth, storage }