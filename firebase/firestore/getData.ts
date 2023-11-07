import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { DocumentSnapshot, FirestoreError } from '@firebase/firestore-types';

const db = getFirestore(firebase_app)
export default async function getDocument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null as unknown as DocumentSnapshot;
    let error = null as unknown as FirestoreError;

    try {
        result = await getDoc(docRef) as unknown as DocumentSnapshot;
    } catch (e: unknown) {
        error = e as FirestoreError;
    }

    return { result, error };
}