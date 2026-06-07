import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const saveChat = async (
  uid,
  question,
  answer,
  pdfName = ""
) => {
  await addDoc(
    collection(db, "users", uid, "chats"),
    {
      question,
      answer,
      pdfName,
      createdAt: serverTimestamp(),
    }
  );
};