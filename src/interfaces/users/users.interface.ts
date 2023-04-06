export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  cpf: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  cpf: string;
  isActive: boolean;
  createdAt: Date;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  cpf?: string;
}
