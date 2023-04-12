export interface IAddress {
  cep: number;
  state: string;
  city: string;
  district: string;
  street: string;
  number: number;
  complement?: string;
}

export interface IAddressUpdate {
  cep?: number;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: number;
  complement?: string;
}
