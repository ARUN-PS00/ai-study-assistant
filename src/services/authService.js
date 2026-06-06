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

export const signup = async (name, email, password) => {
  const userCredential =
  await createUserWithEmailAndPassword(
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
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const logout = () => {
  return signOut(auth);
};