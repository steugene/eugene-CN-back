import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDocument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null as any;
    let error = null as any;

    try {
        result = await getDoc(docRef) as any;
    } catch (e) {
        error = e;
    }

    return { result, error };
}