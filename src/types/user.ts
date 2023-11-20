import { SubjectT } from "./subject"

export type CreateUserT = {
    name?:string | null,
    surname?:string,
    patronymic:string
    displayName?:string | null,
    email?:string | null,
    createdAt?:Date,
    photoURL:string | null,
    isTeacher:boolean
    teacherInfo?:TeacherInfoT
}

export type TeacherContactT = {
    name:string
    contactURL:string
}
export type ChangeTeacherInfoFormT = {
    contacts:TeacherContactT[]
    level:string
    aboutMe:string
    photo:File
    subjects:string[]
}
export type ChangeTeacherInfoT = {
    contacts:TeacherContactT[]
    level:string
    aboutMe:string
    photo:string
    subjects:string[]
}
export type TeacherInfoT = {
    contacts:TeacherContactT[]
    level:string
    aboutMe:string
    subjects:SubjectT[]
}
export type ChangeUserT = {
    id:string
    email:string ,
    name:string
    surname:string
    patronymic:string
    isTeacher:boolean
    displayName?:string | null,
    photoURL?:string
    teacherInfo?:ChangeTeacherInfoT;
    createdAt:Date | null
}

export type UserT = {
    id:string
    email:string ,
    name:string
    surname:string
    patronymic:string
    isTeacher:boolean
    displayName?:string | null,
    photoURL?:string
    teacherInfo?:TeacherInfoT;
    createdAt:Date | null
}