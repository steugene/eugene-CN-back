import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function addData(colllection, id, data) {
    let result = null as any;
    let error = null as any;

    try {
        result = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        }) as any;
    } catch (e) {
        error = e;
    }

    return { result, error };
}