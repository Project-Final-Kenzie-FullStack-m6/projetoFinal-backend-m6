import { IAddress, IAddressUpdate } from "../addresses/addresses.interface";
export interface IUserRequest {
	name: string;
	email: string;
	password: string;
	phone: number;
	cpf: number;
	birthDate: Date;
	description: string;
	isSeller: boolean;
	address: IAddress;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	cpf: number;
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
	cpf?: number;
	address?: IAddressUpdate;
}

export interface IUserResponse {
	id: string;
	name: string;
	email: string;
	cpf: number;
	phone: number;
	description: string;
	isSeller: boolean;
}
