import * as yup from "yup";
import { SchemaOf } from "yup";
import {
	IAdversimentRequest,
	IAdversimentResponse,
	IAdversimentUpdate,
	IImagemResponse,
} from "../interfaces/adversiments/adversiments.interface";
import { userRequestSeriallizer } from "./user.serializers";
import { userResponse } from "./user.serializers";

// const schema:SchemaOf<IImagemResponse> = yup.object().shape({
//     imageUrl: yup.string().max(255).required(),
// })

const adversimentSerializer: SchemaOf<any> = yup.object().shape({
	// comments: yup.object().notRequired(),
	fuelType: yup.string().max(10).required(),
	images: yup.array().of(
		yup.object().shape({
			imageUrl: yup.string().max(255).required(),
		})
	),
	mileAge: yup.number().required(),
	brand: yup.string().max(50).required(),
	price: yup.number().required(),
	color: yup.string().max(20).required(),
	model: yup.string().max(50).required(),
	fipe: yup.number().required(),
	description: yup.string().max(255).required(),
	age: yup.number().required(),
	id: yup.string().uuid(),
});

const adversimentResponseSerializer: SchemaOf<any> = yup.object().shape({
	comments: yup.array().of(
		yup.object().shape({
			createdAt: yup.date(),
			content: yup.string(),
			name: yup.string(),
			id: yup.string(),
		})
	),
	images: yup.array().of(
		yup.object().shape({
			imageUrl: yup.string().max(255).required(),
		})
	),
	user: userResponse,
	isActive: yup.boolean(),
	mileAge: yup.number(),
	fuelType: yup.string().max(10),
	brand: yup.string().max(50).required(),
	price: yup.number().required(),
	color: yup.string().max(20).required(),
	model: yup.string().max(50).required(),
	fipe: yup.number().required(),
	description: yup.string().max(255).required(),
	age: yup.number().required(),
	id: yup.string().uuid(),
});

const adversimentUpdateSerializer: SchemaOf<IAdversimentUpdate> = yup
	.object()
	.shape({
		commentsId: yup.string().notRequired(),
		fuelType: yup.string().max(10).notRequired(),
		mileAge: yup.number().notRequired(),
		userId: yup.string().notRequired(),
		brand: yup.string().max(50).notRequired(),
		price: yup.number().notRequired(),
		color: yup.string().max(20).notRequired(),
		model: yup.string().max(50).notRequired(),
		fipe: yup.number().notRequired(),
		age: yup.number().notRequired(),
		images: yup.array().of(
			yup.object().shape({
				imageUrl: yup.string().max(255).notRequired(),
			})
		),
	});

export {
	adversimentSerializer,
	adversimentUpdateSerializer,
	adversimentResponseSerializer,
};
