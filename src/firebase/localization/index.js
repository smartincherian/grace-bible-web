import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { COLLECTION_NAMES, DOCUMENT_NAME } from "../constants";
import { DB } from "../../config";

const langCollectionRef = collection(DB, COLLECTION_NAMES.LANGUAGE);
const langVersionDocRef = doc(
  DB,
  COLLECTION_NAMES.ADMIN,
  DOCUMENT_NAME.LANGUAGE_VERSION
);

export const fetchLocalization = async () => {
  try {
    const docSnapshot = await getDoc(langVersionDocRef);
    if (docSnapshot.exists()) {
      const adminData = docSnapshot.data();
      console.log("Admin Data:", adminData);
    } else {
      console.log("No such document!");
    }
    const querySnapshot = await getDocs(langCollectionRef);
    if (!querySnapshot.empty) {
      const response = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return response;
    }
    return [];
  } catch (error) {
    console.error("Error [fetchLocalization]:", error);
    throw error;
  }
};
