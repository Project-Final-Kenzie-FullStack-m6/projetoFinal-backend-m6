import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import {
	adversimentResponseSerializer,
	adversimentSerializer,
} from "../../serializers/adversiment.serializers";

const listAdversimentService = async (id: string) => {
	if (id === undefined) {
		const adversiments = await AppDataSource.createQueryBuilder()
			.from(Advertisement, "advertisements")
			.select("advertisements")
			.leftJoinAndSelect("advertisements.images", "images")
			.leftJoinAndSelect("advertisements.user", "user")
			.leftJoinAndSelect("advertisements.comments", "comments")
			.leftJoinAndSelect("comments.advertisement", "advertisement")
			.leftJoinAndSelect("user.address", "address")
			.withDeleted()
			.getMany();
		console.log(adversiments);
		const validatedData = adversiments.map((obj) => {
			return adversimentResponseSerializer.validate(obj, {
				stripUnknown: true,
			});
		});
		return await Promise.all(validatedData);
	}
	const adversiments = await AppDataSource.createQueryBuilder()
		.from(Advertisement, "advertisements")
		.select("advertisements")
		.leftJoinAndSelect("advertisements.images", "images")
		.leftJoinAndSelect("advertisements.user", "user")
		.leftJoinAndSelect("advertisements.comments", "comments")
		.leftJoinAndSelect("comments.advertisement", "advertisement")
		.leftJoinAndSelect("user.address", "address")
		.where("advertisements.id = :id", { id })
		.withDeleted()
		.getMany();
	console.log(adversiments);
	const validatedData = adversiments.map((obj) => {
		return adversimentResponseSerializer.validate(obj, {
			stripUnknown: true,
		});
	});
	return await Promise.all(validatedData);
};

export default listAdversimentService;
