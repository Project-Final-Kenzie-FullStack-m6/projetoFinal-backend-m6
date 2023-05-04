import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import { adversimentsResponseSerializer } from "../../serializers/adversiment.serializers";


const listAdversimentService = async () => {
	const adversiments = await AppDataSource.createQueryBuilder()
		.from(Advertisement, "advertisements")
		.select("advertisements")
		.leftJoinAndSelect("advertisements.images", "images")
		.leftJoinAndSelect("advertisements.user", "user")
		.leftJoinAndSelect("user.address", "address")
		.withDeleted()
		.getMany();



	const validatedData = adversiments.map((obj) => {
		return adversimentsResponseSerializer.validate(obj, {
			stripUnknown: true,
		});
	});
	return await Promise.all(validatedData);
	return adversiments


};

export default listAdversimentService;
