import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";

// const deleteCommentService = async (id:string):Promise<string> =>{
//     const commentRepository = AppDataSource.getRepository(Comment);
// 	const findComment = await commentRepository.findOne(id);

//     if (!findComment) {
// 		throw new Error("Comment not found");
// 	}

//     await commentRepository.delete(findComment)
//     return `Comment with id ${id} has been deleted successfully`
// }

const deleteCommentService = async (id) => {
	const commentRepository = AppDataSource.getRepository(Comment);
	const comment = await commentRepository.findOneBy({ id: id });

	if (!comment) {
		throw new Error("Comment not found");
	}

	const commentQueryBuilder =
		commentRepository.createQueryBuilder("comments");

	await commentQueryBuilder
		.delete()
		.from(Comment)
		.where("id = :id", { id: id })
		.execute();
};

export default deleteCommentService;
