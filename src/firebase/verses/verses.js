import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { COLLECTION_NAMES } from "../constants";
import { DB } from "../../config";

const collectionRef = collection(DB, COLLECTION_NAMES.VERSES);

export const fetchVerses = async (id) => {
  try {
    const q = query(collectionRef, where("sectionIds", "array-contains", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const response = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return response;
    }
    return [];
  } catch (error) {
    console.error("Error [fetchVerses]:", error);
    throw error;
  }
};

export const verseAdd = async (data) => {
  try {
    const docRef = await addDoc(collectionRef, data);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error [verseAdd]:", error);
    throw error;
  }
};
