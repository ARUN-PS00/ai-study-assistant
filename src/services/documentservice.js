import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const saveDocumentMetadata = async (
  uid,
  file,
  textLength
) => {
  await addDoc(
    collection(db, "users", uid, "documents"),
    {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      textLength,
      uploadedAt: serverTimestamp(),
    }
  );
};