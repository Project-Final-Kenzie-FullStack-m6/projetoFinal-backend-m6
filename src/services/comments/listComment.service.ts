import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { IUser } from "../../interfaces/users/users.interface";
import { commentResponseSeriallizer } from "../../serializers/comments.serializer";

const listCommentService = async (id: string) => {
	const commentRepository = AppDataSource.getRepository(Comment);
	const findComment = await commentRepository
		.createQueryBuilder("comments")
		.leftJoinAndSelect("comments.user", "user")
		.leftJoinAndSelect("comments.advertisement", "advertisement")
		.where("comments.id = :id", { id })
		.getOne();
	const response = await commentResponseSeriallizer.validate(findComment, {
		stripUnknown: true,
	});
	return response;
};
export default listCommentService;
