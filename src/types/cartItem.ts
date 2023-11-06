export type CartItemT = {
    id:string,
    number:number,
    productId:string,
    userId:string
    type:CartItemTypeT
}

export type CreateCartItemT = {
    number:number,
    productId:string
    type:CartItemTypeT,
    userId:string
}

export type CartItemTypeT = 'test' | 'theme';