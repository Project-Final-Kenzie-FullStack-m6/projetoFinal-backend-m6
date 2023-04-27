import * as yup from "yup";
import { SchemaOf } from "yup";
import {
	ICommentContentRequest,
	ICommentUpdateRequest,
} from "../interfaces/comments/comments.interface";

const commentRequestSeriallizer: SchemaOf<ICommentContentRequest> = yup
	.object({})
	.shape({
		content: yup.string().max(255).required(),
	});

const commentResponseSeriallizer: SchemaOf<ICommentUpdateRequest> = yup
	.object({})
	.shape({
		advertisement: yup.object().shape({
			isActive: yup.boolean(),
			fipe: yup.number(),
			model: yup.string(),
			brand: yup.string(),
			id: yup.string(),
		}),
		user: yup.object().shape({
			isSeller: yup.boolean(),
			description: yup.string(),
			phone: yup.number(),
			email: yup.string(),
			cpf: yup.number(),
			name: yup.string(),
			cpf:yup.number(),
			id: yup.string(),
		}),
		content: yup.string(),
		id: yup.string(),
	});

export { commentRequestSeriallizer, commentResponseSeriallizer };
