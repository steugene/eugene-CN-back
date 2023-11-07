import firebase_app, { auth } from '../config';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default async function signIn(email: any, password: any) {
    let result = null as any,
        error = null as any;
    try {
        result = await signInWithEmailAndPassword(auth, email, password) as any;
    } catch (e) {
        error = e;
    }

    return { result, error };
}