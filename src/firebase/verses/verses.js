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
    const q = query(
      collectionRef,
      where("book", "==", data.book),
      where("chapter", "==", data.chapter),
      where("verse", "==", data.verse)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: "Same verse already exists",
      };
    }
    await addDoc(collectionRef, data);
    return { success: true, message: "Verse added successfully" };
  } catch (error) {
    console.error("Error [verseAdd]:", error);
    throw error;
  }
};
