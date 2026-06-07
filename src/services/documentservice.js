import {
  doc,
  setDoc,
  getDocs,
  query,
  collection, // 👈 FIX: Added back the missing collection import
  orderBy,
  limit,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// P6 Backend: Save / Overwrite document metadata 
export const saveDocumentMetadata = async (uid, file, textLength) => {
  const documentId = file.name.replace(/[.#$/[\]]/g, "_");

  await setDoc(
    doc(db, "users", uid, "documents", documentId),
    {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      textLength,
      uploadedAt: serverTimestamp(),
    }
  );
};

// P6 Backend: Reader function to fetch the 5 most recent documents
export const getRecentDocuments = async (uid) => {
  const q = query(
    collection(db, "users", uid, "documents"), // 👈 This was crashing without the collection import!
    orderBy("uploadedAt", "desc"),
    limit(5)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// P6 Backend: Deletion handler script
export const deleteDocument = async (uid, fileName) => {
  const documentId = fileName.replace(/[.#$/[\]]/g, "_");

  await deleteDoc(
    doc(db, "users", uid, "documents", documentId)
  );
};