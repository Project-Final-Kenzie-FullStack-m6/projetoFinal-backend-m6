import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import {
  adversimentResponseSerializer,
  adversimentSerializer,
} from "../../serializers/adversiment.serializers";

const listAdversimentService = async () => {
  const adversiments = await AppDataSource.createQueryBuilder()
    .from(Advertisement, "adversiments")
    .select("adversiments")
    .leftJoinAndSelect("adversiments.images", "images")
    .leftJoinAndSelect("adversiments.user", "user")
    .leftJoinAndSelect("user.address", "address")
    .withDeleted()
    .getMany();

  const validatedData = adversiments.map((obj) => {
    return adversimentResponseSerializer.validate(obj, { stripUnknown: true });
  });
  return await Promise.all(validatedData);
};

export default listAdversimentService;
