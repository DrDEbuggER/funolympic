// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHgH83n4207NIxHcpaBmsOlG19pq0FlRQ",
  authDomain: "bayjingfunolympic2022.firebaseapp.com",
  projectId: "bayjingfunolympic2022",
  storageBucket: "bayjingfunolympic2022.appspot.com",
  messagingSenderId: "892207026588",
  appId: "1:892207026588:web:3fa031d2e34cd807603859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app);
export const fireStorage = getStorage(app)

export default app