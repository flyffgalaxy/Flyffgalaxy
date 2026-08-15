import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } 
  from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// ✅ Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDzNp6ZXv1KcQR5YK7RCWL5fiOWAAhS8NM",
  authDomain: "flyffgalaxy.firebaseapp.com",
  projectId: "flyffgalaxy",
  storageBucket: "flyffgalaxy.appspot.com",   // ← FIXED here
  messagingSenderId: "957266144921",
  appId: "1:957266144921:web:615b297948b643f8401208",
  measurementId: "G-3E1VNME1K2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Default player template
export let player = { x: 50, y: 150, hp: 100, mp: 50, exp: 0, level: 1, inventory: [] };

// Register
export async function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    const user = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, "players", user.user.uid), player);
    alert("Account created for: " + user.user.email);
  } catch (err) {
    alert("Register error: " + err.code + " - " + err.message);
  }
}

// Login
export async function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    const user = await signInWithEmailAndPassword(auth, email, pass);
    alert("Login success: " + user.user.email);
    const snap = await getDoc(doc(db, "players", user.user.uid));
    if (snap.exists()) {
      player = snap.data();
      window.drawScene(); // call game rendering after login
    }
  } catch (err) {
    alert("Login error: " + err.code + " - " + err.message);
  }
}

export async function savePlayer(uid) {
  await setDoc(doc(db, "players", uid), player);
}
