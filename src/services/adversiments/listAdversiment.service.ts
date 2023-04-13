import AppDataSource from "../../data-source";
import { Adversiment } from "../../entities/adversiments.entity";
import { adversimentSerializer } from "../../serializers/adversiment.serializers";

const listAdversimentService = async () => {

    const adversiments = await AppDataSource
    .createQueryBuilder()
    .from(Adversiment, "adversiments")
    .select("adversiments")
    .leftJoinAndSelect("adversiments.images", "images")
    .leftJoinAndSelect("adversiments.user","user")
    .leftJoinAndSelect("user.address","address")
    .withDeleted()
    .getMany();

      const validatedData = adversiments.map(obj => {
      
        return adversimentSerializer.validate(obj, { stripUnknown:true })
      });
     return await Promise.all(validatedData);
}

export default listAdversimentService 

