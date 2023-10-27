import { collection } from "firebase/firestore";
import { db } from "../../initializeFirebase";
import { collectionsKeys } from "../collectionsKeys";

export const usersCollection = collection(db,collectionsKeys.users);