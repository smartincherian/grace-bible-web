import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { COLLECTION_NAMES } from "../constants";
import { DB } from "../../config";
import { VERSES_SHOWING_TYPES } from "../../pages/Dashboard/constants";

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

export const fetchVerse = async (id) => {
  try {
    const docRef = doc(collectionRef, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id,
      };
    }
    return null;
  } catch (error) {
    console.error("Error [fetchVerse]:", error);
    throw error;
  }
};

export const verseAdd = async (data) => {
  try {
    const now = Timestamp.now();
    data.createdAt = now.toMillis();
    await addDoc(collectionRef, data);
    return { success: true, message: "Verse added successfully" };
  } catch (error) {
    console.error("Error [verseAdd]:", error);
    throw error;
  }
};
export const verseUpdate = async (data) => {
  try {
    const docRef = doc(collectionRef, data?.id);
    await updateDoc(docRef, data);
    return { success: true, message: "Verse updated successfully" };
  } catch (error) {
    console.error("Error [verseUpdate]:", error);
    throw error;
  }
};

export const verseCheck = async (data) => {
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
        isUnique: false,
        message: "Same verse already exists",
      };
    } else {
      return {
        isUnique: true,
        message: "Same verse doesn't exists",
      };
    }
  } catch (error) {
    console.error("Error [verseCheck]:", error);
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

export async function fetchConditionVerses(data) {
  try {
    const { condition = "" } = data || {};
    let versesQuery = collection(DB, "verses");
    if (condition === VERSES_SHOWING_TYPES.BLANK_ENGLISH) {
      versesQuery = query(versesQuery, where("english", "in", [null, ""]));
    } else if (condition === VERSES_SHOWING_TYPES.BLANK_MALAYALAM) {
      versesQuery = query(versesQuery, where("malayalam", "in", [null, ""]));
    }

    const versesQuerySnapshot = await getDocs(versesQuery);

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
