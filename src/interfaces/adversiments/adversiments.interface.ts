import { User } from "../../entities/user.entity"
import { IUser, IUserRequest } from "../users/users.interface"

export interface IAdversimentRequest {
    brand: string
    model: string
    age: number
    fuelType: string
    mileAge: number
    price: number
    color:string
    fipe: number
    user: IUserRequest
    images:[IImagemResponse]
}

export interface IImagemRequest {
    adversiment:IAdversimentResponse
    imageUrl:string
}
export interface IImagemResponse {
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
    images: [IImagemResponse]
    user: IUser
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
    commentsId?: string
    images?:any|[]
}