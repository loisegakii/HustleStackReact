
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGvcD3VU-RTIehIfmXwIpgjvQCMfHBPZk",
  authDomain: "hustlestack-d2c5a.firebaseapp.com",
  projectId: "hustlestack-d2c5a",
  storageBucket: "hustlestack-d2c5a.firebasestorage.app",
  messagingSenderId: "156961161928",
  appId: "1:156961161928:web:99dae128b705b14b29dbfd",
  measurementId: "G-CG5QBWMQV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Authentication
const auth = getAuth(app);

export { auth };