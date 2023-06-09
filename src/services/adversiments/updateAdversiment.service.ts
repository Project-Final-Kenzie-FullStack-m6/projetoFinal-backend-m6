import { IAdversimentUpdate } from "../../interfaces/adversiments/adversiments.interface";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { Advertisement } from "../../entities/advertisements.entity";
import { Image } from "../../entities/image.entity";

const updateAdversimentService = async (
  idAdversiment: string,
  adversimentUpdateData: IAdversimentUpdate
) => {
  const AdversimentRepository = AppDataSource.getRepository(Advertisement);
  const imageRepository = AppDataSource.getRepository(Image);

  if (adversimentUpdateData.images == undefined) {
    adversimentUpdateData.images = [];
  }
  let images = adversimentUpdateData.images;
  delete adversimentUpdateData.images;

  const adversiment = await AppDataSource.createQueryBuilder()
    .from(Advertisement, "adversiments")
    .select("adversiments")
    .where("adversiments.id = :id", { id: idAdversiment })
    .leftJoinAndSelect("adversiments.images", "images")
    .getOne();

  if (!adversiment) {
    throw new AppError("adversiment not found ", 404);
  }

  const imagensAntigas = adversiment.images;

  const updateAdversiment = AdversimentRepository.create({
    ...adversiment,
    ...adversimentUpdateData,
  });
  await AdversimentRepository.save(updateAdversiment);

  if (images.length > 0) {
    const imagensAtualizadas = await imageRepository.save(
      images.map((image) => ({
        ...image,
        adversiment: updateAdversiment,
      }))
    );
    const imagensRemovidas = await imageRepository.remove(imagensAntigas);
  }

  return await AppDataSource.createQueryBuilder()
    .from(Advertisement, "adversiments")
    .select("adversiments")
    .where("adversiments.id = :id", { id: idAdversiment })
    .leftJoinAndSelect("adversiments.images", "images")
    .getOne();
};

export default updateAdversimentService;
