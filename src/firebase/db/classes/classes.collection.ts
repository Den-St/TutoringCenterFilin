import { collection } from "firebase/firestore";
import { db } from "../../initializeFirebase";
import { collectionsKeys } from "../collectionsKeys";

export const classesCollection = collection(db,collectionsKeys.classes);