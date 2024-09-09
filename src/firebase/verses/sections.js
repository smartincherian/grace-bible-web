import { addDoc, collection, getDocs } from "firebase/firestore";
import { COLLECTION_NAMES } from "../constants";
import { DB } from "../../config";

const collectionRef = collection(DB, COLLECTION_NAMES.SECTIONS);

export const fetchSections = async () => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    if (!querySnapshot.empty) {
      const response = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return response;
    }
    return [];
  } catch (error) {
    console.error("Error [fetchSections]:", error);
    throw error;
  }
};

export const sectionAdd = async (data) => {
  try {
    const docRef = await addDoc(collectionRef, data);
    return { ...data, id: docRef.id };
  } catch (error) {
    console.error("Error [verseAdd]:", error);
    throw error;
  }
};
