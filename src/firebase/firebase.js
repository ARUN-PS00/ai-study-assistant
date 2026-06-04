import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "REMOVED",
  authDomain: "ai-study-assistant-4cf38.firebaseapp.com",
  projectId: "ai-study-assistant-4cf38",
  storageBucket: "ai-study-assistant-4cf38.firebasestorage.app",
  messagingSenderId: "338211783845",
  appId: "1:338211783845:web:90b2cbdd1975457908394c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;