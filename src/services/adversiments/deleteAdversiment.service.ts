import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import AppError from "../../errors/AppError";

const deleteAdversimentService = async (id: string): Promise<void> => {
  const AdversimentRepository = AppDataSource.getRepository(Advertisement);
  const adversiment = await AdversimentRepository.findOneBy({ id: id });

  if (!adversiment) {
    throw new AppError("Advertisement not found ", 404);
  }

  if (adversiment.isActive == false) {
    throw new AppError("advertisement is already inactive ", 400);
  }

  adversiment.isActive = false;

  await AdversimentRepository.save(adversiment);
};

export default deleteAdversimentService;
