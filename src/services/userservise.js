import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getUserPreferences = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));

  if (snap.exists()) {
    return snap.data();
  }

  return null;
};

export const saveTheme = async (uid, theme) => {
  await updateDoc(doc(db, "users", uid), {
    theme,
  });
};