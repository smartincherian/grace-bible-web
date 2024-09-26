import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
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
export const sectionsSearch = async (search) => {
  try {
    const q = query(collectionRef, where("tags", "array-contains", search));
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
    console.error("Error [fetchSections]:", error);
    throw error;
  }
};

export const sectionAdd = async (data) => {
  try {
    const now = Timestamp.now();
    data.createdAt = now.toMillis();
    const docRef = await addDoc(collectionRef, data);
    return { ...data, id: docRef.id };
  } catch (error) {
    console.error("Error [sectionAdd]:", error);
    throw error;
  }
};
export const sectionUpdate = async ({ id, tags }) => {
  try {
    const docRef = doc(collectionRef, id);
    await updateDoc(docRef, { tags });
    return true;
  } catch (error) {
    console.error("Error [sectionUpdate]:", error);
    throw error;
  }
};

export const fetchSectionsTags = async () => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    let tags = new Set();
    if (!querySnapshot.empty) {
      querySnapshot.docs.map((doc) => {
        const docTags = doc.data()?.tags || [];
        if (Array.isArray(docTags)) {
          docTags.forEach((tag) => {
            tags.add(tag);
          });
        }
      });
      tags = Array.from(tags).sort((a, b) => a.localeCompare(b));
      return tags;
    }
    return [];
  } catch (error) {
    console.error("Error [fetchSections]:", error);
    throw error;
  }
};
