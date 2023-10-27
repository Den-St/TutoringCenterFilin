export type CreateUserT = {
    name?:string | null,
    surname?:string,
    displayName?:string | null,
    email?:string | null,
    createdAt?:string,
    photoURL:string | null
}

export type UserT = {
    id?:string | null
    name?:string | null,
    surname?:string,
    displayName?:string | null,
    email?:string | null,
    createdAt?:string | null,
    photoURL:string | null
}