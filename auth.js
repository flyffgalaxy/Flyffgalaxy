import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } 
  from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } 
  from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDzNp6ZXv1KcQR5YK7RCWL5fiOWAAhS8NM",
  authDomain: "flyffgalaxy.firebaseapp.com",
  projectId: "flyffgalaxy",
  storageBucket: "flyffgalaxy.firebasestorage.app",
  messagingSenderId: "957266144921",
  appId: "1:957266144921:web:615b297948b643f8401208",
  measurementId: "G-3E1VNME1K2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export let player = { x: 50, y: 150, hp: 100, mp: 50, exp: 0, level: 1, inventory: [], job: "Vagrant" };

// Email/Password Register
async function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    const user = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, "players", user.user.uid), player);
    document.getElementById("status").innerText = "Account created for: " + user.user.email;
  } catch (err) {
    document.getElementById("status").innerText = "Register error: " + err.code;
  }
}

// Email/Password Login
async function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    const user = await signInWithEmailAndPassword(auth, email, pass);
    document.getElementById("status").innerText = "Login success: " + user.user.email;
    const snap = await getDoc(doc(db, "players", user.user.uid));
    if (snap.exists()) {
      player = snap.data();
      window.drawScene();
    }
  } catch (err) {
    document.getElementById("status").innerText = "Login error: " + err.code;
  }
}

// Google Login
const provider = new GoogleAuthProvider();

async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    document.getElementById("status").innerText = "Google login success: " + user.email;

    const snap = await getDoc(doc(db, "players", user.uid));
    if (!snap.exists()) {
      await setDoc(doc(db, "players", user.uid), player);
    } else {
      Object.assign(player, snap.data());
    }

    window.drawScene();
  } catch (err) {
    document.getElementById("status").innerText = "Google login error: " + err.code;
  }
}

export async function savePlayer(uid) {
  await setDoc(doc(db, "players", uid), player);
}

// ✅ Expose functions globally so HTML buttons can call them
window.register = register;
window.login = login;
window.loginWithGoogle = loginWithGoogle;
