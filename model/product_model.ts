export interface ProductModel{
    id: number,
    name: string,
    description: string,
    price: number,
    picture: string,
}


export interface ProductPayload{
    id: number,
    name: string,
    description: string,
    price: number,
    picture: string,
    quantity: number,
    unit: string
}