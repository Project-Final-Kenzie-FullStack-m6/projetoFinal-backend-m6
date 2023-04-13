import AppDataSource from "../../data-source";
import { Adversiment } from "../../entities/adversiments.entity";

const listAdversimentService = async () => {

    const adversiments = await AppDataSource
    .createQueryBuilder()
    .from(Adversiment, "adversiments")
    .select("adversiments")
    .leftJoinAndSelect("adversiments.images", "images")
    .leftJoinAndSelect("adversiments.user","user")
    .withDeleted()
    .getMany();

    return adversiments
}

export default listAdversimentService 