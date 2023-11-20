import { Timestamp } from "firebase/firestore"

export type SubjectT = {
    id:string,
    name:string,
    isActive:boolean
    createdAt:Timestamp
}
