// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeS11Ucd_q1tFY865YLkMdf1WjRom8-r4",
  authDomain: "acosamembers.firebaseapp.com",
  projectId: "acosamembers",
  storageBucket: "acosamembers.firebasestorage.app",
  messagingSenderId: "497043739351",
  appId: "1:497043739351:web:d1c826e69d08fec1d01692"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function loginWithStudentId(studentId, password) {
  // Convert ACOSA/2015/0001 -> acosa_2015_0001@example.com
  const email = studentId.replace(/\//g, '_').toLowerCase() + '@example.com';
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'students', email));
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    
    return {
      name: studentId,
      studentId: studentId,
      email: email
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Invalid Student ID or password');
  }
} 