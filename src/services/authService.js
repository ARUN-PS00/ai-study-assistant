import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const ensureAuth = () => {
  if (!auth) {
    throw new Error("Firebase auth is not initialized.");
  }
};

const ensureDb = () => {
  if (!db) {
    throw new Error("Firebase firestore is not initialized.");
  }
};

export const signup = async (name, email, password) => {
  ensureAuth();
  ensureDb();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  await setDoc(
    doc(db, "users", userCredential.user.uid),
    {
      name,
      email,
      createdAt: serverTimestamp(),
      role: "student",
    }
  );

  return userCredential;
};

export const login = (email, password) => {
  ensureAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  ensureAuth();
  return signOut(auth);
};