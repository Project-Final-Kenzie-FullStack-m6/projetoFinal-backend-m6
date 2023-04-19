import { Request, Response } from "express";

import createCommentService from "../../services/comments/createComment.service";
import listCommentService from "../../services/comments/listComment.service";
import updateCommentService from "../../services/comments/updateComment.service";
import deleteCommentService from "../../services/comments/deleteComment.service";

const createCommentController = async (
	request: Request,
	response: Response
) => {
	const commentData = request.body;
	const userId = request.user.id;
	const advertisementId = request.params.id;

	commentData.user = userId;
	commentData.advertisement = advertisementId;

	const createComment = await createCommentService(commentData);
	return response.status(201).json(createComment);
};

const listCommentController = async (request: Request, response: Response) => {
	const commentId = request.params.id;
	const listComment = await listCommentService(commentId);
	return response.status(200).json(listComment);
};

const updateCommentController = async (
	request: Request,
	response: Response
) => {
	const commentData = request.body;
	const commentId = request.params.id;
	commentData.id = commentId;
	const listComment = await updateCommentService(commentData);
	return response.status(200).json(listComment);
};

const deleteCommentController = async (
	request: Request,
	response: Response
) => {
	const commentId = request.params.id;
	const deleteComment = await deleteCommentService(commentId);
	return response.status(204).json(deleteComment);
};
export {
	createCommentController,
	listCommentController,
	updateCommentController,
	deleteCommentController,
};
