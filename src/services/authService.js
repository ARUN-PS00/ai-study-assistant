import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export const signup = async (email, password) => {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await setDoc(
    doc(db, "users", userCredential.user.uid),
    {
      email,
      createdAt: serverTimestamp(),
      role: "student",
    }
  );

  return userCredential;
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const logout = () => {
  return signOut(auth);
};