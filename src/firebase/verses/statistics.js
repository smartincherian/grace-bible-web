import { collection, getCountFromServer } from "firebase/firestore";
import { DB } from "../../config";
import { COLLECTION_NAMES } from "../constants";

const versesCollectionRef = collection(DB, COLLECTION_NAMES.VERSES);
const sectionsCollectionRef = collection(DB, COLLECTION_NAMES.SECTIONS);

export const fetchStats = async (id) => {
  try {
    const versesCountSnapshot = await getCountFromServer(versesCollectionRef);
    const totalVersesCount = versesCountSnapshot.data().count;

    const sectionsCountSnapshot = await getCountFromServer(
      sectionsCollectionRef
    );
    const totalSectionsCount = sectionsCountSnapshot.data().count;

    return {
      totalVersesCount,
      totalSectionsCount,
    };
  } catch (error) {
    console.error("Error [fetchStats]:", error);
    throw error;
  }
};
