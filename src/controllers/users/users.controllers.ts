import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users/users.interface";
import createUserService from "../../services/users/createUser.service";
import deleteUserService from "../../services/users/deleteUser.service";
import listUsersService from "../../services/users/listUser.service";
import updateUserService from "../../services/users/updateUser.service";
import sendResetEmailPasswordService from "../../services/users/sendResetPasswordEmailUser.service";
import resetPasswordService from "../../services/users/resetPasswordUser.service";

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
	const id = request.user.id;
	await deleteUserService(id);
	return response.status(204).json();
};

const sendResetEmailPasswordController = async (
	request: Request,
	response: Response
) => {
	const { email } = request.body;
	const { protocol } = request;
	const host = request.get("host");

	await sendResetEmailPasswordService(email, protocol, host!);

	return response.json({ message: "token send" });
};

const resetPasswordController = async (
	request: Request,
	response: Response
) => {
	const { password } = request.body;
	const { token } = request.params;

	await resetPasswordService(password, token);

	return response.json({ message: "password change with sucess" });
};

export {
	createUserController,
	listUserControler,
	updateUserController,
	deleteUserController,
	sendResetEmailPasswordController,
	resetPasswordController,
};
