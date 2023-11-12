import { Timestamp } from 'firebase/firestore';

export type EventT = {
    id:string,
    name:string,
    description:string,
    photos:string[],
    createdAt:Timestamp,
    isActive:boolean
}

export type CreateEventT = {
    name:string,
    description:string,
    photos:string[]
    createdAt:Date
    isActive:boolean

}

export type CreateEventFormT = {
    name:string,
    description:string,
    photos:File[]
    createdAt:Date
    isActive:boolean

}

export type ChangeEventT = {
    name:string,
    description:string,
    photos:string[]
    isActive:boolean

}

export type ChangeEventFormT = {
    name:string,
    description:string,
    photos:File[]
    isActive:boolean
}