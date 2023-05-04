import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import { adversimentResponseSerializer } from "../../serializers/adversiment.serializers";

const retrieveAdversimentService = async (id: string) => {

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
        .getOne();


    return adversimentResponseSerializer.validate(adversiments, {
        stripUnknown: true,
    });
}


export default retrieveAdversimentService