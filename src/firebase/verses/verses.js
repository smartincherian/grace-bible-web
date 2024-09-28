import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
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
    const now = Timestamp.now();
    data.createdAt = now.toMillis();
    await addDoc(collectionRef, data);
    return { success: true, message: "Verse added successfully" };
  } catch (error) {
    console.error("Error [verseAdd]:", error);
    throw error;
  }
};

export async function fetchAllVerses() {
  try {
    const versesQuerySnapshot = await getDocs(collection(DB, "verses"));

    const versesData = [];
    const uniqueSectionIds = new Set();

    versesQuerySnapshot.forEach((doc) => {
      const verseData = {
        ...doc.data(),
        id: doc.id,
      };
      versesData.push(verseData);

      const sectionIds = verseData.sectionIds || [];
      sectionIds.forEach((sectionId) => uniqueSectionIds.add(sectionId));
    });

    const sectionTitles = {};
    for (const sectionId of uniqueSectionIds) {
      const sectionDocRef = doc(DB, "sections", sectionId);
      const sectionDocSnap = await getDoc(sectionDocRef);

      if (sectionDocSnap.exists()) {
        sectionTitles[sectionId] = sectionDocSnap.data().malayalam;
      } else {
        console.warn(`Section with ID ${sectionId} not found`);
      }
    }

    // 4. Combine verse data with section titles
    const versesWithSectionTitles = versesData
      .map((verse) => ({
        ...verse,
        sectionTitles: (verse.sectionIds || []).map(
          (sectionId) => sectionTitles[sectionId] || "Unknown Section"
        ),
      }))
      .sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
    console.log({ versesWithSectionTitles });
    return versesWithSectionTitles;
  } catch (error) {
    console.error("Error fetching verses with section titles:", error);
    throw error;
  }
}
