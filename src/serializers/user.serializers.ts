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
  phone: yup.number().required(),
  birthDate: yup.date().required(),
  description: yup.string().required(),
  isSeller: yup.boolean().required(),
  address: addressRequestSeriallizer,
});

const userResponse: SchemaOf<IUser> = yup.object().shape({
  address: yup.object().shape({
    complement: yup.string().nullable(true),
    number: yup.number(),
    street: yup.string(),
    district: yup.string(),
    city: yup.string(),
    state: yup.string(),
    cep: yup.number(),
  }),
  createdAt: yup.date(),
  isActive: yup.boolean(),
  isSeller: yup.boolean(),
  description: yup.string(),
  birthDate: yup.date(),
  phone: yup.number(),
  email: yup.string().email(),
  name: yup.string(),
  id: yup.string(),
});

const allUsersSerializer: SchemaOf<IUser[]> = yup.array(
  yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email(),
    phone: yup.number(),
    birthDate: yup.date(),
    description: yup.string(),
    isSeller: yup.boolean(),
    isActive: yup.boolean(),
    createdAt: yup.date(),
    address: yup.object().shape({
      cep: yup.number(),
      state: yup.string(),
      city: yup.string(),
      district: yup.string(),
      street: yup.string(),
      number: yup.number(),
      complement: yup.string(),
    }),
  })
);

export { userRequestSeriallizer, userResponse, allUsersSerializer };
