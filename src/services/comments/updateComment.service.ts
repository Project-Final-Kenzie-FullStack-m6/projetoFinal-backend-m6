import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import {
	ICommentContentResponse,
	ICommentUpdateRequest,
} from "../../interfaces/comments/comments.interface";

const updateCommentService = async (
	commentData: ICommentUpdateRequest
): Promise<ICommentContentResponse> => {
	const commentRepository = AppDataSource.getRepository(Comment);
	const findComment = await commentRepository.findOneBy({
		id: commentData.id,
	});

	if (!findComment) {
		throw new Error("Comment not found");
	}

	const updatedComment = { content: commentData.content };

	const response = await commentRepository.update(
		commentData.id,
		updatedComment
	);

	return updatedComment;
};

export default updateCommentService;
