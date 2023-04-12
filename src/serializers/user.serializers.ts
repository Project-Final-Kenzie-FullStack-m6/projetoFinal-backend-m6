import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserRequest } from "../interfaces/users/users.interface";
import { IAddress } from "../interfaces/addresses/addresses.interface";

const addressRequestSeriallizer: SchemaOf<IAddress> = yup.object({}).shape({
  cep: yup.number().required(),
  city: yup.string().required(),
  complement: yup.string().notRequired(),
  district: yup.string().required(),
  number: yup.number().required(),
  state: yup.string().required(),
  street: yup.string().required(),
});

const userRequestSeriallizer: SchemaOf<IUserRequest> = yup.object({}).shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cpf: yup.string().required(),
  age: yup.number().required(),
  address: addressRequestSeriallizer,
});

const userResponse: SchemaOf<IUser> = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  cpf: yup.string(),
  age: yup.number(),
  isActive: yup.boolean(),
  createdAt: yup.date(),
  addressId: yup.string(),
});

const allUsersSerializer: SchemaOf<IUser[]> = yup.array(
  yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email(),
    cpf: yup.string(),
    age: yup.number(),
    isActive: yup.boolean(),
    createdAt: yup.date(),
    addressId: yup.string(),
  })
);

export { userRequestSeriallizer, userResponse, allUsersSerializer };
