import { User } from "../../entities/user.entity";
import { Advertisement } from "../../entities/advertisements.entity";
import { IUser, IUserRequest, IUserResponse } from "../users/users.interface";
import { IAdversimentRequest } from "../adversiments/adversiments.interface";

export interface ICommentRequest {
	content: string;
	userId: string;
	advertisementId: string;
}

export interface ICommentContentRequest {
	content: string;
}

export interface ICommentContentResponse {
	content: string;
}

export interface IcommentResponse {
	content: string;
	user: string;
	advertisement: string;
}

export interface IcommentUserResponse {
	id: string;
	name: string;
	email: string;
}

export interface IcommentAdvertisementResponse {
	id: string;
	brand: string;
	model: string;
	fipe: number;
	isActive: boolean;
}

export interface ICommentUpdateRequest {
	id: string;
	content: string;
	user: IUserResponse;
	advertisement: IcommentAdvertisementResponse;
}
