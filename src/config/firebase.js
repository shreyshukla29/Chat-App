// Firebase imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Third-party imports
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (username, email, password) => {
  if (!username || !email || !password) {
    toast.error("All fields are required!");
    return;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email: email,
      name: "",
      avatar: "",
      bio: "Hey, there! I am using ChatApp",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });

    toast.success("Signup successful!");
  } catch (error) {
    const handleAuthError = (code) => {
      console.log(code);
      switch (code) {
        case "auth/email-already-in-use":
          return "This email is already registered.";
        case "auth/invalid-credential":
          return "Invalid email or password.";
        case "auth/weak-password":
          return "Password should be at least 6 characters.";
        default:
          return "Something went wrong. Please try again.";
      }
    };

    console.error(error);
    toast.error(handleAuthError(error.code));
  }
};

const login = async (email, password) => {
  if (!email || !password) {
    toast.error("Email and password are required!");
    return;
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const res = await signInWithEmailAndPassword(auth, email, password);
   // const user = res.user;

    // Optionally, you can handle post-login actions here
    toast.success(`Welcome back`);
  } catch (error) {
    const handleAuthError = (code) => {
      switch (code) {
        case "auth/user-not-found":
          return "No user found with this email.";

        case "auth/wrong-password":
          return "Incorrect password.";
        case "auth/invalid-credential":
          return "Invalid email or password.";
        default:
          return "Something went wrong. Please try again.";
      }
    };

    console.error(error);
    toast.error(handleAuthError(error.code));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to log out. Please try again.");
    return { success: false };
  }
};
export { login, signup, logout, auth, db };
