import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users/users.interface";
import createUserService from "../../services/users/createUser.service";
import deleteUserService from "../../services/users/deleteUser.service";
import listUsersService from "../../services/users/listUser.service";
import updateUserService from "../../services/users/updateUser.service";

const createUserController = async (request: Request, response: Response) => {
  const userData: IUserRequest = request.body;
  const newUser = await createUserService(userData);
  return response.status(201).json(newUser);
};

const listUserControler = async (request: Request, response: Response) => {
  const userId = request.user.id;
  const allUsers = await listUsersService(userId);
  return response.status(200).json(allUsers);
};

const updateUserController = async (request: Request, response: Response) => {
  const id = request.user.id;
  const data = request.body;
  const updatedUser = await updateUserService(id, data);
  return response.status(200).json(updatedUser);
};

const deleteUserController = async (request: Request, response: Response) => {
  const id = request.params.id;
  const deletedUser = await deleteUserService(id);
  return response.status(204).json(deletedUser);
};

export {
  createUserController,
  listUserControler,
  updateUserController,
  deleteUserController,
};
