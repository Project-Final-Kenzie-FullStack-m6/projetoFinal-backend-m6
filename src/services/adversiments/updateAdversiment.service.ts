import { IAdversimentUpdate } from "../../interfaces/adversiments/adversiments.interface";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { Advertisement } from "../../entities/advertisements.entity";
import { Image } from "../../entities/image.entity";

const updateAdversimentService = async (
	idAdversiment: string,
	adversimentUpdateData: IAdversimentUpdate
) => {
	const advertisementRepository = AppDataSource.getRepository(Advertisement);
	const imageRepository = AppDataSource.getRepository(Image);

	const newImages = adversimentUpdateData.images;
	delete adversimentUpdateData.images;

	const findAdvertisement = await advertisementRepository.findOneBy({
		id: idAdversiment,
	});

	if (!findAdvertisement) {
		throw new Error("Advertisement not found");
	}

	await advertisementRepository.update(idAdversiment, adversimentUpdateData);

	const existingImages = await imageRepository.find({
		where: { advertisement: { id: idAdversiment } },
	});

	const existingImageIds = existingImages.map((image) => image.id);
	const newImageIds = newImages.map((image) => image.id);
	const imagesToDelete = existingImageIds.filter(
		(id) => !newImageIds.includes(id)
	);

	if (imagesToDelete.length > 0) {
		await imageRepository.delete(imagesToDelete);
	}

	const adversiment = await advertisementRepository.findOne({
		where: { id: idAdversiment },
	});

	await imageRepository.save(
		newImages.map((imagem) => ({
			...imagem,
			advertisement: adversiment,
		}))
	);

	return await AppDataSource.createQueryBuilder()
		.from(Advertisement, "adversiments")
		.select("adversiments")
		.where("adversiments.id = :id", { id: idAdversiment })
		.leftJoinAndSelect("adversiments.images", "images")
		.getOne();
};

export default updateAdversimentService;
