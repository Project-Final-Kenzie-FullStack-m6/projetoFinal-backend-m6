import { IAddress } from "../addresses/addresses.interface";
export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  cpf: string;
  address: IAddress;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  cpf: string;
  isActive: boolean;
  createdAt: Date;
  addressId: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  cpf?: string;
}
