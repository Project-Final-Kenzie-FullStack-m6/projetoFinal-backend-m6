export interface IAdversimentRequest {
    brand: string
    model: string
    age: number
    fuelType: string
    mileAge: number
    price: number
    color:string
    fipe: number
    userId: string
    description: string
    commentsId: string
    image:IImagemRequest
}

export interface IImagemRequest {
    imageUrl:string
}
export interface IImagemUpdate {
    imageUrl?:string
}


export interface IAdversimentResponse {
    id: string
    brand: string
    model: string
    age: number
    fuelType: string
    mileAge: number
    price: number
    color:string
    fipe: number
    isActive: boolean
    createdAt: Date

}


export interface IAdversimentUpdate {
    brand?: string
    model?: string
    age?: number
    fuelType?: string
    mileAge?: number
    price?: number
    color?:string
    fipe?: number
    userId?: string
    commentsId?: string
    image?:IImagemUpdate
}