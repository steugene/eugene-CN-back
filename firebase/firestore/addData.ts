import firebase_app from "../config";
import { getFirestore, doc, setDoc, PartialWithFieldValue, DocumentData } from 'firebase/firestore';
import { FirestoreError } from '@firebase/firestore-types';

const db = getFirestore(firebase_app)

interface IAddData {
    collection: string;
    id: string;
    data:  PartialWithFieldValue<DocumentData>;
}

interface IResult {
    error: FirestoreError | null;
}

export default async function addData({ collection, id, data }: IAddData ): Promise<IResult> {
    let error = null as unknown as FirestoreError;

    try {
        await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e: unknown) {
        error = e as FirestoreError;
    }

    return { error };
}