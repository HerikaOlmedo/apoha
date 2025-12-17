import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDU6_Dbg9hUAty0rBAm9qak3chiQ22xens",
  authDomain: "apohauaa.firebaseapp.com",
  projectId: "apohauaa",
  storageBucket: "apohauaa.firebasestorage.app",
  messagingSenderId: "648022660370",
  appId: "1:648022660370:android:5ee08fc8d97519a12f4fcb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


