import { IAddress, IAddressUpdate } from "../addresses/addresses.interface";
export interface IUserRequest {
	name: string;
	email: string;
	password: string;
	phone: number;
	birthDate: Date;
	description: string;
	isSeller: boolean;
	address: IAddress;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	phone: number;
	birthDate: Date;
	description: string;
	isSeller: boolean;
	isActive: boolean;
	createdAt: Date;
	address: IAddress;
}

export interface IUserUpdate {
	name?: string;
	email?: string;
	password?: string;
	age?: number;
	cpf?: string;
	address?: IAddressUpdate;
}

export interface IUserResponse {
	id: string;
	name: string;
	email: string;
	phone: number;
	description: string;
	isSeller: boolean;
}
