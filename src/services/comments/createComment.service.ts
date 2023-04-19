import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import { Comment } from "../../entities/comments.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { ICommentRequest } from "../../interfaces/comments/comments.interface";
import { commentResponseSeriallizer } from "../../serializers/comments.serializer";

const createCommentService = async (commentData: ICommentRequest) => {
	const userRepository = AppDataSource.getRepository(User);
	const AdversimentRepository = AppDataSource.getRepository(Advertisement);

	const findUser = await userRepository.findOneBy({ id: commentData.userId });

	if (!findUser) {
		throw new AppError("User not found", 404);
	}

	const findAdvertisement = await AdversimentRepository.findOneBy({
		id: commentData.advertisementId,
	});

	if (!findAdvertisement) {
		throw new AppError("Advertisement not found", 404);
	}

	const commentRepository = AppDataSource.getRepository(Comment);

	const newComment = commentRepository.create({
		...commentData,
		user: findUser,
		advertisement: findAdvertisement,
	});

	await commentRepository.save(newComment);

	const response = await commentResponseSeriallizer.validate(newComment, {
		stripUnknown: true,
	});
	return response;
};
export default createCommentService;
