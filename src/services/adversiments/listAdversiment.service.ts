import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import { Comment } from "../../entities/comments.entity";
import { User } from "../../entities/user.entity";
import {
	adversimentResponseSerializer,
	adversimentSerializer,
} from "../../serializers/adversiment.serializers";

// const listAdversimentService = async (id: string) => {
// 	if (id === undefined) {
// 		const adversiments = await AppDataSource.createQueryBuilder()
// 			.from(Advertisement, "advertisements")
// 			.select("advertisements")
// 			.leftJoinAndSelect("advertisements.images", "images")
// 			.leftJoinAndSelect("advertisements.user", "user")
// 			.leftJoinAndSelect("advertisements.comments", "comments")
// 			.leftJoinAndSelect("comments.advertisement", "advertisement")
// 			.leftJoinAndSelect("user.address", "address")
// 			.withDeleted()
// 			.getMany();

// 		const validatedData = adversiments.map((obj) => {
// 			return adversimentResponseSerializer.validate(obj, {
// 				stripUnknown: true,
// 			});
// 		});
// 		return await Promise.all(validatedData);
// 	}
// 	const adversiments = await AppDataSource.createQueryBuilder()
// 		.from(Advertisement, "advertisements")
// 		.select("advertisements")
// 		.leftJoinAndSelect("advertisements.images", "images")
// 		.leftJoinAndSelect("advertisements.user", "user")
// 		.leftJoinAndSelect("advertisements.comments", "comments")
// 		.leftJoinAndSelect("comments.advertisement", "advertisement")
// 		.leftJoinAndSelect("user.address", "address")
// 		.where("advertisements.id = :id", { id })
// 		.withDeleted()
// 		.getMany();
// 	console.log(adversiments[0].comments);

// 	// const userRepository = AppDataSource.getRepository(User)
// 	// const findUser = userRepository.findOneBy({id:})
// 	const validatedData = adversiments.map((obj) => {
// 		return adversimentResponseSerializer.validate(obj, {
// 			stripUnknown: true,
// 		});
// 	});
// 	return await Promise.all(validatedData);
// };

const listAdversimentService = async (id: string) => {
	if (id === undefined) {
		const adversiments = await AppDataSource.createQueryBuilder()
			.from(Advertisement, "advertisements")
			.select("advertisements")
			.leftJoinAndSelect("advertisements.images", "images")
			.leftJoinAndSelect("advertisements.user", "user")
			.leftJoinAndSelect("advertisements.comments", "comments")
			.leftJoinAndSelect("comments.user", "commentUser")
			.leftJoinAndSelect("comments.advertisement", "advertisement")
			.leftJoinAndSelect("user.address", "address")
			.withDeleted()
			.getMany();

		const commentId = adversiments[0].comments[0].id;

		const commentRepository = AppDataSource.getRepository(Comment);

		const findComment = await commentRepository
			.createQueryBuilder("comments")
			.leftJoinAndSelect("comments.user", "user")
			.where("comments.id = :commentId", { commentId })
			.getOne();

		const userCommentName = findComment.user.name;

		const validatedData = adversiments.map((obj) => {
			const validatedComments = obj.comments.map((comment) => {
				return {
					...comment,
					name: userCommentName,
				};
			});
			return adversimentResponseSerializer.validate(
				{ ...obj, comments: validatedComments },
				{ stripUnknown: true }
			);
		});
		return await Promise.all(validatedData);
	}
	const adversiments = await AppDataSource.createQueryBuilder()
		.from(Advertisement, "advertisements")
		.select("advertisements")
		.leftJoinAndSelect("advertisements.images", "images")
		.leftJoinAndSelect("advertisements.user", "user")
		.leftJoinAndSelect("advertisements.comments", "comments")
		.leftJoinAndSelect("comments.user", "commentUser")
		.leftJoinAndSelect("comments.advertisement", "advertisement")
		.leftJoinAndSelect("user.address", "address")
		.where("advertisements.id = :id", { id })
		.withDeleted()
		.getMany();
	const commentId = adversiments[0].comments[0].id;

	const commentRepository = AppDataSource.getRepository(Comment);

	const findComment = await commentRepository
		.createQueryBuilder("comments")
		.leftJoinAndSelect("comments.user", "user")
		.where("comments.id = :commentId", { commentId })
		.getOne();

	const userCommentName = findComment.user.name;

	const validatedData = adversiments.map((obj) => {
		const validatedComments = obj.comments.map((comment) => {
			return {
				...comment,
				name: userCommentName,
			};
		});
		return adversimentResponseSerializer.validate(
			{ ...obj, comments: validatedComments },
			{ stripUnknown: true }
		);
	});
	return await Promise.all(validatedData);
};

export default listAdversimentService;
